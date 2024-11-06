import Image from "next/image";
import banner from "@/app/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Product from "@/components/ui/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollectionBySlug } from "@/wix-api/collection";
import { queryProducts } from "@/wix-api/product";
import { getWixServerClient } from "@/lib/wix-client-server";
export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-x-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96 rounded-lg">
        <div className="space-y-7 p-10 text-center md:w-1/2 h-full flex  flex-col justify-center items-center">
          <p>
            Découvrez nos produits technologiques de qualité avec des offres
            exclusives et un service client réactif. Cliquez pour explorer nos
            nouveautés et améliorer votre équipement !
          </p>
          <Button asChild>
            <Link href="/filtre">
              Découvrir maintenant <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="hidden md:block w-1/2 h-full relative">
          <Image
            src={banner}
            alt="bnner"
            className="h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r  from-secondary via-transparent to-transparent" />
        </div>
      </div>
      {/*@Suspense:nous permet d'afficher une solution de repli jusqu'à ce que ses enfants aient fini de se charger*/}
      <Suspense fallback={<LoadingSkeleton />}>
        {/*@FeaturedProducts: est l'enfant qui recupre les données a donct besoin dun temps te recupration   */}
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}
async function FeaturedProducts() {
  const wixClient = getWixServerClient();
  const collections = await getCollectionBySlug(
    wixClient,
    "ordinateur-portable-gamer"
  );

  if (!collections?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collections._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="w-full relative right-9 max-md:right-10">
      <div className="space-y-5 mt-10  ">
        <h2 className="text-2xl font-bold ">Nouvelle arrivage</h2>
        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.items.map((product) => (
            // Composant de produits
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
