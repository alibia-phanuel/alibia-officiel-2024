import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Succès de la commande",
};

export default function Page() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center space-y-5 px-5 py-10">
      <h1>Nous avons reçu votre commande</h1>
      <p>
        otre commande a été envoyée avec succès nous allons vous contacter les
        heures qui suivent pour la livraison a domicile Alibia vous remercie
      </p>
      <Link href="/Retour a l'accueil"></Link>
    </main>
  );
}
