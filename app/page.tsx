"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-black tracking-tighter text-blue-600">E-STORE</h1>
            <nav className="flex gap-6 items-center">
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-sm font-medium text-gray-700">Hi, {session.user?.name}</span>
                  <Link href="/products" className="text-sm font-semibold text-gray-900 hover:text-blue-600">Shop</Link>
                  <Link href="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-blue-600">Admin</Link>
                  <button
                    onClick={() => signOut()}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/login" className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                    Login
                  </Link>
                  <Link href="/register" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition shadow-sm">
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                Elevate Your <span className="text-blue-600">Shopping</span> Experience
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover a curated collection of premium products. Shop the latest trends with confidence and get them delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="px-10 py-4 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 transition transform hover:scale-105 shadow-xl">
                  Shop Products
                </Link>
                <Link href="/register" className="px-10 py-4 border border-zinc-200 text-zinc-900 rounded-full font-bold hover:bg-gray-50 transition">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section id="featured" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Best Sellers</span>
            <h3 className="text-3xl font-bold mt-2 mb-12">Our Featured Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop' },
                { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop' },
                { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop' }
              ].map((cat) => (
                <div key={cat.name} className="group cursor-pointer">
                  <div className="aspect-square bg-white rounded-3xl mb-4 border border-gray-100 shadow-sm overflow-hidden relative transition-all group-hover:shadow-xl group-hover:border-blue-100">
                     <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="text-2xl font-bold text-white drop-shadow-md">{cat.name}</span>
                     </div>
                  </div>
                  <h4 className="font-bold text-xl">{cat.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-xl font-black tracking-tighter text-blue-600">E-STORE</h1>
            <p className="text-gray-500 text-sm">&copy; 2026 E-Store. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
