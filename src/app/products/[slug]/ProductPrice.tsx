import DiscountBadge from "@/components/ui/DiscountBadge";
import { products } from "@wix/stores";

interface ProductPriceProps {
  product: products.Product;
  selectedVariant: products.Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;
  if (!priceData) {
    return null;
  }
  const hasDiscoun = priceData.discountedPrice !== priceData.price;
  return (
    <div className="flex items-center gap-2.5 text-xl font-bold">
      <span className="">{priceData.formatted?.price}</span>
      {hasDiscoun && <span>{priceData.formatted?.discountedPrice}</span>}
      {product.discount && (
        <DiscountBadge data={product.discount}></DiscountBadge>
      )}
    </div>
  );
}
