import Image from "next/legacy/image"
import Link from "next/link"
import {SignedOut, UserButton, SignedIn} from '@clerk/nextjs'
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"


const Header = () => {
    return (
      <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
          <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo.svg" width={128} height={38}
            alt="Hanbalogo" 
            layout="intrinsic"
            
          />
          </Link>
          
          <SignedIn>
            <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems/>
            </nav>
          </SignedIn>
          <div className="flex w-32 justify-end gap-3">
            <SignedIn>
              <UserButton />
              <MobileNav/>
            </SignedIn>
            <SignedOut>
            <Button asChild className="bg-green-700 hover:bg-green-600 rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
            </SignedOut>
          </div>
        </div>
    </header>
  )
}

export default Header
