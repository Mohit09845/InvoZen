import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

// This route handler is basically performing Email reminder
export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
    try {
        const session = await requireUser();

        const { invoiceId } = await params;

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id
            }
        });

        if (!invoiceData) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
        }

        const sender = {
            email: "hello@demomailtrap.co",
            name: "Mohit Sharma",
        };

        emailClient.send({
            from: sender,
            to: [{ email: "mmhj53453@gmail.com" }],
            template_uuid: "5f761b54-774c-4b1d-8433-9529cf35120a",
            template_variables: {
                first_name: invoiceData.clientName,
                company_info_name: "InvoGen",
                company_info_address: "XYZ Sector, Bangalore",
                company_info_city: "Bangalore",
                company_info_zip_code: "123456",
                company_info_country: "India"
            }
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json({ error: "Failed to send Email reminder" }, { status: 500 })
    }
}

