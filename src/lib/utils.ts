import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { products } from "@wix/stores";
import ResolveConig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { Config } from "tailwindcss/types/config";

export const twConfig = ResolveConig(tailwindConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Fonction  utilitaire qui cree un retar artificiel
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "CMR"
) {
  Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price)
  );
}

//Trouve les # variant dun produit
export function findVariant(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  if (!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOptions).every(
        ([key, value]) => variant.choices?.[key] === value
      );
    }) || null
  );
}

export function checkInStock(
  product: products.Product,
  selectedOptions: Record<string, string>
) {
  const variant = findVariant(product, selectedOptions);

  return variant
    ? variant.stock?.quantity !== 0 && variant.stock?.inStock
    : product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK ||
        product.stock?.inventoryStatus ===
          products.InventoryStatus.PARTIALLY_OUT_OF_STOCK;
}
function resolveConfig(tailwindConfig: Config) {
  throw new Error("Function not implemented.");
}
