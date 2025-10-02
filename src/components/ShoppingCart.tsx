import React from 'react';
import { CartItem } from '../types/payment';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <svg
          className="w-24 h-24 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
        <p className="text-purple-100">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex gap-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-3">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, Math.min(item.stock, item.quantity + 1))}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    ({item.stock} available)
                  </span>
                </div>
              </div>

              {/* Item Total & Remove */}
              <div className="flex flex-col items-end justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => onRemoveItem?.(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition-colors flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Shipping:</span>
          <span className="font-semibold">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Tax (10%):</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="pt-3 border-t-2 border-gray-300 flex justify-between">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-3xl font-bold text-purple-600">${total.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            💡 Add ${(50 - subtotal).toFixed(2)} more to get FREE shipping!
          </div>
        )}

        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
