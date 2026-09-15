import { Target, AlertTriangle, CheckCircle, Clock, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdvisoryCalls() {
  const [isActiveSubscriber] = useState(false); // Simulate un-subscribed state by default or true

  const calls = [
    { id: 1, stock: 'HDFCBANK', type: 'BUY', entry: '1450', target: '1520', sl: '1410', date: 'Oct 12, 2026', status: 'Active' },
    { id: 2, stock: 'TCS', type: 'SELL', entry: '4100', target: '3950', sl: '4180', date: 'Oct 10, 2026', status: 'Active' },
    { id: 3, stock: 'RELIANCE', type: 'BUY', entry: '2900', target: '3100', sl: '2800', date: 'Oct 08, 2026', status: 'Target Achieved' },
    { id: 4, stock: 'INFY', type: 'BUY', entry: '1500', target: '1580', sl: '1470', date: 'Oct 05, 2026', status: 'Stop Loss Hit' },
  ];

  if (!isActiveSubscriber) {
      return (
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-3xl font-black text-white mb-4">Advisory Calls</h1>
          <div className="glass-card p-10 flex flex-col items-center justify-center">
             <Lock size={64} className="text-navy-600 mb-6" />
             <p className="text-text-muted text-xl mb-8">Your advisory subscription is inactive.</p>
             <Link to="/advisory" className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-brand-blue/20">
               View Subscription Plans
             </Link>
          </div>
        </div>
      );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Advisory Calls</h1>
        <p className="text-text-muted">Review your latest structured market insights and active trade levels.</p>
      </div>

      <div className="glass-card overflow-hidden border border-navy-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-navy-800 border-b border-navy-700 text-text-muted text-xs uppercase tracking-wider">
                <th className="p-5 font-semibold">Stock / Type</th>
                <th className="p-5 font-semibold">Entry Level</th>
                <th className="p-5 font-semibold">Target Level</th>
                <th className="p-5 font-semibold">Stop Loss</th>
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/50">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-navy-800/30 transition-colors">
                  <td className="p-5">
                    <p className="text-white font-bold text-lg">{call.stock}</p>
                    <p className={`text-xs font-bold mt-1 ${call.type === 'BUY' ? 'text-brand-green' : 'text-brand-red'}`}>{call.type}</p>
                  </td>
                  <td className="p-5 text-white font-medium">₹{call.entry}</td>
                  <td className="p-5 text-brand-green font-medium">₹{call.target}</td>
                  <td className="p-5 text-brand-red font-medium">₹{call.sl}</td>
                  <td className="p-5 text-text-muted text-sm">{call.date}</td>
                  <td className="p-5">
                    <StatusBadge status={call.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = '';
  let Icon = null;
  
  switch(status) {
    case 'Active':
      colorClass = 'bg-brand-blue/10 text-brand-blue border-brand-blue/20';
      Icon = Clock;
      break;
    case 'Target Achieved':
      colorClass = 'bg-brand-green/10 text-brand-green border-brand-green/20';
      Icon = Target;
      break;
    case 'Stop Loss Hit':
      colorClass = 'bg-brand-red/10 text-brand-red border-brand-red/20';
      Icon = AlertTriangle;
      break;
    default:
      colorClass = 'bg-navy-700 text-text-muted border-navy-600';
      Icon = CheckCircle;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-inset ${colorClass}`}>
      <Icon size={12} /> {status}
    </span>
  );
}
