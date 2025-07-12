import {  SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Brain, ChevronDown, FileText, GraduationCap, LayoutDashboard,  StarsIcon } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default async function Header ()  {
    await checkUser();;




    return (

        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">

            <nav className=" mx-auto px-4 h-18 flex items-center justify-between">

                <div className="flex items-center space-x-2" >

                    <div>
                        <Link href="/" >
                            <div className="relative h-16 w-40 md:w-48">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                        </Link>

                    </div>

                    <div className="flex items-center space-x-2 mt-1 " >
                        <Link href="/dashboard">
                            <Button variant="outline" className="cursor-pointer" >
                                <LayoutDashboard />
                                <span className="hidden md:block" > Industry Insights </span>

                            </Button>
                        </Link>

                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button className="cursor-pointer" variant="outline" >
                                    <StarsIcon />
                                    <span className="hidden md:block px-0.5 "> Growth Tools </span>
                                    <ChevronDown />
                                </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent>

                                <DropdownMenuItem asChild >
                                    <Link href="/resume" className="flex items-center cursor-pointer space-x-0" >
                                        <FileText />
                                        <span>Resume Builder</span>

                                    </Link>
                                </DropdownMenuItem>

                                {/* <DropdownMenuItem>
                                     <Link href="/coverletter" className="flex items-center space-x-2" >
                                    <PenBox />
                                    <span>Cover Letter Builder</span>

                                </Link></DropdownMenuItem> */}

                                <DropdownMenuItem>
                                    <Link href="/interview" className="flex items-center space-x-2" >
                                        <GraduationCap />
                                        <span>Your Progress</span>

                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href="/interview/mock" className="flex items-center space-x-2" >
                                    <Brain/>
                                    <span>Take a Quiz</span>
                                    
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