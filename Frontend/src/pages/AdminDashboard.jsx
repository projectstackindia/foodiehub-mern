import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FiPlus, FiPackage, FiDollarSign, FiShoppingBag, FiShield, FiRefreshCw, FiChevronDown, FiUpload, FiAlertCircle, FiTrash2 } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('foods');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Pizza',
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [imageFileName, setImageFileName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openOrderDropdown, setOpenOrderDropdown] = useState(null);
  const [orderStatusLoading, setOrderStatusLoading] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteFoodId, setDeleteFoodId] = useState(null);

  // Validation functions
  const validateTitle = (title) => {
    if (!title || title.trim().length < 3) return 'TITLE MUST BE AT LEAST 3 CHARACTERS';
    return '';
  };
  const validateDescription = (desc) => {
    if (!desc) return 'DESCRIPTION IS REQUIRED';
    const len = desc.trim().length;
    if (len < 20) return 'DESCRIPTION MUST BE AT LEAST 20 CHARACTERS';
    if (len > 100) return 'DESCRIPTION MUST NOT EXCEED 100 CHARACTERS';
    return '';
  };
  const validatePrice = (price) => {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) return 'PRICE MUST BE A POSITIVE NUMBER';
    return '';
  };
  const validateImage = () => {
    if (!editingFood && !formData.image) return 'IMAGE IS REQUIRED';
    return '';
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'foods') {
        const { data } = await axios.get('/api/foods');
        setFoods(data);
      } else {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      addToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    const titleErr = validateTitle(formData.title);
    const descErr = validateDescription(formData.description);
    const priceErr = validatePrice(formData.price);
    const imageErr = validateImage();
    const errors = {
      title: titleErr,
      description: descErr,
      price: priceErr,
      image: imageErr,
    };
    setFormErrors(errors);
    if (titleErr || descErr || priceErr || imageErr) return;

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    if (formData.image) formDataToSend.append('image', formData.image);

    try {
      if (editingFood) {
        await axios.put(`/api/foods/${editingFood._id}`, formDataToSend);
        addToast('Food updated', 'success');
      } else {
        await axios.post('/api/foods', formDataToSend);
        addToast('Food added', 'success');
      }
      fetchData();
      setShowModal(false);
      resetForm();
    } catch (error) {
      const msg = error.response?.data?.message || 'Operation failed';
      addToast(msg, 'error');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteFoodId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteFoodId) return;
    try {
      await axios.delete(`/api/foods/${deleteFoodId}`);
      addToast('Food deleted', 'success');
      fetchData();
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to delete', 'error');
    } finally {
      setDeleteModalOpen(false);
      setDeleteFoodId(null);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    setOrderStatusLoading(orderId);
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      addToast('Order status updated', 'success');
      fetchData();
    } catch (error) {
      if (error.response?.status === 429) {
        addToast('Too many status updates. Please try after 15 minutes.', 'error');
      } else {
        addToast(error.response?.data?.message || 'Failed to update status', 'error');
      }
    } finally {
      setOrderStatusLoading(null);
    }
  };

  const resetForm = () => {
    setEditingFood(null);
    setFormData({ title: '', description: '', price: '', category: 'Pizza', image: null });
    setImageFileName('');
    setFormErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImageFileName(file.name);
      setFormErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const stats = {
    totalFoods: foods.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
  };

  if (loading) return <Loader />;
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303] text-white">
        <div className="text-center p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl">
          <FiShield className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black uppercase tracking-wider">Access Denied</h2>
          <p className="text-gray-400 mt-2">You are not authorized to view this page.</p>
        </div>
      </div>
    );
  }

  const categories = ['Pizza', 'Burger', 'Sushi', 'Salad', 'Dessert'];
  const orderStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

  return (
    <div className="container-custom py-24 min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <div className="mb-20">
        <div className="flex items-center gap-3 text-emerald-500 mb-4">
          <FiShield size={20} />
          <span className="text-[10px] font-black tracking-[0.6em] uppercase">Admin Command Center</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] uppercase">
          SYSTEM <span className="text-emerald-500">DASHBOARD</span>
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-600 mb-2">Total Foods</p>
          <p className="text-4xl font-black tracking-tighter">{stats.totalFoods}</p>
          <FiShoppingBag className="text-3xl mt-4 text-emerald-500/50" />
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:scale-105 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-600 mb-2">Total Orders</p>
          <p className="text-4xl font-black tracking-tighter">{stats.totalOrders}</p>
          <FiPackage className="text-3xl mt-4 text-emerald-500/50" />
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:scale-105 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-600 mb-2">Revenue</p>
          <p className="text-4xl font-black tracking-tighter">${stats.totalRevenue.toFixed(0)}</p>
          <FiDollarSign className="text-3xl mt-4 text-emerald-500/50" />
        </div>
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:scale-105 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-600 mb-2">Pending Orders</p>
          <p className="text-4xl font-black tracking-tighter">{stats.pendingOrders}</p>
          <FiRefreshCw className="text-3xl mt-4 text-emerald-500/50" />
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-6 mb-12">
        <button
          onClick={() => setActiveTab('foods')}
          className={`px-12 py-5 rounded-2xl font-black text-base uppercase tracking-[0.3em] transition-all duration-300 ${
            activeTab === 'foods'
              ? 'bg-emerald-600 text-black shadow-xl'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          FOODS
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-12 py-5 rounded-2xl font-black text-base uppercase tracking-[0.3em] transition-all duration-300 ${
            activeTab === 'orders'
              ? 'bg-emerald-600 text-black shadow-xl'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          ORDERS
        </button>
      </div>

      {/* Foods Tab */}
      {activeTab === 'foods' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="mb-12 bg-emerald-600 hover:bg-emerald-500 px-10 py-5 rounded-xl font-black text-sm tracking-[0.3em] uppercase flex items-center gap-3 transition-all shadow-lg"
          >
            <FiPlus size={20} /> ADD NEW FOOD
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {foods.map((food) => {
                const cleanDescription = food.description?.replace(/,/g, '').toUpperCase();
                return (
                  <motion.div
                    key={food._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:shadow-2xl"
                  >
                    <img src={food.image} className="w-full h-56 object-cover" alt={food.title} />
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black tracking-wider uppercase">{food.title}</h3>
                        <span className="bg-emerald-500 text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                          {food.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-base font-bold uppercase tracking-wider leading-relaxed line-clamp-3">
                        {cleanDescription}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-emerald-500 text-3xl font-black tracking-wider">${food.price}</span>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={() => {
                            setEditingFood(food);
                            setFormData({
                              title: food.title,
                              description: food.description,
                              price: food.price,
                              category: food.category,
                              image: null,
                            });
                            setImageFileName('');
                            setFormErrors({});
                            setShowModal(true);
                          }}
                          className="flex-1 bg-white/10 hover:bg-white/20 py-5 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteClick(food._id)}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 py-5 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-sm tracking-wider uppercase">No orders found</p>
            </div>
          ) : (
            orders.map((order) => {
              const isOpen = openOrderDropdown === order._id;
              return (
                <div key={order._id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl transition-all hover:border-emerald-500/30">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <p className="text-base font-black tracking-wider text-emerald-500 uppercase">ORDER #{order._id.slice(-8)}</p>
                      <p className="text-sm text-gray-400 mt-2 uppercase"><span className="font-black text-white">DATE :</span> {formatDate(order.createdAt)}</p>
                      <p className="text-sm text-gray-400 uppercase"><span className="font-black text-white">TIME :</span> {formatTime(order.createdAt)}</p>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenOrderDropdown(isOpen ? null : order._id)}
                        className="bg-black/50 border border-white/20 rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider flex items-center gap-3 min-w-[140px] justify-between"
                        disabled={orderStatusLoading === order._id}
                      >
                        {order.status.toUpperCase().replace(/_/g, ' ')}
                        {orderStatusLoading === order._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
                        )}
                      </button>
                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden shadow-2xl z-20">
                          {orderStatuses.map((status) => (
                            <div
                              key={status}
                              onClick={() => {
                                handleUpdateOrderStatus(order._id, status);
                                setOpenOrderDropdown(null);
                              }}
                              className="px-5 py-3 hover:bg-white/10 cursor-pointer uppercase text-sm font-black tracking-wider transition-colors"
                            >
                              {status.toUpperCase().replace(/_/g, ' ')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 text-base text-gray-300 uppercase">
                    <span className="font-black">CUSTOMER :</span> {order.user?.name?.toUpperCase()} {order.user?.email?.toUpperCase()}
                  </div>
                  <hr className="w-full border-t border-white/10 my-4" />
                  <div className="space-y-3 my-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-base font-medium">
                        <span className="uppercase">{item.name?.toUpperCase()} x {item.quantity}</span>
                        <span className="text-emerald-400 font-black">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <hr className="w-full border-t border-white/10 my-4" />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-base font-black tracking-wider uppercase">TOTAL</span>
                    <span className="text-2xl font-black text-emerald-500">${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 uppercase">
                    DELIVERY : {order.deliveryAddress?.street?.toUpperCase()}, {order.deliveryAddress?.city?.toUpperCase()}
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      )}

     {/* Modal – Add/Edit Food */}
{/* Modal – Add/Edit Food */}
{showModal && (
  <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#0a0a0a] border border-white/20 p-8 rounded-3xl max-w-3xl w-full"
    >
      <h2 className="text-2xl font-black uppercase tracking-[0.3em] mb-6 text-emerald-500">
        {editingFood ? 'EDIT ITEM' : 'NEW ITEM'}
      </h2>
      <form onSubmit={handleFoodSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="TITLE"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setFormErrors({ ...formErrors, title: validateTitle(e.target.value) });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500 uppercase tracking-wider"
              required
            />
            {formErrors.title && (
              <div className="mt-3 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-4 flex items-center gap-3 shadow-md backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-base flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-normal">
                  {formErrors.title}
                </p>
              </div>
            )}
          </div>
          {/* Price */}
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="PRICE"
              value={formData.price}
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
                setFormErrors({ ...formErrors, price: validatePrice(e.target.value) });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500"
              required
            />
            {formErrors.price && (
              <div className="mt-3 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-4 flex items-center gap-3 shadow-md backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-base flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-normal">
                  {formErrors.price}
                </p>
              </div>
            )}
          </div>
          {/* Description */}
          <div className="md:col-span-2">
            <textarea
              placeholder="DESCRIPTION"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setFormErrors({ ...formErrors, description: validateDescription(e.target.value) });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500 uppercase tracking-wider"
              rows="2"
              required
            />
            {formErrors.description && (
              <div className="mt-3 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-4 flex items-center gap-3 shadow-md backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-base flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-normal">
                  {formErrors.description}
                </p>
              </div>
            )}
          </div>
          {/* Category dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500 flex justify-between items-center uppercase tracking-wider"
            >
              {formData.category}
              <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-[#0a0a0a] border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setFormData({ ...formData, category: cat });
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-white/10 cursor-pointer uppercase tracking-wider text-sm transition-colors"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Image Upload - extra margin bottom to prevent overlap */}
          <div className="mb-10">   {/* <-- MB-10 (pehle MB-6 tha, ab aur gap) */}
            <label className="flex flex-col items-center justify-center w-full bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-emerald-500 transition-all group h-full">
              <div className="flex flex-col items-center gap-2">
                <FiUpload className="text-gray-500 text-xl group-hover:text-emerald-500 transition-colors" />
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 group-hover:text-emerald-500 transition-colors text-center">
                  {imageFileName ? imageFileName : (editingFood ? 'CHANGE IMAGE' : 'UPLOAD IMAGE')}
                </span>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {formErrors.image && (
              <div className="mt-3 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-4 py-4 flex items-center gap-3 shadow-md backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-base flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-normal">
                  {formErrors.image}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-5 rounded-xl font-black text-sm uppercase tracking-wider transition-all">
            CONFIRM
          </button>
          <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-white/10 hover:bg-white/20 py-5 rounded-xl font-black text-sm uppercase tracking-wider transition-all">
            CANCEL
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

      {/* Custom Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] border border-white/20 p-8 rounded-3xl max-w-md w-full text-center"
          >
            <FiTrash2 className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-4 text-white">CONFIRM DELETION</h2>
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-8">
              ARE YOU SURE YOU WANT TO DELETE THIS FOOD ITEM? THIS ACTION CANNOT BE UNDONE.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-500 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
              >
                YES, DELETE
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all"
              >
                CANCEL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;