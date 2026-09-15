import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-navy-700 bg-navy-800/40 rounded-xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleOpen(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <h3 className="text-lg font-bold text-white pr-4">{item.title}</h3>
              {isOpen ? (
                <ChevronUp className="text-brand-blue flex-shrink-0" size={20} />
              ) : (
                <ChevronDown className="text-text-muted flex-shrink-0" size={20} />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 border-t border-navy-700/50">
                <div className="text-text-muted text-base leading-relaxed break-words">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
