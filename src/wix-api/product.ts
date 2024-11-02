import { WIX_STORES_APP_ID } from "@/lib/contants";
import { WixClient } from "@/lib/wix-client.base";
// import { WixClient } from "@wix/sdk";
import { cache } from "react";
export type ProductsSort = "last_updated" | "price_asc" | "price_desc";
interface QueryProductsFilter {
  q?: string;
  collectionIds?: string[] | string;
  sort?: ProductsSort;
  skip?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
}

export async function queryProducts(
  wixClient: WixClient,
  { collectionIds, sort = "last_updated", skip, limit }: QueryProductsFilter
) {
  let query = wixClient.products.queryProducts();
  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }

  switch (sort) {
    case "price_asc":
      query = query.ascending("price");
      break;
    case "price_desc":
      query = query.descending("price");
      break;
    case "last_updated":
      query = query.descending("lastUpdated");
      break;
  }
  if (limit) query = query.limit(limit);
  if (skip) query = query.skip(skip);
  return query.find();

  //
}
export async function getRelatedProducts(
  wixClient: WixClient,
  productId: string
) {
  const result = await wixClient.recommendations.getRecommendation(
    [
      {
        _id: "68ebce04-b96a-4c52-9329-08fc9d8c1253", // "From the same categories"
        appId: WIX_STORES_APP_ID,
      },
      {
        _id: "d5aac1e1-2e53-4d11-85f7-7172710b4783", // "Frequenly bought together"
        appId: WIX_STORES_APP_ID,
      },
    ],
    {
      items: [
        {
          appId: WIX_STORES_APP_ID,
          catalogItemId: productId,
        },
      ],
      minimumRecommendedItems: 3,
    }
  );

  const productIds = result.recommendation?.items
    .map((item) => item.catalogItemId)
    .filter((id) => id !== undefined);

  if (!productIds || !productIds.length) return [];

  const productsResult = await wixClient.products
    .queryProducts()
    .in("_id", productIds)
    .limit(4)
    .find();

  return productsResult.items;
}
// a quoi sert import { cache } from "react" pour Gpt
export const getProductBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { items } = await wixClient.products
      .queryProducts()
      .eq("slug", slug)
      .limit(1)
      .find();
    const product = items[0];
    if (!product || !product.visible) {
      return null;
    }
    return product;
  }
);
