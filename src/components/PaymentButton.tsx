import React from 'react';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  onPayment?: (amount: number) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  currency = 'USD',
  onPayment
}) => {
  const handlePayment = () => {
    if (onPayment) {
      onPayment(amount);
    }
    alert(`Processing payment of ${currency} ${amount}`);
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
      onFocus={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
      onBlur={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
    >
      Pay {currency} {amount}
    </button>
  );
};

export default PaymentButton;
