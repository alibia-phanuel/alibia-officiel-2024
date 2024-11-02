import { env } from "@/env";
import { WIX_STORES_APP_ID } from "@/lib/contants";
import { findVariant } from "@/lib/utils";
import { WixClient } from "@/lib/wix-client.base";
import { checkout, orders } from "@wix/ecom";

import { products } from "@wix/stores";

export async function getCheckoutUrlForCurrentCart(wixClient: WixClient) {
  const { checkoutId } =
    await wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: checkout.ChannelType.WEB,
    });

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw Error("Échec de la création d'une session de redirection");
  }

  return redirectSession.fullUrl;
}

export interface GetCheckoutUrlForProductValues {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export async function getCheckoutUrlForProduct(
  wixClient: WixClient,
  { product, quantity, selectedOptions }: GetCheckoutUrlForProductValues
) {
  const selectedVariant = findVariant(product, selectedOptions);

  const { _id } = await wixClient.checkout.createCheckout({
    channelType: checkout.ChannelType.WEB,
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : { options: selectedOptions },
        },
        quantity,
      },
    ],
  });

  if (!_id) {
    throw new Error("Échec de la création d'une caisse de paiement");
  }

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId: _id },
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success",
    },
  });

  if (!redirectSession) {
    throw Error("Échec de la création d'une caisse de paiement");
  }

  return redirectSession.fullUrl;
}

interface createOrderProps {
  product: products.Product;
  quantity: number;
  selectedOptions: Record<string, string>;
  name: string;
  success: boolean;
  phoneNumber: string;
  channelType?: string; // Par exemple : "WEB"
}

export async function createOrder(
  wixClient: WixClient,
  { product, quantity, selectedOptions, name, phoneNumber }: createOrderProps
) {
  try {
    // Trouve la variante du produit en fonction des options sélectionnées
    const selectedVariant = findVariant(product, selectedOptions);

    // Crée l'objet de la commande avec les détails nécessaires
    const orderData = {
      lineItems: [
        {
          productId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : { options: selectedOptions },
          quantity: quantity,
        },
      ],
      customer: {
        name: name,
        phone: phoneNumber,
      },
      channelType: checkout.ChannelType.WEB,
    };

    console.log("orderData:", orderData);
    // Envoie la commande à Wix
    const response: any = await wixClient.orders.createOrder(orderData);
    // Vérifie la réponse
    if (response.status === "success") {
      console.log("Commande créée avec succès :", response);
      return response;
    } else {
      throw new Error("Erreur lors de la création de la commande.");
    }
  } catch (error) {
    console.error("Erreur dans la création de la commande :", error);
    throw error;
  }
}
