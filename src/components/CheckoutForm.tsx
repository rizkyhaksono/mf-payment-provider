import React, { useState } from 'react';
import { CartItem, ShippingInfo, PaymentInfo } from '../types/payment';

interface CheckoutFormProps {
  items: CartItem[];
  onComplete?: (shippingInfo: ShippingInfo, paymentInfo: PaymentInfo) => void;
  onBack?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ items, onComplete, onBack }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handleCompleteOrder = () => {
    if (onComplete) {
      onComplete(shippingInfo, paymentInfo);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { key: 'shipping', label: 'Shipping' },
            { key: 'payment', label: 'Payment' },
            { key: 'review', label: 'Review' },
          ].map((s, index) => (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${step === s.key
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  {index < ['shipping', 'payment', 'review'].indexOf(step) ? '✓' : index + 1}
                </div>
                <div className="mt-2 text-sm font-semibold text-gray-700">{s.label}</div>
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-4 ${index < ['shipping', 'payment', 'review'].indexOf(step)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                    }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Shipping Form */}
        {step === 'shipping' && (
          <form onSubmit={handleShippingSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    required
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Payment Form */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  id="cardName"
                  type="text"
                  required
                  value={paymentInfo.cardName}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    required
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Review Order
              </button>
            </div>
          </form>
        )}

        {/* Review */}
        {step === 'review' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Order Items</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-purple-600">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Shipping Address</h3>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                <p className="font-semibold">{shippingInfo.fullName}</p>
                <p>{shippingInfo.email}</p>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
                <p>{shippingInfo.country}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Method</h3>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                <p className="font-semibold">{paymentInfo.cardName}</p>
                <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span className="font-semibold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t-2 border-gray-300 flex justify-between">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-purple-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCompleteOrder}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Complete Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
