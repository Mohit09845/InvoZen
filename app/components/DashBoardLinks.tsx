"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, Users2 } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dashBoardLinks = [
    {
        id: 0,
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,
      },
      {
        id: 1,
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: Users2,
      },
]


export function DashBoardLinks() {
    //  Returns the current URL path.
    const pathName = usePathname();  
    return (
        <>
            {dashBoardLinks.map((link) => (

                <Link className={cn(                 
                    pathName === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  )} href={link.href} key={link.id}>
                    <link.icon className="size-4"/>
                    {link.name}
                </Link>
            ))}
        </>
    )
}

// we can avoid cn by using `` but cn is clean (it means conditional css)