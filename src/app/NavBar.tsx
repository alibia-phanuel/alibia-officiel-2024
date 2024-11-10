import logo from "@/app/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client-server";
import { SlidersHorizontal } from "lucide-react";
import ShoppingCartButton from "./ShoppingCartButton";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollection } from "@/wix-api/collection";
import MainNavigation from "./MainNavigation";
import MobileMenu from "./MobileMenu";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Suspense } from "react";
export default async function NavBar() {
  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollection(wixClient),
  ]);

  const totalQuanty =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="bg-background shadow-sm ">
      <div className="max-w-7xl mx-auto p-5 flex items-center  border-b-2 border-orange-500 justify-between">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>
        <div className="flex flex-wrap items-center  w-full justify-between relative   logoResponsive">
          <Link href="/" className="flex items-center gap-4 ">
            <Image src={logo} alt="logo" width={150} height={40} />
          </Link>
          <div className="flex justify-center items-center gap-4 absolute left-[27%] responsive">
            <Link href="/" legacyBehavior passHref>
              Accueil
            </Link>

            <MainNavigation
              collections={collections}
              className="hidden lg:flex"
            />
            <a
              href="#"
              aria-disabled="true"
              className="text-gray-400 cursor-not-allowed relative group right-4 z-30"
            >
              Nos services
              <span className="absolute  w-[200px] -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Onglet bientôt disponible
              </span>
            </a>
            <Link href="/passer-une-comment" legacyBehavior passHref>
              Comment passer une commande ?
            </Link>
            <Link href="/a-propos" legacyBehavior passHref>
              À propos
            </Link>
            <Link href="/contact" legacyBehavior passHref>
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <Button
            size="icon"
            variant="ghost"
            className="flex justify-center  items-center"
          >
            <Link href="/filtre" className="cursor-pointer">
              <SlidersHorizontal className="size-4" />
            </Link>
          </Button>
          <UserButton
            loggedInMember={loggedInMember}
            className="hidden lg:inline-flex"
          />

          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
