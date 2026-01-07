import React, { useContext, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, User, ChevronRight, Trash2, Plus, Minus, Dumbbell } from 'lucide-react';
import { AppContext } from '../App';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, setCurrentView } = useContext(AppContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentView('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF4D00] to-[#FF8800] rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
            <span className="font-display font-bold text-white text-lg -rotate-45 group-hover:rotate-0 transition-transform">P</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg tracking-wider text-white">PEAK</span>
            <span className="font-mono text-[10px] text-[#00D4AA] tracking-[0.2em]">PERFORMANCE</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentView('shop')} className="text-sm font-medium text-[#A3A3A3] hover:text-[#FF4D00] transition-colors">SHOP</button>
          <button onClick={() => setCurrentView('gym')} className="text-sm font-medium text-[#A3A3A3] hover:text-[#FF4D00] transition-colors">GYM</button>
          <button className="text-sm font-medium text-[#A3A3A3] hover:text-[#FFB800] transition-colors">DEALS</button>
          <button className="text-sm font-medium text-[#A3A3A3] hover:text-white transition-colors">ABOUT</button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-[#FF4D00] transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-[#FF4D00] transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </button>
          <button 
            className="relative text-white hover:text-[#FF4D00] transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4D00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateCartQty, cartTotal } = useContext(AppContext);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="relative w-full max-w-md h-full bg-[#141414] border-l border-[#262626] shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in-right"
      >
        <div className="p-6 border-b border-[#262626] flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-white">YOUR CART</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#A3A3A3] hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-6 bg-[#0A0A0A] border-b border-[#262626]">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-[#A3A3A3]">
              {progress < 100 
                ? `Add $${(freeShippingThreshold - cartTotal).toFixed(2)} for FREE GIFT` 
                : "🎉 YOU'VE UNLOCKED A FREE GIFT!"}
            </span>
            <span className="text-white">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-[#262626] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF8800] transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Dumbbell className="w-16 h-16 text-[#262626]" />
              <p className="text-[#A3A3A3]">Your gym bag is empty.</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline">START SHOPPING</Button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 animate-slide-up">
                <div className="w-20 h-20 bg-[#0A0A0A] rounded-md overflow-hidden border border-[#262626]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                    <span className="font-mono text-xs text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] mb-3">{item.selectedVariant.flavor} • {item.selectedVariant.size}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#262626] rounded-sm">
                      <button 
                        onClick={() => updateCartQty(item.id, idx, -1)}
                        className="p-1 text-[#A3A3A3] hover:text-white hover:bg-[#262626]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, idx, 1)}
                        className="p-1 text-[#A3A3A3] hover:text-white hover:bg-[#262626]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, idx)}
                      className="text-[#525252] hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#262626] bg-[#141414]">
            <div className="flex justify-between items-center mb-4 text-[#A3A3A3] text-sm">
              <span>Subtotal</span>
              <span className="font-mono text-white text-lg font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#525252] mb-6 text-center">Shipping & taxes calculated at checkout</p>
            <Button className="w-full" size="lg">CHECKOUT SECURELY</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-2xl tracking-wider text-white">PEAK</span>
              <span className="font-mono text-xs text-[#00D4AA] tracking-[0.2em]">PERFORMANCE HUB</span>
            </div>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Canada's premier destination for high-performance supplements and elite training facilities.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">SHOP</h4>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li><a href="#" className="hover:text-[#FF4D00]">Protein</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Pre-Workout</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Vitamins</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Bundles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">GYM</h4>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li><a href="#" className="hover:text-[#FF4D00]">Memberships</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Day Pass</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Personal Training</a></li>
              <li><a href="#" className="hover:text-[#FF4D00]">Schedule</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">NEWSLETTER</h4>
            <p className="text-sm text-[#A3A3A3] mb-4">Join the community for exclusive deals.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#141414] border border-[#262626] text-white text-sm px-4 py-2 rounded-sm focus:outline-none focus:border-[#FF4D00] w-full"
              />
              <Button size="sm">JOIN</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#262626] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#525252]">
          <p>© 2025 Peak Performance Hub. Ontario, Canada.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};