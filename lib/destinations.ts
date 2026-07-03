export interface Activity {
  title: string;
  description: string;
  icon: string;
}

export interface PracticalInfo {
  label: string;
  value: string;
}

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  epoch: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string;
  activities: Activity[];
  practicalInfo: PracticalInfo[];
  gradient: string;
  accentColor: string;
}

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    subtitle: "L'Exposition Universelle & la naissance de la Tour Eiffel",
    epoch: "XIXe siècle",
    image: "/assets/images/destinations/paris.png",
    description:
      "Vivez l'effervescence de l'Exposition Universelle et assistez à l'inauguration de la Tour Eiffel, symbole d'une ère nouvelle.",
    longDescription: `Plongez au cœur du Paris de 1889, une ville en pleine métamorphose. L'Exposition Universelle bat son plein sur le Champ-de-Mars, attirant des millions de visiteurs venus du monde entier. La Tour Eiffel, achevée quelques mois plus tôt, domine majestueusement la skyline parisienne, un prodige d'ingénierie que beaucoup considèrent encore comme une aberration esthétique.

Déambulez dans les pavillons exotiques, goûtez aux saveurs du monde entier, et croisez peut-être Gustave Eiffel lui-même sur sa tour. Les cafés de Montmartre bouillonnent de créativité : impressionnistes, écrivains et penseurs façonnent le monde moderne sous vos yeux.

Le soir, les nouvelles lampes à arc électrique illuminent les Champs-Élysées d'une lumière féerique, un spectacle que les Parisiens n'avaient jamais vu. C'est l'aube de la modernité, et vous y êtes.`,
    activities: [
      {
        title: "Visite de la Tour Eiffel",
        description:
          "Montez au sommet de la tour nouvellement construite et admirez Paris depuis le point le plus haut du monde.",
        icon: "🗼",
      },
      {
        title: "Exposition Universelle",
        description:
          "Explorez les pavillons des nations, découvrez les dernières inventions et les merveilles du monde.",
        icon: "🎪",
      },
      {
        title: "Soirée à Montmartre",
        description:
          "Partagez un verre avec les artistes impressionnistes au Moulin de la Galette.",
        icon: "🎨",
      },
      {
        title: "Dîner Belle Époque",
        description:
          "Savourez un dîner gastronomique dans l'un des grands restaurants parisiens de l'époque.",
        icon: "🍷",
      },
    ],
    practicalInfo: [
      { label: "Époque", value: "1889 | Belle Époque" },
      { label: "Durée du séjour", value: "3 à 7 jours" },
      { label: "Langue", value: "Français (traducteur temporel inclus)" },
      { label: "Niveau de risque", value: "Faible" },
      { label: "Dress code", value: "Tenue d'époque fournie" },
      { label: "Monnaie", value: "Francs (fournis)" },
    ],
    video: "/assets/videos/paris-video.mp4",
    gradient: "from-amber-900/40 via-yellow-800/20 to-transparent",
    accentColor: "#d4a853",
  },
  {
    id: "cretace",
    title: "Crétacé",
    subtitle: "65 millions d'années avant notre ère. Le règne des dinosaures",
    epoch: "-65 000 000",
    image: "/assets/images/destinations/crétacé.png",
    description:
      "Explorez un monde primitif où les dinosaures règnent en maîtres. Une aventure hors du temps, littéralement.",
    longDescription: `Bienvenue dans le Crétacé supérieur, il y a 65 millions d'années. Un monde que l'humanité n'a jamais connu et ne connaîtra jamais autrement qu'à travers nos voyages. Ici, la Terre est méconnaissable : des forêts tropicales luxuriantes s'étendent à perte de vue, le climat est chaud et humide, et les véritables maîtres du monde pèsent plusieurs tonnes.

Depuis notre base d'observation sécurisée, équipée des dernières technologies de protection temporelle, observez le majestueux Tyrannosaure Rex dans son habitat naturel. Contemplez les troupeaux de Tricératops traversant les plaines, et levez les yeux vers les Ptéranodons planant dans un ciel d'un bleu profond.

Chaque instant est une découverte : la flore, les insectes géants, les premiers mammifères minuscules qui deviendront un jour les ancêtres de l'humanité. Vous marcherez sur une Terre vierge, pure, sauvage, un privilège que seul TimeTravel Agency peut vous offrir.

⚠️ Voyage encadré par nos guides temporels certifiés. Protocole de non-interférence strictement appliqué.`,
    activities: [
      {
        title: "Safari Dinosaures",
        description:
          "Observation sécurisée des plus grands prédateurs ayant jamais existé, depuis notre véhicule blindé temporel.",
        icon: "🦖",
      },
      {
        title: "Exploration Botanique",
        description:
          "Découvrez une flore disparue : fougères géantes, conifères primitifs et les premières plantes à fleurs.",
        icon: "🌿",
      },
      {
        title: "Vol en Ptéranodon",
        description:
          "Survolez les paysages préhistoriques en deltaplane accompagné de Ptéranodons (encadré).",
        icon: "🪂",
      },
      {
        title: "Nuit sous les étoiles",
        description:
          "Observez un ciel nocturne sans pollution lumineuse, avec des constellations totalement différentes.",
        icon: "✨",
      },
    ],
    practicalInfo: [
      { label: "Époque", value: "Crétacé supérieur (-65M)" },
      { label: "Durée du séjour", value: "2 à 5 jours" },
      { label: "Langue", value: "N/A (guides francophones)" },
      { label: "Niveau de risque", value: "Modéré à élevé" },
      { label: "Équipement", value: "Combinaison fournie" },
      { label: "Vaccination", value: "Protocole temporel obligatoire" },
    ],
    video: "/assets/videos/cretace-video.mp4",
    gradient: "from-emerald-900/40 via-green-800/20 to-transparent",
    accentColor: "#34d399",
  },
  {
    id: "florence-1504",
    title: "Florence 1504",
    subtitle: "La Renaissance à son apogée. L'atelier de Léonard de Vinci",
    epoch: "XVIe siècle",
    image: "/assets/images/destinations/renaissance.png",
    description:
      "Plongez dans la Florence des Médicis, rencontrez Léonard de Vinci et vivez la Renaissance de l'intérieur.",
    longDescription: `Florence, 1504. La ville est le centre du monde. Sous le mécénat des Médicis, les plus grands génies de l'histoire convergent vers cette cité toscane : Léonard de Vinci achève ses carnets les plus audacieux, Michel-Ange sculpte le David, et Machiavel rédige Le Prince.

Déambulez dans les rues pavées de la cité, admirez le Duomo de Brunelleschi baigné dans la lumière dorée de Toscane, et pénétrez dans les ateliers où se forge l'art occidental. Nos voyageurs ont le privilège unique d'assister à une session de travail de Léonard, observer le maître dessiner, concevoir, inventer.

Les marchés regorgent de soieries, d'épices et d'œuvres d'art. Les conversations dans les palais abordent la philosophie, la science, et la politique avec une liberté intellectuelle inédite. Vous vivrez la naissance de la modernité dans son berceau même.

Un voyage pour les amoureux de l'art, de la beauté, et de la pensée libre.`,
    activities: [
      {
        title: "Atelier de Léonard",
        description:
          "Assistez à une session de travail du maître : croquis, inventions mécaniques et études anatomiques.",
        icon: "🎭",
      },
      {
        title: "Le David de Michel-Ange",
        description:
          "Contemplez le David fraîchement achevé, installé sur la Piazza della Signoria.",
        icon: "🗿",
      },
      {
        title: "Banquet Médicis",
        description:
          "Participez à un banquet dans le palais des Médicis : musique, poésie et gastronomie toscane.",
        icon: "👑",
      },
      {
        title: "Cours de Fresque",
        description:
          "Initiez-vous à la technique de la fresque avec un maître artisan florentin.",
        icon: "🖌️",
      },
    ],
    practicalInfo: [
      { label: "Époque", value: "1504 | Haute Renaissance" },
      { label: "Durée du séjour", value: "3 à 7 jours" },
      { label: "Langue", value: "Italien (traducteur temporel inclus)" },
      { label: "Niveau de risque", value: "Faible" },
      { label: "Dress code", value: "Tenue Renaissance fournie" },
      { label: "Monnaie", value: "Florins (fournis)" },
    ],
    video: "/assets/videos/rennaissance-video.mp4",
    gradient: "from-purple-900/40 via-violet-800/20 to-transparent",
    accentColor: "#a78bfa",
  },
];

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}
