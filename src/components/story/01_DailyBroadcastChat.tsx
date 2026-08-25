import React, { useState } from 'react';
import { MessageSquare, Send, Heart, CheckCheck, RefreshCw } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface Message {
  id: string;
  sender: 'akkoi' | 'brother';
  text: string;
  time: string;
  isVoiceNote?: boolean;
}

export const DailyBroadcastChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'akkoi', text: 'Brother...', time: '4:15 PM' },
    { id: '2', sender: 'akkoi', text: 'I have something to tell you.', time: '4:15 PM' },
    { id: '3', sender: 'akkoi', text: 'Actually it is a very long story. Sit down first. 😂', time: '4:16 PM' },
  ]);

  const [chatStep, setChatStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const brotherResponses = [
    { label: 'Oh no... what happened now? 😂', nextStep: 1 },
    { label: 'Did this need a whole 20-minute presentation? 😭', nextStep: 2 },
    { label: 'Tell me everything. I am listening! ❤️', nextStep: 3 },
  ];

  const handleBrotherReply = (replyText: string, stepIndex: number) => {
    soundEngine.playPopSound();
    
    // Add brother reply
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'brother',
      text: replyText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);
    setChatStep(stepIndex);

    setTimeout(() => {
      setIsTyping(false);
      soundEngine.playChimeSound();

      let akkoiReplies: string[] = [];
      if (stepIndex === 1) {
        akkoiReplies = [
          'Listen first!! 😤',
          'So basically at college/school today during lunch...',
          'My friend said something, and then the teacher gave that LOOK, and then total chaos started! 💀',
        ];
      } else if (stepIndex === 2) {
        akkoiReplies = [
          'YES IT WAS A MATTER OF LIFE AND DEATH 😤',
          'Every character in this story needs full backstory and dramatic pauses.',
          'You are my brother, so you are contractually obligated to listen to all 45 minutes of it! 😂❤️',
        ];
      } else {
        akkoiReplies = [
          'Okay so here is the full chronological timeline...',
          'From 9:00 AM to 4:00 PM with all group chat screenshots included. 📱✨',
          'See? You are the only person who actually sits and listens to all my nonsense! 😂❤️',
        ];
      }

      akkoiReplies.forEach((text, i) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${i}`,
              sender: 'akkoi',
              text,
              time: 'Just now',
            },
          ]);
        }, (i + 1) * 600);
      });
    }, 1000);
  };

  const handleReset = () => {
    soundEngine.playPopSound();
    setMessages([
      { id: '1', sender: 'akkoi', text: 'Brother...', time: '4:15 PM' },
      { id: '2', sender: 'akkoi', text: 'I have something to tell you.', time: '4:15 PM' },
      { id: '3', sender: 'akkoi', text: 'Actually it is a very long story. Sit down first. 😂', time: '4:16 PM' },
    ]);
    setChatStep(0);
    setIsTyping(false);
  };

  const storyCategories = [
    { title: 'School / College Stories', icon: '🏫', desc: 'Every teacher reaction re-enacted with Oscar-level drama' },
    { title: 'Best Friend Updates', icon: '👯‍♀️', desc: 'Trusting her brother to know every character in her universe' },
    { title: 'Random Life Masterplans', icon: '✨', desc: 'Discussing impossible dreams like they are happening tomorrow' },
    { title: 'The 20-Min Presentation', icon: '🎙️', desc: 'No story is complete without 15 dramatic pauses' },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10" id="daily-broadcast">
      
      {/* Chapter Badge */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chapter 01 • The Daily Broadcast</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          A Normal Conversation With Akkoi
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          Whenever you call or text, it is never a 2-minute summary. It is a full cinematic feature film! 😂
        </p>
      </div>

      {/* Interactive WhatsApp / Sibling Chat Box */}
      <div className="max-w-xl mx-auto glass-panel rounded-3xl border border-festive-gold/25 shadow-2xl overflow-hidden mb-10">
        
        {/* Chat Header */}
        <div className="bg-obsidian-900/90 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-festive-amber to-festive-rose p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center text-festive-amber font-serif font-bold text-sm">
                👑
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-obsidian-950" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-festive-cream flex items-center gap-1.5">
                <span>Akkoi (Rakshasi) ❤️</span>
              </h4>
              <span className="text-[10px] text-emerald-400 font-mono">
                {isTyping ? 'Typing a 500-word paragraph...' : 'Online • 24/7 Broadcast'}
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-festive-amber hover:bg-white/5 transition-all text-xs flex items-center gap-1"
            title="Replay conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Replay</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="p-4 sm:p-6 space-y-3.5 min-h-[280px] max-h-[380px] overflow-y-auto bg-gradient-to-b from-obsidian-950/90 to-obsidian-900/90 custom-scrollbar">
          {messages.map((m) => {
            const isAkkoi = m.sender === 'akkoi';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isAkkoi ? 'items-start' : 'items-end'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans shadow-md ${
                    isAkkoi
                      ? 'bg-obsidian-800/90 text-slate-100 border border-slate-700/60 rounded-tl-sm'
                      : 'bg-gradient-to-r from-festive-amber/30 to-festive-gold/20 text-festive-cream border border-festive-gold/40 rounded-tr-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-[9px] ${isAkkoi ? 'text-slate-400 justify-start' : 'text-festive-amber/80 justify-end'}`}>
                    <span>{m.time}</span>
                    {!isAkkoi && <CheckCheck className="w-3 h-3 text-festive-amber" />}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-obsidian-800/80 border border-slate-700/50 w-20 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-festive-amber animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-festive-amber animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-festive-amber animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Brother Interactive Reply Bar */}
        <div className="p-3 sm:p-4 bg-obsidian-900/95 border-t border-slate-800">
          <p className="text-[10px] font-mono text-festive-amber uppercase tracking-wider mb-2">
            Your Reply as Younger Brother:
          </p>
          <div className="flex flex-wrap gap-2">
            {brotherResponses.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleBrotherReply(btn.label, btn.nextStep)}
                disabled={isTyping || chatStep === btn.nextStep}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1.5 ${
                  chatStep === btn.nextStep
                    ? 'bg-festive-amber text-slate-950 font-bold border border-festive-amber'
                    : 'bg-obsidian-800 border border-slate-700 hover:border-festive-gold text-slate-300 hover:text-white'
                }`}
              >
                <span>{btn.label}</span>
                <Send className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4 Feature Story Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {storyCategories.map((item) => (
          <div
            key={item.title}
            className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-festive-gold/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <h4 className="font-serif font-bold text-sm text-festive-cream mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sweet Brotherly Tagline */}
      <div className="mt-8 text-center">
        <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold flex items-center justify-center gap-2">
          <span>"And somehow... I will always sit and listen to every single word."</span>
          <Heart className="w-5 h-5 text-festive-rose fill-festive-rose" />
        </p>
      </div>

    </section>
  );
};
