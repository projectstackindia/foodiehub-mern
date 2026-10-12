import { FiMinus, FiPlus, FiTrash2, FiZap } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const food = item.food;

  return (
    <div className="group relative flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/5 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500">
      
      {/* 1. ITEM VISUAL: Locked Scaling */}
      <div className="relative w-24 h-24 overflow-hidden rounded-2xl bg-neutral-900 flex-shrink-0">
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-110"
          style={{ backfaceVisibility: 'hidden' }}
        />
        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* 2. ITEM DATA: Bold & Clean */}
      <div className="flex-grow space-y-1">
        <div className="flex items-center gap-2">
          <FiZap size={10} className="text-emerald-500" />
          <span className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Validated Asset</span>
        </div>
        <h3 className="text-xl font-black tracking-wider text-white uppercase truncate max-w-[200px]">
          {food.title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-emerald-500 text-sm font-black">$</span>
          <span className="text-lg font-black text-white tracking-tighter">{food.price}</span>
        </div>
      </div>

      {/* 3. QUANTITY CONTROL: Tactical Interface */}
      <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
        <button
          onClick={() => onUpdateQuantity(food._id, item.quantity - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 text-gray-400 hover:text-emerald-500 hover:bg-neutral-800 transition-all active:scale-90 border border-white/5 cursor-pointer"
        >
          <FiMinus size={16} />
        </button>
        
        <span className="w-6 text-center font-black text-white text-sm tracking-widest">
          {item.quantity.toString().padStart(2, '0')}
        </span>
        
        <button
          onClick={() => onUpdateQuantity(food._id, item.quantity + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 text-gray-400 hover:text-emerald-500 hover:bg-neutral-800 transition-all active:scale-90 border border-white/5 cursor-pointer"
        >
          <FiPlus size={16} />
        </button>
      </div>

      {/* 4. REMOVE ACTION: Danger Zone */}
      <button
        onClick={() => onRemove(food._id)}
        className="ml-2 w-12 h-12 flex items-center justify-center rounded-2xl text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group/trash cursor-pointer"
      >
        <FiTrash2 size={20} className="group-hover/trash:rotate-12 transition-transform" />
      </button>

      {/* Corner Accent Line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-emerald-500/0 group-hover:bg-emerald-500 transition-all duration-500" />
    </div>
  );
};

export default CartItem;