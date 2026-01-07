import React, { useContext, useState, useEffect } from 'react';
import { ArrowLeft, Check, Truck, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { AppContext } from '../App';
import { MOCK_PRODUCTS } from '../constants';
import { Button } from './Button';
import { ProductVariant } from '../types';

export const ProductDetail: React.FC = () => {
  const { selectedProductId, setCurrentView, addToCart, setIsCartOpen } = useContext(AppContext);
  const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product || !selectedVariant) return <div className="text-white pt-32 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
      <button 
        onClick={() => setCurrentView('shop')}
        className="flex items-center text-[#A3A3A3] hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#141414] rounded-lg border border-[#262626] flex items-center justify-center p-12">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square bg-[#141414] rounded-md border border-[#262626] cursor-pointer hover:border-[#FF4D00] transition-colors p-2">
                 <img src={product.image} alt="" className="w-full h-full object-contain opacity-50 hover:opacity-100" />
               </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h2 className="text-[#FF4D00] font-bold text-sm tracking-widest uppercase mb-2">{product.brand}</h2>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-none">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="font-mono text-3xl text-white font-bold">${selectedVariant.price}</span>
              {product.compareAtPrice && (
                 <span className="font-mono text-xl text-[#525252] line-through">${product.compareAtPrice}</span>
              )}
              {product.badges.includes('sale') && <span className="px-3 py-1 bg-[#EF4444] text-white text-xs font-bold rounded-full">SALE</span>}
            </div>
          </div>

          <div className="h-px bg-[#262626] w-full mb-8" />

          {/* Variants */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-[#A3A3A3] text-xs font-bold uppercase mb-3">Flavor: <span className="text-white">{selectedVariant.flavor}</span></label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-3 rounded-md border text-sm font-medium transition-all ${
                      selectedVariant.flavor === variant.flavor && selectedVariant.size === variant.size
                        ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white' 
                        : 'border-[#262626] bg-[#141414] text-[#A3A3A3] hover:border-[#A3A3A3]'
                    }`}
                  >
                    {variant.flavor} - {variant.size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#A3A3A3] text-xs font-bold uppercase mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#141414] border border-[#262626] rounded-md h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 text-[#A3A3A3] hover:text-white"
                  >-</button>
                  <span className="w-12 text-center font-mono text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 text-[#A3A3A3] hover:text-white"
                  >+</button>
                </div>
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>ADD TO CART</Button>
                <button className="h-12 w-12 flex items-center justify-center border border-[#262626] rounded-md text-[#A3A3A3] hover:text-[#FF4D00] hover:border-[#FF4D00]">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4 text-sm text-[#A3A3A3] mb-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#00D4AA]" />
              <span>In Stock & Ready to Ship</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#00D4AA]" />
              <span>Free Shipping over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00D4AA]" />
              <span>Money Back Guarantee</span>
            </div>
          </div>

          <div className="bg-[#141414] p-6 rounded-lg border border-[#262626]">
            <h3 className="text-white font-bold mb-4">Description</h3>
            <p className="text-[#A3A3A3] leading-relaxed mb-4">{product.description}</p>
            <h4 className="text-white font-bold text-sm mb-2">Key Benefits:</h4>
            <ul className="list-disc list-inside text-[#A3A3A3] space-y-1">
              {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};