"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";
import Badge from "@/components/ui/badge";
import { products } from "@wix/stores";
import ProductOption from "./ProductOption";
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

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [errorState, setErrorSate] = useState(false);
  const [orderLink, setOrderLink] = useState("");
  async function handleOrderSubmit() {
    if (name.length <= 3) {
      setErrorSate(false); // Indique une erreur
      setError("Le nom doit contenir plus de 3 caractères.");
    } else {
      setErrorSate(true); // Indique un succès
      setError("");
      const domainName = "http:/localhost:3000"; // Remplacez par votre nom de domaine
      const slug = product.slug; // Assurez-vous que `product.slug` est défini pour chaque produit
      const productLink = `${domainName}/products/${slug}`;
      const orderDetails = {
        customerName: name,
        productName: product.name,
        productDescription: product.description,
        productPrice: product.priceData?.formatted?.price,
        quantity: quantity,
        selectedOptions: JSON.stringify(selectedOptions), // Convertir en chaîne si c'est un tableau
      };
      const message = `
  Bonjour Alibia, pouvez-vous confirmer la commande suivante ?
  
  Nom du client: ${orderDetails.customerName}
  Nom du produit: ${orderDetails.productName}
  Prix du produit: ${orderDetails.productPrice}
  Quantité: ${orderDetails.quantity}
  Options sélectionnées: ${orderDetails.selectedOptions}
  Article: ${productLink}
`;
      const phoneNumber = "+237696603305"; // Remplacez par votre numéro de téléphone
      const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      setOrderLink(whatsappURL);
    }
  }

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
            <Label htmlFor="quantity">Quantité </Label>
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
                    Seulement {""}
                    {availableQuantity} en stock
                  </span>
                )}
            </div>
          </div>
        </div>
        {inStock ? (
          <div className="flex items-center gap-2.5 w-full  flex-wrap">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  disabled={quantity <= 0}
                  variant="outline"
                  className="flex gap-3"
                >
                  <ArrowDown />
                  <span>passer une Commande</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Commande d&apos;article Chez Alibia</DialogTitle>
                  <DialogDescription>
                    Ces informations nous seront utiles pour Entré en contact
                    avec vous. Alibia vous remercie.
                  </DialogDescription>
                  {error && (
                    <div className="text-red-500 text-sm col-span-4">
                      {error}
                    </div>
                  )}
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="name"
                      placeholder="exemple:Pedro Duarte"
                      className="col-span-3"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await handleOrderSubmit(); // Vérifie si l'ordre est validé
                      if (errorState === true) {
                        window.open(orderLink, "_blank"); // Redirige uniquement en cas de succès
                      }
                    }}
                    variant="secondary"
                    className="flex gap-3"
                    type="button" // Changez à "button" pour éviter la soumission de formulaire
                  >
                    Commander 
                    <ArrowRight />
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AddToCartButton
              product={product}
              selectedOption={selectedOptions}
              quantity={quantity}
              disabled={availableQuantityExceeded || quantity < 1}
              className="w-full"
            />
          </div>
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
