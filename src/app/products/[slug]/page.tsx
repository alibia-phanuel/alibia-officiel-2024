import { getProductBySlug } from "@/wix-api/product";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { RelatedProducts } from "./RelatedProducts";
import CreateProductReviewButton from "@/components/reviews/CreateProductReviewButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getWixServerClient } from "@/lib/wix-client-server";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";

import ProductReviews, {
  ProductReviewsLoadingSkeleton,
} from "./ProductReviews";
import { products } from "@wix/stores";
import { getProductReviews } from "@/wix-api/reviews";
interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(getWixServerClient(), slug);
  if (!product?._id) notFound();

  const mainImage = product.media?.mainMedia?.image;
  return {
    title: product.name,
    description: "get hits product on Flow Shop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function page({ params: { slug } }: PageProps) {
  const product = await getProductBySlug(getWixServerClient(), slug);
  if (!product?._id) notFound();
  return (
    <main className="max-auto mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      <hr />
      <Suspense fallback={<RelatedProductsLoadingSkeleton />}>
        <RelatedProducts productId={product._id} />
      </Suspense>
      <hr />
      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Avis des acheteurs</h2>
        <Suspense fallback={<ProductReviewsLoadingSkeleton />}>
          <ProductReviewsSection product={product} />
        </Suspense>
      </div>
    </main>
  );
}

function RelatedProductsLoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
interface ProductReviewsSectionProps {
  product: products.Product;
}

async function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  if (!product._id) return null;

  const wixClient = getWixServerClient();

  const loggedInMember = await getLoggedInMember(wixClient);

  const existingReview = loggedInMember?.contactId
    ? (
        await getProductReviews(wixClient, {
          productId: product._id,
          contactId: loggedInMember.contactId,
        })
      ).items[0]
    : null;

  return (
    <div className="space-y-5">
      <CreateProductReviewButton
        product={product}
        loggedInMember={loggedInMember}
        hasExistingReview={!!existingReview}
      />
      <ProductReviews product={product} />
    </div>
  );
}
