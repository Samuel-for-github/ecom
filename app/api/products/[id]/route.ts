import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PUT(
    req: Request,
    { params }: RouteContext
) {
    try {
        // Uncomment if you want only authenticated users/admins
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //   return NextResponse.json(
        //     { message: "Unauthorized" },
        //     { status: 401 }
        //   );
        // }

        const { id } = await params;
        const body = await req.json();

        await connectDB();

        const product = await Product.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("PUT Error:", error);

        return NextResponse.json(
            {
                message: "Error updating product",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: RouteContext
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        await connectDB();

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("DELETE Error:", error);

        return NextResponse.json(
            {
                message: "Error deleting product",
            },
            { status: 500 }
        );
    }
}