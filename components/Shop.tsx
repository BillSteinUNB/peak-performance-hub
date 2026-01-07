import React, { useContext, useState } from 'react';
import { Filter, Star, Heart, ArrowRight } from 'lucide-react';
import { AppContext } from '../App';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { Button } from './Button';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setSelectedProductId, setCurrentView, addToCart, setIsCartOpen } = useContext(AppContext);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first variant
    if (product.variants.length > 0) {
      addToCart(product, product.variants[0], 1);
      setIsCartOpen(true);
    }
  };

  const handleClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('product');
  };

  return (
    <div 
      className="group bg-[#141414] border border-[#262626] rounded-md overflow-hidden hover:border-[#404040] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={handleClick}
    >
      <div className="relative aspect-square bg-[#0A0A0A] p-6 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badges.includes('new') && <span className="px-2 py-1 bg-[#FF4D00] text-white text-[10px] font-bold tracking-wider uppercase rounded-sm">New</span>}
          {product.badges.includes('sale') && <span className="px-2 py-1 bg-[#EF4444] text-white text-[10px] font-bold tracking-wider uppercase rounded-sm">Sale</span>}
          {product.badges.includes('bestseller') && <span className="px-2 py-1 bg-[#FFB800] text-black text-[10px] font-bold tracking-wider uppercase rounded-sm">Best Seller</span>}
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          <Button size="sm" className="w-full shadow-lg" onClick={handleQuickAdd}>ADD TO CART</Button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[#525252] text-xs font-bold uppercase tracking-wider">{product.brand}</span>
          <div className="flex items-center gap-1 text-[#FFB800]">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[#A3A3A3] text-xs">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#FF4D00] transition-colors">{product.name}</h3>
        
        <div className="mt-auto flex items-end gap-2">
          <span className="font-mono text-lg text-white font-medium">${product.price}</span>
          {product.compareAtPrice && (
            <span className="font-mono text-sm text-[#525252] line-through decoration-red-500 decoration-1">${product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in">
        <div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-2">SHOP SUPPLEMENTS</h1>
          <p className="text-[#A3A3A3]">Premium fuel for your peak performance.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2"/> FILTER</Button>
           <select className="bg-[#141414] border border-[#262626] text-white text-sm rounded-sm px-4 py-2 focus:outline-none focus:border-[#FF4D00]">
             <option>Featured</option>
             <option>Price: Low to High</option>
             <option>Price: High to Low</option>
           </select>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)} // Simple filter logic
            className={`p-6 rounded-md bg-[#141414] border ${activeCategory === cat.name ? 'border-[#FF4D00]' : 'border-[#262626]'} hover:border-[#404040] transition-all text-left group relative overflow-hidden`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${cat.color} opacity-50`} />
            <h3 className="font-bold text-white mb-1">{cat.name}</h3>
            <p className="text-xs text-[#525252] group-hover:text-[#A3A3A3]">View Products →</p>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};