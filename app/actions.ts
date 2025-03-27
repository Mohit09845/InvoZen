"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

export async function onboardUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {       // Converts FormData into an object and validates it using onboardingSchema.
        schema: onboardingSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    });

    return redirect("/dashboard")
}

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    })

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        }
    });

    // as user create invoice we will send email using mailtrap sdk
    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mohit Sharma",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "sharmaamohit121@gmail.com" }],
        template_uuid: "22c75ee7-7d81-4e1c-af89-e34e92b9f49f",
        template_variables: {
            clientName: submission.value.clientName,
            
            invoiceNumber: submission.value.invoiceNumber,

            invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),

            invoiceAmount: formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),

            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        }
    })

    return redirect("/dashboard/invoices")
}

export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        }
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mohit Sharma",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "sharmaamohit121@gmail.com" }],
        template_uuid: "214cef99-289a-4465-be9c-291acc2e4dba",
        template_variables: {
            clientName: submission.value.clientName,
            
            invoiceNumber: submission.value.invoiceNumber,

            invoiceDueDate: new Intl.DateTimeFormat("en-IN", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),

            invoiceAmount: formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),

            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        }
    })

    return redirect("/dashboard/invoices")
}

