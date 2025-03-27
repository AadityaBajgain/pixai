"use client"

import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.png"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { navLinks } from "@/constants"
import { Button } from "../ui/button"
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href='/' className="sidebar-logo">
          <Image src={logo} alt="logo" width={100} height={20} />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-[#7856ff] text-white rounded-xl py-0.5' : 'hover:bg-slate-200 text-gray-700'}`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                )
              })}

            </ul>
            <ul>
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`sidebar-nav_element ${isActive ? 'bg-[#7856ff] text-white' : 'hover:bg-slate-200 text-gray-700'}`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image src={link.icon} alt="logo" width={24} height={24} className={`${isActive && "brightness-200"}`} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
              <li className="py-0.5 m-3">
                <UserButton showName fallbackRedirectUrl="/" />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-[#7856ff] text-white">
              <Link href='/sign-in'>
                Login
              </Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
