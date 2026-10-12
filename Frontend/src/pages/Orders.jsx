import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import { FiPackage, FiCheckCircle, FiTruck, FiClock, FiShield } from 'react-icons/fi';

const statusIcons = {
  pending: <FiClock size={20} />,
  confirmed: <FiCheckCircle size={20} />,
  preparing: <FiPackage size={20} />,
  out_for_delivery: <FiTruck size={20} />,
  delivered: <FiCheckCircle size={20} />,
  cancelled: <FiClock size={20} />,
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/my');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
    return `${day}-${month}-${year} | ${formattedTime}`;
  };

  if (loading) return <Loader />;

  return (
    <div className="container-custom py-24 min-h-screen">
      <div className="mb-20 space-y-4">
        <div className="flex items-center gap-3 text-emerald-500">
          <FiShield size={20} />
          <span className="text-xs font-black tracking-[0.6em] uppercase">Deployment History</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] uppercase text-white">
          ORDER <span className="text-emerald-500">MANIFESTS</span>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem]">
          <FiPackage className="w-20 h-20 mx-auto text-gray-800 mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">No Logs Found</h2>
        </div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl"
              >
                <div className="flex flex-wrap justify-between items-center mb-10 pb-8 border-b border-white/5 gap-6">
                  <div>
                    <p className="text-[11px] font-black tracking-[0.3em] text-gray-600 uppercase">Log ID : {order._id.slice(-12).toUpperCase()}</p>
                    <p className="text-sm font-bold text-white mt-2 tracking-widest">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 text-white">
                    {statusIcons[order.status]}
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase">{order.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-white">
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-black tracking-[0.1em]">{item.name}</span>
                        <span className="text-xs text-emerald-500 tracking-[0.3em] uppercase">Quantity : {item.quantity}</span>
                      </div>
                      <span className="text-base font-black tracking-[0.2em]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-between items-end pt-8 border-t border-white/5 gap-4">
                  <div className="text-[11px] font-bold text-gray-600 tracking-[0.2em] uppercase">
                    Delivery to : {order.deliveryAddress.street} {order.deliveryAddress.city}
                  </div>
                  <div className="text-3xl font-black text-emerald-500 tracking-tighter">
                     ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Orders;