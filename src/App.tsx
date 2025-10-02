import { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import { CartItem, ShippingInfo, PaymentInfo } from './types/payment';

const App = () => {
  const [view, setView] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      quantity: 2,
      stock: 45,
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      quantity: 1,
      stock: 30,
    },
  ]);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    setView('checkout');
  };

  const handleCompleteOrder = (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => {
    console.log('Order completed:', { cartItems, shippingInfo, paymentInfo });
    setView('success');
    setTimeout(() => {
      setCartItems([]);
      setView('cart');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Payment Provider
          </h1>
          <p className="text-gray-600 text-lg">Secure checkout and payment processing</p>
        </div>

        {view === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <ShoppingCart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        )}

        {view === 'checkout' && (
          <CheckoutForm
            items={cartItems}
            onComplete={handleCompleteOrder}
            onBack={() => setView('cart')}
          />
        )}

        {view === 'success' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h2>
              <p className="text-gray-600 text-lg mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <p className="text-sm text-gray-500">Redirecting to cart...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
