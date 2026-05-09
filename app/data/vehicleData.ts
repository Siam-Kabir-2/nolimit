export interface Vehicle {
  slug: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  images: string[];
  color: string;
  category: string;
  engine: string;
  horsepower: number;
  torque: string;
  zeroToSixty: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  mpg: string;
  featured: boolean;
  newArrival: boolean;
  description: string;
  topSpeed: string;
}

export const vehicles: Vehicle[] = [
  {
    slug: "2024-lamborghini-aventador-svj",
    name: "2024 Lamborghini Aventador SVJ",
    make: "Lamborghini",
    model: "Aventador SVJ",
    year: 2024,
    price: 573966,
    mileage: 1200,
    image: "/images/cars/hero-car.png",
    images: ["/images/cars/hero-car.png"],
    color: "Nero Nemesis (Black)",
    category: "supercar",
    engine: "6.5L V12",
    horsepower: 770,
    torque: "531 lb-ft",
    zeroToSixty: "2.8s",
    transmission: "7-Speed ISR",
    drivetrain: "AWD",
    fuelType: "Gasoline",
    mpg: "9/15",
    featured: true,
    newArrival: true,
    description:
      "L'expression ultime de l'ingénierie Lamborghini. L'Aventador SVJ combine puissance brute et perfection aérodynamique, offrant une expérience de conduite inégalée sur route et sur circuit.",
    topSpeed: "350 km/h",
  },
  {
    slug: "2024-porsche-911-gt3-rs",
    name: "2024 Porsche 911 GT3 RS",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 241300,
    mileage: 3500,
    image: "/images/cars/porsche-911.png",
    images: ["/images/cars/porsche-911.png"],
    color: "Guards Red",
    category: "sports",
    engine: "4.0L Flat-6",
    horsepower: 518,
    torque: "346 lb-ft",
    zeroToSixty: "3.0s",
    transmission: "7-Speed PDK",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "15/20",
    featured: true,
    newArrival: true,
    description:
      "Née sur circuit, perfectionnée pour la route. La GT3 RS est équipée du moteur atmosphérique le plus puissant jamais monté sur une 911, enveloppé dans un chef-d'œuvre aérodynamique.",
    topSpeed: "296 km/h",
  },
  {
    slug: "2024-mercedes-amg-gt-black-series",
    name: "2024 Mercedes-AMG GT Black Series",
    make: "Mercedes-Benz",
    model: "AMG GT Black Series",
    year: 2024,
    price: 325000,
    mileage: 2800,
    image: "/images/cars/mercedes-amg.png",
    images: ["/images/cars/mercedes-amg.png"],
    color: "Selenite Grey",
    category: "supercar",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 720,
    torque: "590 lb-ft",
    zeroToSixty: "3.1s",
    transmission: "7-Speed DCT",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "14/20",
    featured: true,
    newArrival: false,
    description:
      "Le moteur V8 de série AMG le plus puissant jamais conçu. La GT Black Series redéfinit les limites d'une voiture de sport à moteur avant avec son vilebrequin plat et son aérodynamisme issu de la course.",
    topSpeed: "325 km/h",
  },
  {
    slug: "2024-bmw-m4-competition",
    name: "2024 BMW M4 Competition",
    make: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 82900,
    mileage: 8500,
    image: "/images/cars/bmw-m4.png",
    images: ["/images/cars/bmw-m4.png"],
    color: "Tanzanite Blue",
    category: "sports",
    engine: "3.0L Twin-Turbo I6",
    horsepower: 503,
    torque: "479 lb-ft",
    zeroToSixty: "3.4s",
    transmission: "8-Speed M Steptronic",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "16/23",
    featured: false,
    newArrival: true,
    description:
      "La M4 Competition xDrive offre une accélération fulgurante avec l'équilibre et la précision qui définissent la gamme M. Son six cylindres en ligne biturbo produit une symphonie mécanique.",
    topSpeed: "290 km/h",
  },
  {
    slug: "2024-ferrari-f8-tributo",
    name: "2024 Ferrari F8 Tributo",
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2024,
    price: 280000,
    mileage: 4200,
    image: "/images/cars/ferrari-f8.png",
    images: ["/images/cars/ferrari-f8.png"],
    color: "Rosso Corsa",
    category: "supercar",
    engine: "3.9L Twin-Turbo V8",
    horsepower: 710,
    torque: "568 lb-ft",
    zeroToSixty: "2.9s",
    transmission: "7-Speed F1 DCT",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "14/19",
    featured: true,
    newArrival: true,
    description:
      "Un hommage à la famille de moteurs la plus acclamée de Ferrari. La F8 Tributo est le V8 le plus puissant de l'histoire de Maranello, délivrant 710 ch de pure excellence italienne.",
    topSpeed: "340 km/h",
  },
  {
    slug: "2024-audi-rs-etron-gt",
    name: "2024 Audi RS e-tron GT",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    price: 164900,
    mileage: 6000,
    image: "/images/cars/audi-rs.png",
    images: ["/images/cars/audi-rs.png"],
    color: "Nardo Grey",
    category: "electric",
    engine: "Dual Electric Motors",
    horsepower: 637,
    torque: "612 lb-ft",
    zeroToSixty: "3.1s",
    transmission: "2-Speed Automatic",
    drivetrain: "AWD",
    fuelType: "Electric",
    mpg: "79 MPGe",
    featured: false,
    newArrival: true,
    description:
      "Le futur de la performance, électrifié. L'RS e-tron GT combine le design signature d'Audi avec un couple électrique instantané pour une expérience de conduite silencieuse mais redoutable.",
    topSpeed: "250 km/h",
  },
  {
    slug: "2024-lamborghini-huracan-sto",
    name: "2024 Lamborghini Huracán STO",
    make: "Lamborghini",
    model: "Huracán STO",
    year: 2024,
    price: 327838,
    mileage: 1800,
    image: "/images/cars/hero-car.png",
    images: ["/images/cars/hero-car.png"],
    color: "Arancio Borealis",
    category: "supercar",
    engine: "5.2L V10",
    horsepower: 640,
    torque: "417 lb-ft",
    zeroToSixty: "3.0s",
    transmission: "7-Speed LDF DCT",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "13/18",
    featured: false,
    newArrival: false,
    description:
      "Une voiture de course pour la route. L'Huracán STO apporte la technologie de course Super Trofeo et GT3 à une voiture homologuée pour la rue avec un appui aérodynamique incroyable.",
    topSpeed: "310 km/h",
  },
  {
    slug: "2024-porsche-taycan-turbo-s",
    name: "2024 Porsche Taycan Turbo S",
    make: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    price: 187400,
    mileage: 5200,
    image: "/images/cars/porsche-911.png",
    images: ["/images/cars/porsche-911.png"],
    color: "Frozen Blue",
    category: "electric",
    engine: "Dual Electric Motors",
    horsepower: 750,
    torque: "774 lb-ft",
    zeroToSixty: "2.4s",
    transmission: "2-Speed Automatic",
    drivetrain: "AWD",
    fuelType: "Electric",
    mpg: "76 MPGe",
    featured: false,
    newArrival: false,
    description:
      "La référence des berlines électriques de performance. La Taycan Turbo S offre la dynamique de conduite légendaire de Porsche avec zéro émission et une accélération à couper le souffle.",
    topSpeed: "260 km/h",
  },
  {
    slug: "2024-mclaren-720s",
    name: "2024 McLaren 720S",
    make: "McLaren",
    model: "720S",
    year: 2024,
    price: 310500,
    mileage: 3100,
    image: "/images/cars/mercedes-amg.png",
    images: ["/images/cars/mercedes-amg.png"],
    color: "Onyx Black",
    category: "supercar",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 710,
    torque: "568 lb-ft",
    zeroToSixty: "2.7s",
    transmission: "7-Speed SSG",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "15/22",
    featured: false,
    newArrival: true,
    description:
      "Sculptée par l'air, pilotée par la technologie. La 720S représente le sommet de la quête incessante de légèreté et de performance de McLaren, avec une monocoque en fibre de carbone en son cœur.",
    topSpeed: "341 km/h",
  },
  {
    slug: "2024-bmw-m8-competition",
    name: "2024 BMW M8 Competition",
    make: "BMW",
    model: "M8 Competition",
    year: 2024,
    price: 139900,
    mileage: 7200,
    image: "/images/cars/bmw-m4.png",
    images: ["/images/cars/bmw-m4.png"],
    color: "Marina Bay Blue",
    category: "luxury",
    engine: "4.4L Twin-Turbo V8",
    horsepower: 617,
    torque: "553 lb-ft",
    zeroToSixty: "2.9s",
    transmission: "8-Speed M Steptronic",
    drivetrain: "AWD",
    fuelType: "Gasoline",
    mpg: "15/21",
    featured: false,
    newArrival: false,
    description:
      "Le grand tourisme rencontre la performance M. La M8 Competition allie luxe et puissance brute, délivrant 617 ch via un système AWD avancé pour des performances de supercar en toutes conditions.",
    topSpeed: "305 km/h",
  },
  {
    slug: "2024-ferrari-roma",
    name: "2024 Ferrari Roma",
    make: "Ferrari",
    model: "Roma",
    year: 2024,
    price: 236000,
    mileage: 5800,
    image: "/images/cars/ferrari-f8.png",
    images: ["/images/cars/ferrari-f8.png"],
    color: "Bianco Avus",
    category: "luxury",
    engine: "3.9L Twin-Turbo V8",
    horsepower: 612,
    torque: "561 lb-ft",
    zeroToSixty: "3.4s",
    transmission: "8-Speed DCT",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "13/18",
    featured: false,
    newArrival: false,
    description:
      "La nuova dolce vita. La Roma incarne l'élégance italienne intemporelle avec un cœur V8 biturbo, représentant la Ferrari GT moderne à moteur V8 avant.",
    topSpeed: "320 km/h",
  },
  {
    slug: "2024-audi-r8-performance",
    name: "2024 Audi R8 V10 Performance",
    make: "Audi",
    model: "R8 V10 Performance",
    year: 2024,
    price: 208100,
    mileage: 4500,
    image: "/images/cars/audi-rs.png",
    images: ["/images/cars/audi-rs.png"],
    color: "Kemora Grey",
    category: "supercar",
    engine: "5.2L V10",
    horsepower: 602,
    torque: "413 lb-ft",
    zeroToSixty: "3.1s",
    transmission: "7-Speed S tronic",
    drivetrain: "AWD",
    fuelType: "Gasoline",
    mpg: "13/19",
    featured: false,
    newArrival: false,
    description:
      "La supercar du quotidien. Avec son V10 atmosphérique dérivé de Lamborghini, la R8 Performance offre des sensations de course avec la confiance légendaire de la transmission intégrale Audi.",
    topSpeed: "330 km/h",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured);
}

export function getNewArrivals(): Vehicle[] {
  return vehicles.filter((v) => v.newArrival);
}

export function getUniqueMakes(): string[] {
  return [...new Set(vehicles.map((v) => v.make))].sort();
}

export function getUniqueColors(): string[] {
  return [...new Set(vehicles.map((v) => v.color))].sort();
}

export function getUniqueCategories(): string[] {
  const categoryMap: Record<string, string> = {
    supercar: "Supercar",
    sports: "Sport",
    electric: "Électrique",
    luxury: "Luxe",
  };
  return [...new Set(vehicles.map((v) => categoryMap[v.category] || v.category))].sort();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("fr-FR").format(mileage) + " km";
}
