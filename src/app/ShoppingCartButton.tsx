"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { Loader2, ShoppingCartIcon, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import WixImage from "@/components/ui/WixImage";
interface shoppingCartButtonProps {
  initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
  initialData,
}: shoppingCartButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const cartQuery = useCart(initialData);

  const ShowModal = () => {
    alert("bpnjor");
  };

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    ) || 0;

  return (
    <>
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
          <ShoppingCartIcon />
          <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        </Button>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="flex flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              Votre panier
              <span className="text-base ml-1">
                ({totalQuantity} {totalQuantity === 1 ? "article" : "articles"})
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex grow flex-col space-y-5 overflow-y-auto pt-1">
            <ul className="space-y-5">
              {cartQuery.data?.lineItems?.map((item) => (
                <ShoppingCartItem
                  key={item._id}
                  item={item}
                  onProductLinkClicked={() => setSheetOpen(false)}
                />
              ))}
            </ul>
            {cartQuery.isPending && (
              <Loader2 className="mx-auto animate-spin" />
            )}
            {cartQuery.error && (
              <p className="text-destructive">{cartQuery.error.message}</p>
            )}
            {!cartQuery.isPending && !cartQuery.data?.lineItems?.length && (
              <div className="flex grow items-center justify-center text-center">
                <div className="space-y-1.5">
                  <p>Votre panier est vide</p>
                  <Link
                    href="/filtre"
                    className="text-primary hover:underline"
                    onClick={() => setSheetOpen(false)}
                  >
                    Commencez à acheter maintenant
                  </Link>
                </div>
              </div>
            )}
          </div>
          <hr></hr>
          <div className="flex items-center justify-between gap-5">
            <div className="space-y-0.5">
              <p className="text-sm">Montant total partiel :</p>
              <p className="font-bold">
                {/* @ts-expect-error */}
                {cartQuery.data?.subtotal?.formattedConvertedAmount}
              </p>
              <p className="text-xs text-muted-foreground">
                Les frais d&lsquo;expédition et les taxes sont calculés au
                moment du paiement.
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <CheckoutButton
                className=" hidden"
                size="lg"
                disabled={!totalQuantity || cartQuery.isFetching}
              />
              <button
                className="bg-orange-500 p-2 rounded-lg  text-white"
                onClick={ShowModal}
              >
                Finaliser votre commande
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface ShoppingCartItemProps {
  item: currentCart.LineItem;

  onProductLinkClicked: () => void;
}

function ShoppingCartItem({
  item,
  onProductLinkClicked,
}: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const removeItemNutation = useRemoveCartItem();
  const productId = item._id;
  if (!productId) return null;
  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  return (
    <li className="flex items-center gap-3">
      <div className="relative size-fit flex-none">
        <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
          <WixImage
            mediaIdentifier={item.image}
            width={110}
            height={110}
            alt={item.productName?.translated || "Product image"}
            className="flex-none bg-secondary"
          />
        </Link>
        <button
          className="absolute -right-1 -top-1 border bg-background rounded-full p-0.5"
          onClick={() => removeItemNutation.mutate(productId)}
        >
          <X className="size-3" />
        </button>

        <div className="space-y-1.5 text-sm">
          <Link href={`/products/${slug}`} onClick={onProductLinkClicked}>
            <p className="font-bold">
              {item.productName?.translated || "Item"}
            </p>
          </Link>
          {!!item.descriptionLines?.length && (
            <p>
              {item.descriptionLines
                .map(
                  (line) =>
                    line.colorInfo?.translated || line.plainText?.translated
                )
                .join(",")}
            </p>
          )}
          <div className="flex items-center gap-2">
            {item.quantity} x {item.price?.formattedConvertedAmount}
            {item.fullPrice && item.fullPrice.amount !== item.price?.amount && (
              <span className="text-muted-foreground line-through">
                {item.fullPrice.formattedConvertedAmount}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            value="outline"
            size="sm"
            disabled={item.quantity === 1}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity - 1,
              })
            }
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            value="outline"
            size="sm"
            disabled={quantityLimitReached}
            onClick={() =>
              updateQuantityMutation.mutate({
                productId,
                newQuantity: !item.quantity ? 0 : item.quantity + 1,
              })
            }
          >
            +
          </Button>
          {quantityLimitReached && <span> Quantity limit reached</span>}
        </div>
      </div>
    </li>
  );
}
