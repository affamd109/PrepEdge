import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header() {



    return (

        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">

            <nav className=" mx-auto px-4 h-16 flex items-center justify-between">

                <div className="flex items-center" >

                    <div>
                        <Link href="/" >
                            <Image src="/logo.png" alt="Logo" width={200} height={60} className="h-14 py-1 w-auto object-contain " />

                        </Link>

                    </div>

                    <div className="flex items-center space-x-2 " >
                        <Link href="/dashboard">
                            <Button variant="outline" className="cursor-pointer" >
                                <LayoutDashboard />
                                <span className="hidden md:block" >   Industry Insights </span>

                            </Button>
                        </Link>

                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <StarsIcon />
                                    <span className="hidden md:block px-0.5 "> Growth Tools </span>
                                    <ChevronDown />
                                </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent>

                                <DropdownMenuItem asChild >
                                    <Link href="/resume" className="flex items-center space-x-2" >
                                        <FileText />
                                        <span>Resume Builder</span>

                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem> <Link href="/coverletter" className="flex items-center space-x-2" >
                                    <PenBox />
                                    <span>Cover Letter Builder</span>

                                </Link></DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href="/interview" className="flex items-center space-x-2" >
                                        <GraduationCap />
                                        <span>Interview Prep</span>

                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>

                </div>

                <div className="flex items-center space-x-2" >

                    <SignedOut>

                        <SignInButton>
                            <Button variant="outline" className="cursor-pointer" >
                                <span className="hidden md:block" > Sign In </span>
                            </Button>
                        </SignInButton>

                        <SignUpButton >
                            <Button variant="default" className="cursor-pointer" >
                                <span className="hidden md:block" > Sign Up </span>
                            </Button>

                        </SignUpButton>

                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                </div>

            </nav>


        </header>


    )
}