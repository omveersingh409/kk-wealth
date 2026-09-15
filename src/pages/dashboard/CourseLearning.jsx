import { CheckCircle2, PlayCircle, Lock, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CourseLearning() {
  // Simulating enrolled state; this would usually come from a backend or Context
  const [isEnrolled] = useState(false);

  const modules = [
    { id: 1, title: 'Introduction to Markets', duration: '12:45', completed: true },
    { id: 2, title: 'Technical Analysis Basics', duration: '24:10', completed: true },
    { id: 3, title: 'Mastering Chart Patterns', duration: '35:20', active: true },
    { id: 4, title: 'Indicators & Tools (RSI, MACD)', duration: '40:15', locked: true },
    { id: 5, title: 'Technical vs Fundamental', duration: '18:30', locked: true },
    { id: 6, title: 'Risk Management Strategy', duration: '28:50', locked: true },
  ];

  if (!isEnrolled) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-3xl font-black text-white mb-4">My Course</h1>
        <div className="glass-card p-10 flex flex-col items-center justify-center">
          <BookOpen size={64} className="text-navy-600 mb-6" />
          <p className="text-text-muted text-xl mb-8">You're not enrolled in the course yet.</p>
          <Link to="/classes" className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-brand-blue/20">
            View Online Class
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto xl:h-[calc(100vh-140px)] flex flex-col xl:flex-row gap-6">
      
      {/* Video Area */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="mb-2">
            <h1 className="text-3xl font-black text-white mb-2">Stock Market Online Class</h1>
            <p className="text-text-muted">Progress: 65%</p>
        </div>
        <div className="w-full aspect-video bg-navy-900 rounded-2xl border border-navy-700 overflow-hidden relative group shadow-xl">
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
           <div className="absolute inset-0 flex items-center justify-center z-20">
             <div className="text-center w-full max-w-sm px-4">
                <div className="w-20 h-20 bg-brand-blue/90 rounded-full mx-auto flex items-center justify-center pl-2 mb-4 group-hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                  <PlayCircle size={40} className="text-white" />
                </div>
                <p className="text-white font-medium">Continue Learning</p>
             </div>
           </div>
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-green/20 blur-[100px] rounded-full pointer-events-none" />
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="glass-card p-6 lg:p-8 flex-1 border border-navy-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">Mastering Chart Patterns</h2>
              <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold border border-brand-blue/20">Module 3</span>
            </div>
            <p className="text-text-muted leading-relaxed mb-6">
              In this module, you will learn how to identify critical chart patterns such as Head & Shoulders, Double Bottoms, Triangles, and Wedges. You will also understand the psychology behind these formations and how to trade breakouts effectively with tight stop losses.
            </p>
          </div>
          
          <div className="flex justify-between items-center border-t border-navy-700/50 pt-6 mt-auto">
            <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors font-medium">
              <ChevronLeft size={20} /> Previous
            </button>
            <button className="flex items-center gap-2 bg-brand-blue hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-lg shadow-brand-blue/20">
              Next Lesson <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Course Sidebar */}
      <div className="w-full xl:w-96 glass-card border border-navy-700 flex flex-col h-[500px] xl:h-full flex-shrink-0 mt-8 xl:mt-16">
        <div className="p-6 border-b border-navy-700">
          <h3 className="font-bold text-white mb-3 text-lg">Course Progress</h3>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-text-muted">6 Modules</span>
            <span className="text-brand-green font-medium">65%</span>
          </div>
          <div className="w-full bg-navy-900 h-2.5 rounded-full overflow-hidden border border-navy-700/50">
            <div className="bg-gradient-to-r from-brand-blue to-brand-green h-full rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {modules.map((m) => (
            <div 
              key={m.id} 
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                m.active 
                  ? 'bg-navy-800/80 border-brand-blue shadow-lg shadow-brand-blue/5' 
                  : m.locked 
                    ? 'bg-navy-900/30 border-transparent opacity-60' 
                    : 'bg-navy-800 border-navy-700 hover:border-brand-blue/30 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {m.completed && <CheckCircle2 size={18} className="text-brand-green" />}
                  {m.active && <PlayCircle size={18} className="text-brand-blue animate-pulse" />}
                  {m.locked && <Lock size={18} className="text-text-muted" />}
                </div>
                <div>
                  <p className={`text-sm font-medium leading-tight mb-1 ${m.active ? 'text-white' : 'text-text-muted'}`}>{m.title}</p>
                  <p className="text-xs text-text-muted/60">{m.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
