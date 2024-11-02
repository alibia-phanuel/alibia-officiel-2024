import { getWixServerClient } from "@/lib/wix-client-server";
import { getCollection } from "@/wix-api/collection";
import SearchFilterLayout from "./SearchFilterLayout";
import { Suspense } from "react";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollection(getWixServerClient());

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchFilterLayout collections={collections}>
        {children}
      </SearchFilterLayout>
    </Suspense>
  );
}
