import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import api from '../../api/client';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productType: 'Course',
    sellingPrice: '',
    originalPrice: '',
    durationDays: '',
    isActive: true
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/courses');
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenForm = (course = null) => {
    if (course) {
      setEditingId(course._id);
      setFormData({
        name: course.name,
        description: course.description || '',
        productType: course.productType,
        sellingPrice: course.sellingPrice,
        originalPrice: course.originalPrice || '',
        durationDays: course.durationDays || '',
        isActive: course.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        productType: 'Course',
        sellingPrice: '',
        originalPrice: '',
        durationDays: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.productType === 'Course') {
        payload.durationDays = null;
      }

      if (editingId) {
        await api.put(`/admin/courses/${editingId}`, payload);
      } else {
        await api.post('/admin/courses', payload);
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Are you sure you want to archive this product? Active enrollments persist, but it will be removed from the store.")) return;
    try {
      await api.delete(`/admin/courses/${id}`);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-brand-blue" size={32} /></div>;
  if (error) return <div className="p-8 text-brand-red">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-navy-700 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Course & Store Management</h1>
          <p className="text-text-muted mt-1">Manage platform products, pricing and content access.</p>
        </div>
        <button onClick={() => handleOpenForm()} className="bg-brand-blue hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-brand-blue/20 transition-all">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className={`glass-card p-6 border transition-all ${course.isActive ? 'border-navy-700 hover:border-brand-blue/40' : 'border-brand-red/30 bg-navy-900/40 opacity-70'}`}>
             <div className="flex justify-between items-start mb-3">
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-1 bg-navy-800 rounded text-text-muted">
                  {course.productType}
                </span>
                {!course.isActive && (
                  <span className="text-xs text-brand-red bg-brand-red/10 px-2 py-1 rounded-full font-bold">Archived</span>
                )}
             </div>
             
             <h3 className="text-xl font-bold text-white mb-2">{course.name}</h3>
             <p className="text-text-muted text-sm mb-4 line-clamp-2 h-10">{course.description || 'No description provided.'}</p>
             
             <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-white">₹{course.sellingPrice}</span>
                {course.originalPrice && <span className="text-sm text-text-muted line-through">₹{course.originalPrice}</span>}
             </div>

             {course.productType === 'Course' ? (
                <div className="text-sm text-brand-blue font-medium mb-4">
                  {course.enrollments || 0} active student{course.enrollments !== 1 && 's'}
                </div>
             ) : (
                <div className="text-sm text-brand-green font-medium mb-4">
                  Advisory Service • {course.durationDays} Days Map
                </div>
             )}

             <div className="flex items-center gap-3 border-t border-navy-700/50 pt-4 mt-auto">
               <button onClick={() => handleOpenForm(course)} className="flex-1 flex justify-center items-center gap-2 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg text-sm font-medium transition-colors">
                  <Edit2 size={14} /> Edit
               </button>
               {course.isActive && (
                 <button onClick={() => handleDeactivate(course._id)} className="p-2 bg-brand-red/10 hover:bg-brand-red/20 text-brand-red rounded-lg transition-colors border border-transparent hover:border-brand-red/30">
                    <Trash2 size={16} />
                 </button>
               )}
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-[#0a1526] border border-navy-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
              <h2 className="text-2xl font-black text-white mb-6">{editingId ? 'Edit Product' : 'Create New Product'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Product Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Product Type</label>
                    <select value={formData.productType} onChange={(e) => setFormData({...formData, productType: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue">
                      <option value="Course">Online Course</option>
                      <option value="Advisory">Equity Advisory</option>
                    </select>
                  </div>
                  {formData.productType === 'Advisory' && (
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Duration (Days)</label>
                      <input type="number" value={formData.durationDays} onChange={(e) => setFormData({...formData, durationDays: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required={formData.productType === 'Advisory'} />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Selling Price (₹)</label>
                    <input type="number" value={formData.sellingPrice} onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" required />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Original Price (Strike)</label>
                    <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2.5 text-white outline-none focus:border-brand-blue font-medium resize-none" />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded bg-navy-900 border-navy-700" />
                  <label htmlFor="isActive" className="text-sm text-white font-medium">Keep Active in Store</label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-navy-800">
                   <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-text-muted hover:text-white transition-colors">Cancel</button>
                   <button type="submit" className="px-5 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-brand-blue/20">Save Product</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
