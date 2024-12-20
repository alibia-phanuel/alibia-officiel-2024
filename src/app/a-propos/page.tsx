import Image from "next/image";
export default function Propos() {
  const categories = [
    {
      title: "Smartphones et accessoires",
      description:
        "Explorez notre sélection de téléphones dernier cri, ainsi que d'accessoires essentiels comme des coques, chargeurs, et écouteurs pour optimiser votre expérience mobile.",
      icon: "/icons/contacter.png", // Exemple de chemin d'icône
    },
    {
      title: "Ordinateurs et tablettes",
      description:
        "Que vous ayez besoin d'un ordinateur portable puissant ou d'une tablette pratique, nous avons ce qu'il vous faut, ainsi que les accessoires indispensables pour une performance optimale.",
      icon: "/icons/ordinateurs-portables.png",
    },
    {
      title: "Électronique grand public",
      description:
        "Découvrez nos télévisions, appareils photo et drones pour rester connecté et capturer les moments importants de votre vie.",
      icon: "/icons/appareils-electroniques.png",
    },
    {
      title: "Objets connectés",
      description:
        "Montres intelligentes, bracelets fitness, et solutions domotiques pour une maison moderne et connectée.",
      icon: "/icons/application-smartwatch.png",
    },
    {
      title: "Jeux vidéo et consoles",
      description:
        "Plongez dans l'univers du jeu avec nos consoles PlayStation, Xbox, manettes, et une sélection de jeux captivants.",
      icon: "/icons/xbox.png",
    },
    {
      title: "Imprimantes et accessoires",
      description:
        "Tout pour imprimer efficacement, de l'imprimante aux cartouches, en passant par le papier de qualité.",
      icon: "/icons/imprimante.png",
    },
    {
      title: "Équipement de réseau",
      description:
        "Routeurs, modems et câbles pour une connectivité sans faille à la maison ou au bureau.",
      icon: "/icons/la-mise-en-reseau.png",
    },
    {
      title: "Équipements de stockage",
      description:
        "Disques durs, clés USB, cartes mémoire — nous avons la solution de stockage adaptée à vos besoins.",
      icon: "/icons/disque-dur.png",
    },
    {
      title: "Accessoires informatiques",
      description:
        "Claviers, souris, webcams et bien plus pour compléter votre installation informatique.",
      icon: "/icons/accessoires.png",
    },
    {
      title: "Équipements de sécurité",
      description:
        "Caméras de surveillance, alarmes et systèmes de sécurité intelligents pour protéger votre espace.",
      icon: "/icons/bouclier.png",
    },
  ];
  return (
    <div className=" justify-center  flex  px-4">
      <div className=" container mt-[100px]">
        <div>
          <h2 className="text-center font-bold text-orange-400 text-[30px]">
            {" "}
            À propos de nous
          </h2>
          <div className="text-center my-10">
            Bienvenue sur{" "}
            <span className="text-orange-400 font-bold mx-2">ALIBIA</span>, qui
            est une start-up dans le digital qui offre des produits et services
            dans le domaine informatique plus précisément la conception
            d`application web et mobile ou aussi des produits informatiques
            comme des ordinateurs, équipements réseau, etc. Notre priorité est
            la satisfaction du client dans tout tous les sens du terme
          </div>

          <div>
            <h1 className="text-center font-bold text-orange-400 text-[30px]">
              Offrez les meilleurs produits technologiques à vos proches au
              Cameroun !
            </h1>

            <div className="flex gap-4 my-[60px] max-md:flex-wrap">
              <div className="bg-white flex justify-center items-center p-8 rounded-lg shadow-xl gap-4 border border-[#ffa23f]">
                <div>
                  <Image
                    width={250}
                    height={250}
                    src="/icons/cadeau.png"
                    alt="cadeau"
                  />
                </div>
                <p className="text-gray-600">
                  Vous avez des proches au Cameroun et souhaitez leur faire
                  plaisir avec des cadeaux technologiques ? Notre boutique en
                  ligne est la solution qu’il vous faut ! Nous proposons une
                  large gamme de produits high-tech – smartphones, ordinateurs,
                  accessoires, objets connectés, et bien plus encore – à des
                  prix abordables.
                </p>
              </div>
              <div className="bg-white flex justify-center items-center p-8 rounded-lg shadow-xl  gap-4 border border-[#ffa23f]">
                <div>
                  <Image
                    width={250}
                    height={250}
                    src="/icons/ordre.png"
                    alt="ordre"
                  />
                </div>
                <p className="text-gray-600">
                  Avec notre service, vous commandez en toute simplicité depuis
                  l’étranger et vos proches reçoivent leurs cadeaux directement
                  chez eux, avec la possibilité de payer à la livraison. C’est
                  pratique, sécurisé et sans souci !
                </p>
              </div>
              <div className="bg-white flex justify-center items-center p-8 rounded-lg shadow-xl gap-4 border border-[#ffa23f]">
                <div>
                  <Image
                    width={250}
                    height={250}
                    src="/icons/bombe-de-table.png"
                    alt="ordre"
                  />
                </div>
                <p className="text-gray-600">
                  Que ce soit pour un anniversaire, une fête ou juste pour faire
                  plaisir, notre boutique est là pour vous aider à surprendre
                  vos proches avec les dernières nouveautés technologiques.
                  Faites confiance à notre service et offrez des cadeaux qui
                  feront vraiment plaisir !
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="py-5 font-bold text-[20px] text-orange-400 ">
              Nous proposons
            </h1>
            <ul className="list-disc">
              {categories.map((category, index) => (
                <li
                  className="list-disc"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <Image
                    height={40}
                    width={40}
                    src={category.icon}
                    alt={`${category.title} icon`}
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <h3 className="font-bold">{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center my-36">
            Notre mission est simple : offrir à nos clients les dernières
            innovations technologiques à des prix compétitifs, tout en assurant
            une expérience d&lsquo;achat fluide et agréable. Que vous soyez un
            passionné de technologie ou un professionnel en quête des meilleures
            solutions, nous sommes là pour vous accompagner à chaque étape de
            votre parcours numérique. Merci de faire confiance à
            <span className="text-orange-400 font-bold mx-2">ALIBIA</span>.
            Ensemble, construisons un futur technologique.
          </div>
        </div>
      </div>
    </div>
  );
}
