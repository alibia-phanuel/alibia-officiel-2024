// eslint-disable-next-line @next/next/no-img-element
import { products } from "@wix/stores";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import Badge from "./badge";
import WixImage from "./WixImage";
import { formatCurrency } from "@/lib/utils";
import DiscountBadge from "./DiscountBadge";
interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  const resizedImgageUrl = mainImage?.url;
  const resiezedImageUrl = mainImage?.url
    ? wixMedia.getScaledToFitImageUrl(mainImage.url, 700, 700, {})
    : null;
  return (
    <Link
      href={`/products/${product.slug}`}
      className="border h-full bg-card rounded-lg"
    >
      <div className="overflow-hidden relative">
        <WixImage
          width={700}
          height={700}
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          className="transition-transform duration-300 hover:scale-105 rounded-t-lg"
        />
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {product.ribbon && <Badge>{product.ribbon}</Badge>}
          <Badge className="bg-secondary text-secondary-foreground font-semibold">
            {getFormattedPrice(product)}
          </Badge>
          {product.discount && <DiscountBadge data={product.discount} />}
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        ></div>
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `form ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
