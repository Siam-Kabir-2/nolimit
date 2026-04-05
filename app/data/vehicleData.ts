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
      "The ultimate expression of Lamborghini's engineering prowess. The Aventador SVJ combines raw power with aerodynamic perfection, delivering an unmatched driving experience on both road and track.",
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
      "Born on the track, perfected for the road. The GT3 RS features the most powerful naturally-aspirated engine ever fitted to a 911, wrapped in an aerodynamic masterpiece.",
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
      "The most powerful AMG V8 series production engine ever. The GT Black Series redefines what's possible from a front-engine sports car with its flat-plane crankshaft and race-bred aerodynamics.",
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
      "The M4 Competition xDrive delivers breathtaking acceleration with the poise and precision that defines M. Its twin-turbo inline-six produces a symphonic soundtrack.",
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
      "A tribute to Ferrari's most acclaimed engine family. The F8 Tributo is the most powerful V8 in Maranello history, delivering 710 hp of pure Italian excellence.",
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
      "The future of performance, electrified. The RS e-tron GT combines Audi's signature design language with instant electric torque for a silent but deadly driving experience.",
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
      "Race car for the road. The Huracán STO brings Super Trofeo and GT3 racing technology to a street-legal car with incredible aerodynamic downforce.",
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
      "The benchmark for electric performance sedans. The Taycan Turbo S delivers Porsche's legendary driving dynamics with zero emissions and breathtaking acceleration.",
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
      "Sculpted by air, driven by technology. The 720S represents the pinnacle of McLaren's relentless pursuit of lightness and performance, with a carbon fiber monocage at its core.",
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
      "Grand touring meets M performance. The M8 Competition combines luxury with raw power, delivering 617 hp through an advanced AWD system for all-weather supercar performance.",
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
      "La nuova dolce vita. The Roma embodies timeless Italian elegance with a twin-turbo V8 heart, representing the modern front-engine V8 Ferrari GT.",
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
      "The everyday supercar. With its naturally-aspirated V10 derived from Lamborghini, the R8 Performance delivers race-car thrills with Audi's legendary all-wheel-drive confidence.",
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
  return [...new Set(vehicles.map((v) => v.category))].sort();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage) + " mi";
}
