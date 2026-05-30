import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany([
        {
            name: "Gaming Laptop",
            description: "High-performance gaming laptop with RTX 4060 and 144Hz display.",
            price: 85000,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
            stock: 10,
        },
        {
            name: "Professional Camera",
            description: "Full-frame mirrorless camera for stunning photography and 4K video.",
            price: 125000,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938&auto=format&fit=crop",
            stock: 5,
        },
        {
            name: "Wireless Headphones",
            description: "Noise-cancelling over-ear headphones with 30-hour battery life.",
            price: 18500,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
            stock: 25,
        },
        {
            name: "Mechanical Keyboard",
            description: "Tactile mechanical keyboard with customizable RGB lighting.",
            price: 8500,
            image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop",
            stock: 15,
        },
        {
            name: "Smart Watch",
            description: "Elegant smartwatch with health tracking and 5-day battery life.",
            price: 12000,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
            stock: 20,
        },
        {
            name: "Designer Chair",
            description: "Ergonomic designer chair for your modern home office.",
            price: 24500,
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1974&auto=format&fit=crop",
            stock: 8,
        }
    ]);

    return NextResponse.json({
        message: "Products seeded successfully with real images",
    });
}