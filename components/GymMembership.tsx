import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';

const PlanCard: React.FC<{ name: string; price: number; billing: string; features: string[]; highlight?: boolean }> = ({ 
  name, price, billing, features, highlight 
}) => (
  <div className={`relative p-8 rounded-xl bg-[#141414] border ${highlight ? 'border-[#FF4D00] shadow-[0_0_30px_rgba(255,77,0,0.15)]' : 'border-[#262626]'} flex flex-col h-full transform transition-all hover:-translate-y-2`}>
    {highlight && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF4D00] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <h3 className="text-[#A3A3A3] font-bold tracking-widest text-sm uppercase mb-4">{name}</h3>
    <div className="mb-6">
      <span className="text-5xl font-display font-bold text-white">${price}</span>
      <span className="text-[#525252] text-sm"> / {billing}</span>
    </div>
    
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center text-sm text-[#E5E5E5]">
          <span className="bg-[#262626] p-1 rounded-full mr-3 text-[#00D4AA]">
            <Check className="w-3 h-3" />
          </span>
          {feature}
        </li>
      ))}
    </ul>

    <Button variant={highlight ? 'primary' : 'outline'} className="w-full">
      JOIN NOW
    </Button>
  </div>
);

export const GymMembership: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
        <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">TRAIN AT PEAK</h1>
        <p className="text-[#A3A3A3] text-lg">Ontario's premier strength & conditioning facility. 15,000 sq ft of elite equipment, zero crowds, maximum results.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slide-up delay-100">
        <PlanCard 
          name="Day Pass" 
          price={15} 
          billing="visit" 
          features={['Full gym access', 'Locker use', 'Towel service', 'Valid for 24 hours']} 
        />
        <PlanCard 
          name="Monthly" 
          price={49} 
          billing="month" 
          highlight 
          features={['24/7 Keycard Access', 'All Classes Included', '1 Free PT Session', '10% Off Supplements', 'Cancel Anytime']} 
        />
        <PlanCard 
          name="Annual" 
          price={39} 
          billing="mo (billed annually)" 
          features={['Everything in Monthly', '2 Months Free', 'Priority Class Booking', 'Exclusive Merch Kit', 'Free Guest Pass/Month']} 
        />
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up delay-200">
        {[
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1637430308606-86576d89d6c5?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600'
        ].map((img, i) => (
          <div key={i} className="aspect-square bg-[#141414] rounded-lg overflow-hidden border border-[#262626] group relative">
            <img src={img} alt="Gym Facility" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
               <span className="text-white font-bold text-sm">ZONE {i+1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};