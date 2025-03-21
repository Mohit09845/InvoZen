import Link from "next/link";
import { requireUser } from "../utils/hooks"
import Image from "next/image";
import { DashBoardLinks } from "../components/DashBoardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
    const session = await requireUser();           // The layout fetches the session using requireUser(), ensuring only authenticated users can access it. This means every page inside this layout requires authentication.
    return (
        <>
            <div className="grid min-h-screen w-full md:gird-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                // left sidebar
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href = "" className="flex items-center">
                                <Image src="/logo" alt="Logo" className="size-7" />
                                <p className="text-2xl font-bold">Invo<span className="text-blue-600">Zen</span></p>
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                <DashBoardLinks/>
                            </nav>
                        </div>
                    </div>
                </div>

                // Mobile leftsidebar 
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>      // because sheettrigger also renders as button in DOM
                                <Button variant="outline" size="icon" className="md:hidden">
                                    <Menu className="size-5"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-2 mt-10">
                                    <DashBoardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>

                        // Right side top mai User 
                        <div className="flex items-center ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button  className="rounded-full" variant="outline" size="icon">
                                        <User2/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/invoices">Invoices</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem asChild>
                                        <form className="w-full"
                                            action={async () => {   // Inline async func
                                                "use server";
                                                await signOut();
                                            }}
                                        >
                                            <Button className="w-full text-left" variant="outline">Log Out</Button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster richColors closeButton theme="light" />
        </>
    )
}