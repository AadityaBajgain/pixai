"use client"
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button"
import logo from "../../../public/logo.png"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
const MobileNav = () => {
    const [open, SetOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const handleClick = () => {
        open === false ? SetOpen(true) : SetOpen(false);
    }

    return (
        <header className='header'>
            <nav className="flex justify-between">
                <Link href='/' className="flex items-center gap-2 md:py-2">
                    <Image src={logo} alt="logo" width={140} height={28} />
                </Link>

                <div className="flex items-center gap-3 mx-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl='/' />
                    </SignedIn>
                    <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} onClick={handleClick} />
                </div>
            </nav>
            {open && <div className="mobilenav transition-all duration-300 ease-in-out">
                <SignedIn>
                    <ul>
                        {navLinks.slice(1).map((link) => {
                            const isActive = link.route === pathname
                            return (
                                <Link className="sidebar-link transition-transform duration-300 hover:translate-x-4" href={link.route} key={link.route} >
                                    <li className={`sidebar-nav_element transition-all duration-300 ease-in-out ${isActive ? 'bg-[#7856ff] text-white rounded-xl' : 'hover:bg-slate-200 text-gray-700'}`}>
                                        <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} />
                                        <span>{link.label}</span>
                                    </li>
                                </Link>

                            )
                        })}
                    </ul>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="button bg-[#7856ff] text-white">
                        <Link href='/sign-in'>
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </div>

            }
        </header>
    )
}

export default MobileNav
