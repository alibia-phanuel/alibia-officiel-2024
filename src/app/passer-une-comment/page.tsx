"use client";
import React from "react";
import ReactPlayer from "react-player/lazy";

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
          <div className="shadow-lg border border-orange-500 rounded-lg flex flex-col justify-center max-md:w-full  items-center w-[800px] h-[700px]">
            <ReactPlayer url="https://www.youtube.com/watch?v=cxp3c52MZ7U&t=9s" />
            <div className="p-4 font-semibold text-lg">
              Comment passer une commande ?
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
