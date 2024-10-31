import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-secondary py-10 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row justify-between gap-24">
          {/* LEFT */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <Link href="/">
              <div className="text-2xl tracking-wide  font-semibold">
                ALIBIA
              </div>
            </Link>
            <p className="">
              N&apos;hésitez pas à nous contacter pour toute demande de
              renseignements ou à passer nous voir directement sur douala !
            </p>
            <span className="font-semibold ">
              <a href="mailto:phanuel.alibia@gmail.com">
                phanuel.alibia@gmail.com
              </a>
            </span>
            <div className=" underline">
              <a href="tel:696603305">Appelez-nous au 696603305 clique juste</a>
            </div>

            <div className="flex gap-6">
              <Link href="https://www.facebook.com/aliabiaNext" target="blanck">
                <Image src="/facebook.png" alt="" width={16} height={16} />
              </Link>
              <Link
                href="https://www.youtube.com/@phanuelalibia/?sub_confirmation=1"
                target="blanck"
              >
                <Image src="/youtube.png" alt="" width={16} height={16} />
              </Link>
            </div>
          </div>
          {/* CENTER */}
          <div className="hidden lg:flex justify-between w-[50%]">
            <div className="flex flex-col justify-between  w-full ">
              <h1 className=" text-lg  font-semibold">SOCIÉTÉ</h1>
              <div className="flex flex-col gap-6">
                <Link href="/">Accueil</Link>
                <Link href="/filtre">Toutes les catégories</Link>
                <Link href="/a-propos">À propos</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div className="flex  justify-between  flex-col ">
              <h1 className="text-lg 0 font-semibold">AIDES</h1>
              <p>
                N&apos;hésitez pas à nous contacter pour toute demande de
                renseignements ou à <br /> passer nous voir directement sur
                douala !
              </p>
              <div className="  underline">
                <a href="tel:696603305">
                  Appelez-nous au 696603305 clique juste
                </a>
              </div>
            </div>
          </div>
          {/* RIGHT */}
        </div>
        <hr className="mb-10 mt-16" />

        <p className="text-center text-sm text-muted-foreground">
          © Copyright {new Date().getFullYear()}, Tous droits réservés par
          alibia
        </p>
      </div>
    </footer>
  );
}
