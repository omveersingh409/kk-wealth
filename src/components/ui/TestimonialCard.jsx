import { Quote } from 'lucide-react';

export default function TestimonialCard({ content, author, role }) {
  return (
    <div className="bg-navy-800/40 border border-navy-700 p-8 rounded-2xl relative hover:border-brand-blue/30 transition-all group">
      <Quote size={40} className="absolute top-6 right-6 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors" />
      
      {/* Stars */}
      <div className="flex gap-1 mb-6 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
      </div>

      <p className="text-white text-lg italic mb-6 leading-relaxed relative z-10">"{content}"</p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-navy-900 rounded-full border border-navy-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">{author.charAt(0)}</span>
        </div>
        <div>
          <h4 className="text-white font-bold">{author}</h4>
          <p className="text-sm text-text-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}
