"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const slides = [
  {
    id: 1,
    title: "Explorez Notre Gamme de Smartphones et Accessoires",
    description:
      "Découvrez les derniers smartphones et leurs accessoires pour améliorer votre expérience mobile. Profitez d'une qualité sonore exceptionnelle avec nos écouteurs et rechargez votre appareil rapidement avec nos chargeurs. Offrez-vous le meilleur de la technologie à portée de main.",
    img: "https://images.pexels.com/photos/14437639/pexels-photo-14437639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Ordinateurs et Tablettes de Haute Performance",
    description:
      "Trouvez l'ordinateur ou la tablette idéale pour vos besoins professionnels et personnels. Nos appareils allient performance et style pour vous accompagner au quotidien. Complétez votre équipement avec des accessoires innovants",
    img: "https://images.pexels.com/photos/14982340/pexels-photo-14982340/free-photo-of-bureau-ordinateur-portable-technologie-ordinateur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Électronique Grand Public à Prix Imbattables",
    description:
      "Plongez dans l'univers de l'électronique avec nos télévisions, appareils photo et drones de dernière génération. Capturez des moments inoubliables et vivez des expériences immersives. Modernisez votre maison avec nos équipements de pointe.",
    img: "https://images.pexels.com/photos/4763077/pexels-photo-4763077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 4,
    title: "Objets Connectés pour un Quotidien Intelligent",
    description:
      "Transformez votre vie avec nos objets connectés. Des montres intelligentes aux systèmes de domotique, découvrez des technologies qui vous facilitent la vie. Restez en forme et en sécurité grâce à nos solutions innovantes.",
    img: "https://images.pexels.com/photos/12743405/pexels-photo-12743405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 5,
    title: "Jeux vidéo et consoles",
    description:
      "Explorez notre sélection de consoles et jeux vidéo pour vivre des aventures palpitantes. Que vous soyez un joueur occasionnel ou un passionné, trouvez tout le nécessaire pour une expérience de jeu inoubliable. Rejoignez notre communauté de gamers dès aujourd'hui !",
    img: "https://images.pexels.com/photos/4523020/pexels-photo-4523020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 6,
    title: "Imprimantes et Accessoires Performants",
    description:
      "Simplifiez vos impressions avec nos imprimantes de qualité supérieure et leurs accessoires. Que ce soit pour un usage domestique ou professionnel, nous avons tout ce qu'il vous faut pour donner vie à vos projets. Profitez de notre sélection de cartouches et papiers.",
    img: "https://images.pexels.com/photos/9301888/pexels-photo-9301888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 7,
    title: " Équipement de Réseau Fiable et Efficace",
    description:
      "Assurez une connexion Internet rapide et stable avec nos routeurs, modems et câbles. Idéal pour les foyers et les bureaux, nos équipements vous garantissent des performances optimales. Restez connecté, peu importe où vous êtes.",
    img: "https://images.pexels.com/photos/18069239/pexels-photo-18069239.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 8,
    title: "Solutions de Stockage Innovantes",
    description:
      "Protégez vos données avec nos disques durs, clés USB et cartes mémoire de haute capacité. Ne manquez jamais une occasion de sauvegarder vos souvenirs ou vos fichiers importants. Optez pour la sécurité et la performance avec nos équipements de stockage.",
    img: "https://images.pexels.com/photos/11185190/pexels-photo-11185190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 9,
    title: " Accessoires Informatiques Indispensables",
    description:
      "Complétez votre setup avec nos claviers, souris et webcams de qualité. Optimisez votre expérience de travail et de jeu grâce à des outils ergonomiques et performants. Faites le choix de l'efficacité et du confort.",
    img: "https://images.pexels.com/photos/19012038/pexels-photo-19012038/free-photo-of-technologie-moderne-souris-equipement.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 10,
    title: " Sécurisez Votre Espace avec Nos Équipements",
    description:
      "Protégez votre maison et vos biens avec nos caméras de surveillance et systèmes de sécurité intelligents. Restez serein grâce à une surveillance 24/7 et à des alertes en temps réel. Investissez dans la sécurité de votre famille et de vos biens.",
    img: "https://images.pexels.com/photos/8869297/pexels-photo-8869297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];
const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-[calc(100vh-80px)]  ">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000 "
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row `}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center  px-12 max-sm:pt-4">
              <h2 className="text-orange-400">{slide.description}</h2>
              <h1 className="text-xl lg:text-xl xl:text-4xl font-semibold text-orange-500">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4 ">
                  Explorez 🔥
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 max-sm:bottom-4 bg-[#0000009c] py-2 px-4 rounded-full flex gap-4  max-md:left-[30%]  max-sm:left-[13%] max-[320px]:left-[4%]">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1  ring-orange-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-orange-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
