import React, { useState, useEffect, useMemo } from 'react';
import { ViewState, AppContextType, CartItem, Product, ProductVariant } from './types';
import { Navbar, CartDrawer, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';
import { GymMembership } from './components/GymMembership';

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

function App() {
  // State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pph_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    
    // Simulate initial loading sequence
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('pph_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Actions
  const addToCart = (product: Product, variant: ProductVariant, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedVariant.flavor === variant.flavor && item.selectedVariant.size === variant.size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedVariant.flavor === variant.flavor) 
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, quantity: qty, selectedVariant: variant }];
    });
  };

  const removeFromCart = (productId: string, variantIndex: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== variantIndex)); // Simplified logic for demo
  };

  const updateCartQty = (productId: string, variantIndex: number, delta: number) => {
    setCart(prev => prev.map((item, idx) => {
      if (idx === variantIndex) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  // Preloader
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] z-[100] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="font-display font-bold text-4xl text-white tracking-widest animate-pulse">P P H</div>
          <div className="w-48 h-1 bg-[#262626] rounded-full overflow-hidden">
            <div className="h-full bg-[#FF4D00] animate-[slide-in-right_2s_ease-out_forwards]" style={{ width: '100%' }} />
          </div>
          <span className="font-mono text-[#525252] text-xs">INITIATING SYSTEMS...</span>
        </div>
      </div>
    );
  }

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <div className="py-20 bg-[#0A0A0A]">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl text-white font-bold mb-8">TRENDING NOW</h2>
                {/* Simplified preview of shop for home */}
                <Shop /> 
              </div>
            </div>
          </>
        );
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'gym':
        return <GymMembership />;
      default:
        return <Hero />;
    }
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView: (view) => {
        window.scrollTo(0, 0);
        setCurrentView(view);
      },
      selectedProductId,
      setSelectedProductId,
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-body selection:bg-[#FF4D00] selection:text-white">
        <Navbar />
        <CartDrawer />
        
        <main className="min-h-screen">
          {renderView()}
        </main>
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;