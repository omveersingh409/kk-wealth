import { useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Check if authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to proceed with payment.");
        navigate('/login', { state: { returnTo: window.location.pathname } });
        return;
      }

      // 2. Create Order
      const orderRes = await api.post('/payments/create-order', { productId });
      
      if (!orderRes.data.success) {
        throw new Error(orderRes.data.message || 'Failed to create order');
      }

      const orderData = orderRes.data.data;

      // 3. Open Razorpay Checkot
      const options = {
        key: orderData.key_id, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'KK Wealth',
        description: `Payment for ${orderData.product.name}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // 4. Verify Payment
            const verifyRes = await api.post('/payments/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              productId: productId
            });

            if (verifyRes.data.success) {
              alert('Payment Successful!');
              navigate('/dashboard');
            } else {
              alert('Payment Verification Failed!');
            }
          } catch (err) {
            console.error(err);
            alert('Something went wrong during verification');
          }
        },
        prefill: {
          name: '', // We could fetch from profile context
          email: '', // We could fetch from profile context
          contact: ''
        },
        theme: {
          color: '#3498db'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert('Payment Failed! Reason: ' + response.error.description);
      });
      
      rzp.open();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      if(err.response?.status === 401) {
          navigate('/login');
      } else {
          alert(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
}
