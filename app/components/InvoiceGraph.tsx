import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "./Graph";
import { requireUser } from "../utils/hooks";
import { prisma } from "../utils/db";

async function getInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PAID",
      createdAt: {
        lte: new Date(),                      // less than or eqal to curr date
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),                   // 1 mahine pahle ke sare invoice
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });


  // Group and aggregate data by date
  // acc is object eg.- acc["Mar 28"] = 100.            
  const aggregatedData = data.reduce((acc: { [key: string]: number }, curr) => {
    const date = new Date(curr.createdAt).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });

    acc[date] = (acc[date] || 0) + curr.total;

    return acc;
  }, {});


  // Convert aggregatedData (Object) into an Array 
  // Object.entries(aggregatedData) converts it into an array of key-value pairs.
  const newData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return newData;
}


export async function InvoiceGraph() {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
}
