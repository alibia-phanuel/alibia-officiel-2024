"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserButton from "@/components/UserButton";
import { twConfig } from "@/lib/utils";
import { members } from "@wix/members";
import { collections } from "@wix/stores";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  collections: collections.Collection[];
  loggedInMember: members.Member | null;
}

export default function MobileMenu({
  collections,
  loggedInMember,
}: MobileMenuProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > parseInt(twConfig.theme.screens.lg)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="inline-flex lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center space-y-10 py-10">
            <ul className="space-y-5 text-center text-lg">
              <li>
                <Link href="/" className="font-semibold hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/passer-une-comment"
                  className="font-semibold hover:underline"
                >
                  Comment passer une commande ?
                </Link>
              </li>
              <DropdownMenu>
                <DropdownMenuTrigger className="font-semibold hover:underline">
                  Catégories +
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {collections.map((collection) => (
                    <DropdownMenuItem key={collection._id}>
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="font-semibold hover:underline"
                      >
                        {collection.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <li className="relative left-4">
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
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="font-semibold hover:underline"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-semibold hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
            <UserButton loggedInMember={loggedInMember} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
