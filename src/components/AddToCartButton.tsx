import { products } from "@wix/stores";
import { ButtonProps } from "./ui/button";

import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOption: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOption,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();
  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOption,
          quantity,
        })
      }
      loading={mutation.isPending}
      {...props}
      className={cn("flex gap-3 my-3", className)}
    >
      <ShoppingCartIcon />
      Ajouter au panier
    </LoadingButton>
  );
}
