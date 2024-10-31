import { getWixClient, WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } = await wixClient.collections.getCollectionBySlug(
      slug
    );

    return collection || null;
  }
);

export const getCollection = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    /**
     * @collections .queryCollections():est la requete des categories
     * @collections .queryCollections().ne("_id", {id}):te permet de filtre par categories
     * @collections .queryCollections().ne("_id", {id}).find(): te permet de recuper le resulta de la requette
     * @return collection.items: qui es un tableaux de donner
     */
    const collection = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001") //Tout les articles
      .ne("_id", "a874e731-424e-e20b-a51f-32c1ee800f9f") //Produits vedettes
      .find();
    return collection.items;
  }
);
