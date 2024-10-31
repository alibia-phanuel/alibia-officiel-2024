"use client";

import Badge from "@/components/ui/badge";
import WixImage from "@/components/ui/WixImage";
import { products } from "@wix/stores";
import ProductOption from "./ProductOption";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";
import ProductMedia from "./ProductMedia";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import BackInStockNotificationButton from "@/components/BackInStockNotificationButton";

interface ProductDetailsProps {
  product: products.Product;
}
//
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    //ici on traite les option d'un produit
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
  );
  const selectedVariant = findVariant(product, selectedOptions);
  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""]
    );
    return selectedChoice?.media?.items ?? [];
  });

  const inStock = checkInStock(product, selectedOptions);
  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;
  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <ProductMedia
          media={
            !!selectedOptionsMedia?.length
              ? selectedOptionsMedia
              : product.media?.items
          }
        />
      </div>
      <div className="basis-3/5">
        <div className="  space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}

          {product.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="pros dark-prose-invert"
            />
          )}
          <ProductPrice product={product} selectedVariant={selectedVariant} />
          <ProductOption
            product={product}
            selectedOption={selectedOptions}
            setSelectedOption={setSelectedOptions}
          />
          <div>{/* {JSON.stringify(selectedOptions)} */}</div>
          <div className="space-y-1.5">
            <Label htmlFor="quantity">Quantité</Label>
            <div className="flex items-center gap-2.5">
              <Input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24"
                disabled={!inStock}
              />
              {!!availableQuantity &&
                (availableQuantityExceeded || availableQuantity < 10) && (
                  <span className="text-destructive">
                    Seulement
                    {availableQuantity} en stock
                  </span>
                )}
            </div>
          </div>
        </div>
        {inStock ? (
          <AddToCartButton
            product={product}
            selectedOption={selectedOptions}
            quantity={quantity}
            disabled={availableQuantityExceeded || quantity < 1}
            className="w-full"
          />
        ) : (
          <BackInStockNotificationButton
            product={product}
            selectedOptions={selectedOptions}
            className="w-full"
          />
        )}
        {!!product.additionalInfoSections?.length && (
          <div className="space-y-1.5 my-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 my-4">
              <InfoIcon className="size-5" />
              <span>Informations complémentaires sur le produit</span>
            </span>
            <Accordion type="multiple">
              {product.additionalInfoSections.map((section) => (
                <AccordionItem value={section.title || ""} key={section.title}>
                  <AccordionTrigger>{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                      className="prose text-sm text-muted-foreground dark:prose-invert"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
