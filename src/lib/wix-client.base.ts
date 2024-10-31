import { env } from "@/env";
import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";
//Fonction utilitaire
export function getWixClient(tokens: Tokens | undefined) {
  return createClient({
    //Module dont nous avont besoin
    modules: {
      collections,
      products,
      files,
      members,
      reviews,
      redirects,
      recommendations,
      orders,
      currentCart,
      backInStockNotifications,
      checkout,
    },
    //methode d'autentification
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
