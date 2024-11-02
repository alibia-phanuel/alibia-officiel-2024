import Product from "@/components/ui/Product";
import { getWixServerClient } from "@/lib/wix-client-server";
import { getRelatedProducts } from "@/wix-api/product";

interface RelatedProductsProps {
  productId: string;
}

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(
    getWixServerClient(),
    productId
  );

  if (!relatedProducts.length) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Produits similaires</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
