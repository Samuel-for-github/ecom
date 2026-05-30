import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { name, description, price, image, stock } = await req.json();

        const product = await Product.create({
            name,
            description,
            price,
            image,
            stock,
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating product", error }, { status: 500 });
    }
}