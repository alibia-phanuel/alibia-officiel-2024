"use client";
import React from "react";

export default function page() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex  justify-center items-center  flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-lg">Tutoriels</h1>
          <div className="text-center my-8">
            Ici vous retrouvez des tutoriels qui vous montrent le fonctionnement{" "}
            <br />
            du site internet et ses nouvelle fonctionnalités
          </div>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center w-full p-8 ">
          <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Comment passer une commande
            </h1>
            <div className="w-full max-w-2xl">
              <video
                className="w-full h-auto rounded-lg shadow-lg"
                poster="../assets/order.jpg" // Remplacez par le chemin de l'image miniature de la vidéo
                controls
                preload="none"
              >
                <source src="/passOrders.mp4" type="video/mp4" />
                <track
                  src="../assets/order.jpg"
                  kind="subtitles"
                  srcLang="fr"
                  label="Francais"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
