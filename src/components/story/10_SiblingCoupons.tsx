import React, { useState } from 'react';
import { Ticket, Sparkles, Check, Car, Utensils, ShieldAlert, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../services/audioService';

interface Coupon {
  id: string;
  code: string;
  title: string;
  benefit: string;
  finePrint: string;
  icon: typeof Car;
  color: string;
  borderGlow: string;
}

export const SiblingCoupons: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>({});

  const coupons: Coupon[] = [
    {
      id: 'coupon-1',
      code: 'AKKOI-TAXI-01',
      title: 'Free Chauffeur & Taxi Pass 🚗',
      benefit: 'One free ride anywhere with brother as your designated driver and bag carrier.',
      finePrint: 'Valid 24/7. Aux cord privileges included without brother complaints.',
      icon: Car,
      color: 'from-amber-500/20 to-yellow-600/10',
      borderGlow: 'border-amber-500/40 hover:border-amber-400',
    },
    {
      id: 'coupon-2',
      code: 'SNACK-DROID-02',
      title: 'Midnight Snack Delivery 🍟',
      benefit: 'Brother must fetch or order your favorite late-night food & Uncle Chips.',
      finePrint: '100% on brother\'s bill. No negotiation allowed.',
      icon: Utensils,
      color: 'from-orange-500/20 to-amber-600/10',
      borderGlow: 'border-orange-500/40 hover:border-orange-400',
    },
    {
      id: 'coupon-3',
      code: 'SHIELD-BLAME-03',
      title: 'Get-Out-Of-Trouble Card 🛡️',
      benefit: 'Brother takes 100% of the blame for any household mishap or broken item.',
      finePrint: 'Guaranteed plausible deniability in front of parents.',
      icon: ShieldAlert,
      color: 'from-rose-500/20 to-red-600/10',
      borderGlow: 'border-rose-500/40 hover:border-rose-400',
    },
    {
      id: 'coupon-4',
      code: 'WIN-ARGUMENT-04',
      title: 'Automatic Win Argument Pass 🏆',
      benefit: 'Brother instantly surrenders and admits you were 100% right all along.',
      finePrint: 'Single-use emergency weapon. Use wisely during high drama!',
      icon: Trophy,
      color: 'from-purple-500/20 to-pink-600/10',
      borderGlow: 'border-purple-500/40 hover:border-purple-400',
    },
  ];

  const handleRedeem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (redeemed[id]) return;

    soundEngine.playStampSound();
    setRedeemed((prev) => ({ ...prev, [id]: true }));

    // Confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#ffffff'],
    });
  };

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative z-10" id="sibling-coupons">
      
      {/* Chapter Badge */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Ticket className="w-3.5 h-3.5" />
          <span>Chapter 10 • Sibling Lifetime Vouchers</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          Akkoi's Redeemable Sibling Coupons
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          Officially guaranteed by your brother. Tap "REDEEM COUPON" whenever you want to claim your sibling perks!
        </p>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {coupons.map((c) => {
          const isRedeemed = !!redeemed[c.id];
          const Icon = c.icon;

          return (
            <div
              key={c.id}
              className={`relative p-6 rounded-3xl border-2 transition-all duration-300 bg-gradient-to-br ${c.color} ${c.borderGlow} flex flex-col justify-between overflow-hidden shadow-xl ${
                isRedeemed ? 'bg-obsidian-950/90 border-emerald-500/60' : 'hover:-translate-y-1'
              }`}
            >
              {/* Cutout notch circles for authentic ticket look */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0a0a0f] border-r-2 border-festive-gold/40" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0a0a0f] border-l-2 border-festive-gold/40" />

              <div>
                {/* Coupon Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/10 text-festive-cream">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-festive-amber font-bold tracking-widest">
                      {c.code}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-slate-300">
                    No Expiry
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-festive-cream mb-2">
                  {c.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed mb-3">
                  {c.benefit}
                </p>

                <p className="text-[11px] text-slate-400 font-sans italic border-t border-white/10 pt-2 mb-4">
                  {c.finePrint}
                </p>
              </div>

              {/* Action Button / Redeemed Stamp */}
              <div className="pt-2">
                {!isRedeemed ? (
                  <button
                    onClick={(e) => handleRedeem(c.id, e)}
                    className="w-full py-2.5 rounded-xl font-serif font-bold text-xs bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 tracking-wider"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                    <span>CLAIM & STAMP VOUCHER 🎟️</span>
                  </button>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>OFFICIALLY CLAIMED BY AKKOI ❤️</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Sibling Bottom Guarantee */}
      <div className="mt-10 text-center">
        <p className="font-mono text-xs text-slate-400">
          Backed by brotherly terms of service • Lifetime validity
        </p>
      </div>

    </section>
  );
};
