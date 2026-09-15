import { useState, useEffect } from 'react';
import { Search, UserX, UserCheck, RefreshCw } from 'lucide-react';
import api from '../../api/client';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // Optimistic update
      setUsers(users.map(u => u._id === userId ? { ...u, isActive: !currentStatus } : u));
      await api.put(`/admin/users/${userId}`, { isActive: !currentStatus });
    } catch (err) {
      // Revert if error
      fetchUsers();
      alert('Failed to update user status.');
    }
  };

  const filteredUsers = users.filter((user) => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-brand-blue" size={32} /></div>;
  if (error) return <div className="p-8 text-brand-red">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Registered Users</h1>
          <p className="text-text-muted mt-1">Manage platform access and monitor clients.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-navy-900 border border-navy-700 rounded-lg text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all w-64"
            />
          </div>
          <button onClick={fetchUsers} className="p-2.5 bg-navy-800 hover:bg-navy-700 text-white rounded-lg border border-navy-700 transition-colors">
             <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="bg-navy-900/50 rounded-xl border border-navy-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-800 text-text-muted border-b border-navy-700 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Joined Date</th>
                <th className="p-4 font-medium">Verified</th>
                <th className="p-4 font-medium">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700/50">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-navy-800/30 transition-colors">
                  <td className="p-4 text-white font-medium">{user.name}</td>
                  <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {user.isVerified ? (
                      <span className="text-brand-green bg-brand-green/10 text-xs px-2 py-1 rounded-full border border-brand-green/20">Verified</span>
                    ) : (
                      <span className="text-yellow-500 bg-yellow-500/10 text-xs px-2 py-1 rounded-full border border-yellow-500/20">Pending</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleUserStatus(user._id, user.isActive)}
                      className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                        user.isActive 
                          ? 'text-brand-red hover:bg-brand-red/10 border-brand-red/20' 
                          : 'text-brand-green hover:bg-brand-green/10 border-brand-green/20'
                      }`}
                    >
                      {user.isActive ? <><UserX size={16} /> Ban User</> : <><UserCheck size={16} /> Unban</>}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-text-muted">
                    No users matched your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
