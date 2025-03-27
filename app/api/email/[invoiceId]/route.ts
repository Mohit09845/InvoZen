import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

// This route handler is basically performing Email reminder
export async function POST(request: Request, {params}: {params: Promise<{invoiceId: string}>}) {
    try {
        const session = await requireUser();

    const {invoiceId} = await params;

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id
        }
    });

    if(!invoiceData){
        return NextResponse.json({error: "Invoice not found"}, {status: 404})
    }

    const sender = {
            email: "hello@demomailtrap.co",
            name: "Mohit Sharma",
        };
    
        emailClient.send({
            from: sender,
            to: [{ email: "sharmaamohit121@gmail.com" }],
            subject: "Reminder Invoice Payment",
            text: "Dear User, Your Invoice Payment is pending. Please complete your payment as soon as possible."
        })

        return NextResponse.json({success: true})

    } catch (error) {
        return NextResponse.json({error: "Failed to send Email reminder"}, {status: 500})
    }
}

