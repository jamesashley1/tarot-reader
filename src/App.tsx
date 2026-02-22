/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  ChevronRight, 
  MessageCircle,
  Moon,
  Sun,
  Wind,
  Droplets,
  Flame,
  Gem
} from 'lucide-react';
import { TAROT_DECK, TarotCard, Suit } from './tarotData';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type ReadingState = 'welcome' | 'shuffling' | 'drawing' | 'interpreting' | 'finished';

interface DrawnCard extends TarotCard {
  isReversed: boolean;
  position: 'Past' | 'Present' | 'Future';
}

const MadameLuna = ({ message, isTyping }: { message: string, isTyping: boolean }) => (
  <div className="relative flex items-start gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-2xl mx-auto mb-8">
    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white/30 shadow-inner">
      <span className="text-2xl">🔮</span>
    </div>
    <div className="flex-grow">
      <h3 className="text-purple-300 font-serif italic text-sm mb-1 uppercase tracking-widest">Madame Luna</h3>
      <p className="text-white text-lg leading-relaxed font-light">
        {message}
        {isTyping && <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 animate-bounce" />}
      </p>
    </div>
    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-600/50 rounded-full blur-xl animate-pulse" />
  </div>
);

const Card = ({ card, isFlipped, onClick, index, isReversed }: { 
  card: TarotCard | null, 
  isFlipped: boolean, 
  onClick?: () => void,
  index: number,
  isReversed?: boolean
}) => {
  const getSuitIcon = (suit: Suit) => {
    switch (suit) {
      case Suit.WANDS: return <Flame className="w-4 h-4 text-orange-400" />;
      case Suit.CUPS: return <Droplets className="w-4 h-4 text-blue-400" />;
      case Suit.SWORDS: return <Wind className="w-4 h-4 text-slate-300" />;
      case Suit.PENTACLES: return <Gem className="w-4 h-4 text-emerald-400" />;
      default: return <Moon className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div 
      className="perspective-1000 w-48 h-72 cursor-pointer group"
      onClick={onClick}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0, rotateZ: isReversed ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden bg-indigo-950 rounded-xl border-4 border-amber-500/30 flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent animate-pulse" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-amber-500/70" />
            </div>
            <span className="text-amber-500/50 font-serif text-xs tracking-[0.3em] uppercase">The Arcana</span>
          </div>
          {/* Decorative corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/30" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/30" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/30" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/30" />
        </div>

        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-stone-100 rounded-xl border-4 border-amber-600/40 flex flex-col p-4 shadow-2xl rotate-y-180 overflow-hidden">
          {card && (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">{card.suit}</span>
                {getSuitIcon(card.suit)}
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="w-full aspect-[3/4] bg-stone-200 rounded-lg mb-4 overflow-hidden relative border border-stone-300">
                  <img 
                    src={`https://picsum.photos/seed/${card.imageSeed}/300/400?grayscale&blur=1`} 
                    alt={card.name}
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-100/50 to-transparent" />
                </div>
                <h4 className="font-serif text-lg text-stone-800 leading-tight mb-1">{card.name}</h4>
                <p className="text-[10px] text-stone-500 italic px-2 line-clamp-3">{card.description}</p>
              </div>

              <div className="mt-auto pt-2 border-t border-stone-300 flex justify-center">
                <span className="text-[10px] font-serif italic text-stone-400">Card No. {card.id}</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [state, setState] = useState<ReadingState>('welcome');
  const [question, setQuestion] = useState('');
  const [deck, setDeck] = useState<TarotCard[]>([...TAROT_DECK]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [madameMessage, setMadameMessage] = useState("Welcome, seeker. The stars have whispered of your arrival. What weighs upon your soul today?");
  const [isTyping, setIsTyping] = useState(false);
  const [interpretation, setInterpretation] = useState<string>('');

  const speak = useCallback((msg: string) => {
    setIsTyping(true);
    setMadameMessage(msg);
    setTimeout(() => setIsTyping(false), 1500);
  }, []);

  const shuffleDeck = () => {
    setState('shuffling');
    speak("I am mixing the energies of the cosmos... focus on your question.");
    
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setState('drawing');
      speak("The deck is ready. Draw three cards: one for your Past, one for your Present, and one for your Future.");
    }, 2500);
  };

  const drawCard = (index: number) => {
    if (drawnCards.length >= 3) return;

    const positions: ('Past' | 'Present' | 'Future')[] = ['Past', 'Present', 'Future'];
    const newCard = deck[0];
    const isReversed = Math.random() > 0.7; // 30% chance of reversal
    
    const drawn: DrawnCard = {
      ...newCard,
      isReversed,
      position: positions[drawnCards.length]
    };

    setDrawnCards(prev => [...prev, drawn]);
    setDeck(prev => prev.slice(1));

    if (drawnCards.length === 0) {
      speak(`Ah, the ${drawn.name} in your Past. ${drawn.meaning}`);
    } else if (drawnCards.length === 1) {
      speak(`The ${drawn.name} reveals your Present. ${drawn.meaning}`);
    } else {
      speak(`And finally, the ${drawn.name} lights the way to your Future. ${drawn.meaning}`);
      setTimeout(() => {
        setState('interpreting');
        getGeminiInterpretation([...drawnCards, drawn]);
      }, 3000);
    }
  };

  const getGeminiInterpretation = async (cards: DrawnCard[]) => {
    speak("Let me peer deeper into the tapestry of your fate...");
    setIsTyping(true);

    try {
      const prompt = `You are Madame Luna, a playful, mystical, and slightly eccentric tarot reader. 
      The seeker asked: "${question || 'General reading'}"
      
      The cards drawn are:
      1. Past: ${cards[0].name} ${cards[0].isReversed ? '(Reversed)' : ''} - ${cards[0].meaning}
      2. Present: ${cards[1].name} ${cards[1].isReversed ? '(Reversed)' : ''} - ${cards[1].meaning}
      3. Future: ${cards[2].name} ${cards[2].isReversed ? '(Reversed)' : ''} - ${cards[2].meaning}
      
      Provide a cohesive, mystical, and encouraging interpretation of this spread. Use your playful "Madame Luna" voice. Keep it to about 3-4 short paragraphs.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setInterpretation(response.text || "The spirits are shy today, but the cards speak of great transformation.");
      setState('finished');
      speak("The spirits have spoken. Behold your destiny!");
    } catch (error) {
      console.error(error);
      setInterpretation("The mists of time are thick today, but know that your path is your own to forge.");
      setState('finished');
    } finally {
      setIsTyping(false);
    }
  };

  const reset = () => {
    setDrawnCards([]);
    setDeck([...TAROT_DECK]);
    setQuestion('');
    setInterpretation('');
    setState('welcome');
    speak("The cards are cleared. Shall we peek behind the veil once more?");
  };

  return (
    <div className="min-h-screen bg-[#0a0510] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#2a1540_0%,transparent_70%)] opacity-50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0a0510]/80 to-[#0a0510]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-serif italic mb-2 bg-gradient-to-r from-amber-200 via-purple-300 to-pink-200 bg-clip-text text-transparent drop-shadow-sm">
            Madame Luna's Tarot
          </h1>
          <p className="text-purple-300/60 uppercase tracking-[0.5em] text-xs font-light">Whispers from the Void</p>
        </motion.header>

        <MadameLuna message={madameMessage} isTyping={isTyping} />

        <AnimatePresence mode="wait">
          {state === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-lg space-y-6"
            >
              <div className="relative">
                <input 
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What do you seek to know? (Optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
                />
                <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 w-6 h-6" />
              </div>
              <button 
                onClick={shuffleDeck}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 p-px rounded-2xl shadow-xl hover:shadow-purple-500/20 transition-all"
              >
                <div className="relative bg-[#0a0510] rounded-[15px] px-8 py-4 group-hover:bg-transparent transition-colors flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                  <span className="text-xl font-medium tracking-wide">Begin the Reading</span>
                </div>
              </button>
            </motion.div>
          )}

          {(state === 'shuffling' || state === 'drawing' || state === 'interpreting') && (
            <motion.div 
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {['Past', 'Present', 'Future'].map((pos, i) => (
                  <div key={pos} className="flex flex-col items-center gap-4">
                    <span className="text-purple-300/40 uppercase tracking-widest text-[10px] font-bold">{pos}</span>
                    <Card 
                      card={drawnCards[i] || null}
                      isFlipped={!!drawnCards[i]}
                      index={i}
                      isReversed={drawnCards[i]?.isReversed}
                      onClick={() => state === 'drawing' && drawnCards.length === i && drawCard(i)}
                    />
                  </div>
                ))}
              </div>

              {state === 'drawing' && drawnCards.length < 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-white/40 italic animate-pulse">Click a card position to draw...</p>
                </motion.div>
              )}

              {state === 'shuffling' && (
                <div className="flex gap-2">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.1 
                      }}
                      className="w-12 h-20 bg-purple-900/40 rounded-lg border border-purple-500/30"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {state === 'finished' && (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
                <div className="flex flex-col gap-6 sticky top-8">
                  {drawnCards.map((card, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-12 h-16 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={`https://picsum.photos/seed/${card.imageSeed}/100/150?grayscale`} 
                          alt={card.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-purple-400 uppercase font-bold">{card.position}</p>
                        <h5 className="font-serif text-white">{card.name}</h5>
                        {card.isReversed && <span className="text-[9px] text-pink-400 uppercase">Reversed</span>}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={reset}
                    className="mt-4 flex items-center justify-center gap-2 text-purple-400 hover:text-white transition-colors py-3 border border-purple-500/20 rounded-xl hover:bg-purple-500/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>New Reading</span>
                  </button>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 mb-6 text-amber-200">
                      <Sparkles className="w-5 h-5" />
                      <h2 className="text-2xl font-serif italic m-0">The Interpretation</h2>
                    </div>
                    <div className="text-lg leading-relaxed text-purple-50/90 font-light whitespace-pre-wrap">
                      {interpretation}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
