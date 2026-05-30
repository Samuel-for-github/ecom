import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }



        const { id } = await params;
        const body = await req.json();

        await connectDB();
        const product = await Product.findByIdAndUpdate(id, body, { new: true });

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;

        await connectDB();
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
    }
}
