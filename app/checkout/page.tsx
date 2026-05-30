"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { removeFromCart, clearCart } from "@/lib/redux/cartSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // In a real app, this would call an API to save the order
    setIsOrdered(true);
    dispatch(clearCart());
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase, {session?.user?.name}. Your items will be shipped soon.</p>
          <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/products" className="text-blue-600 hover:underline">Go back to products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                      IMG
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 border-b pb-4 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition"
              >
                Place Order
              </button>
              <div className="mt-4">
                <Link href="/products" className="block text-center text-sm text-blue-600 hover:underline">
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
