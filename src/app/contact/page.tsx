"use client";
import { motion } from "framer-motion";

export default function contact() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 80 },
          visible: { opacity: 1, y: 0 },
        }}
        className="mt-[100px] text-center"
      >
        <h2 className="text-center font-bold text-orange-400 text-[30px]">
          Contactez-nous
        </h2>
        <p className="my-10">
          Nous sommes toujours à votre écoute pour répondre à vos questions,
          vous assister dans vos achats,<br></br> ou vous fournir des
          informations supplémentaires sur nos produits et services.
        </p>
        <ul
          style={{ listStyleType: "none", padding: 0 }}
          className="text-justify flex  justify-around my-5 flex-wrap gap-4"
        >
          <li>
            <strong>Téléphone :</strong>{" "}
            <a href="tel:+237696603305">+237 696603305</a>
          </li>
          <li>
            <strong>Email :</strong>{" "}
            <a href="mailto:phanuel.alibia@gmail.com">
              phanuel.alibia@gmail.com
            </a>
          </li>
        </ul>
        <p>
          Nous nous engageons à répondre à vos demandes dans les plus brefs
          délais. Votre satisfaction est notre priorité !
        </p>
      </motion.section>
    </main>
  );
}
