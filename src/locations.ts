import { MurmurHash3, Xoshiro128 } from "./random";

// Use seeded random to create predictable locations
const gs = MurmurHash3("Olivia loves BTS!");
const random = Xoshiro128(gs(), gs(), gs(), gs());

const randomInt = (max: number, min: number = 1) =>
  Math.floor(random() * max) + min;

const randomBoolean = (chance: number) => random() < chance;

const names = [
  "Aroma Mocha",
  "Grinders Cafe",
  "Steamy Beans Coffee",
  "Baristas",
  "Ground Up Cafe",
  "Tatiana's Cafe",
  "Beans 'n Cream Cafe",
  "HuggaMug Cafe",
  "The Busy Bean",
  "Beany Business",
  "Impresso Espresso",
  "The Coffee Club",
  "Boston Barista",
  "Jacked Up Coffee",
  "The Family Bean",
  "Club Coffee",
  "Jumpin' Beans Cafe",
  "The Friendly Bean",
  "Coffee Express",
  "Jumpstart Coffee Shop",
  "The Grind",
  "Coffee House",
  "Lava Java",
  "The Hideout",
  "Coffee Time",
  "Manhattan Mocha",
  "The Roasted Bean",
  "Cup o' Joe",
  "Mugs Coffee",
  "The Split Bean",
  "Dream Bean Coffee Shop",
  "No Doze Cafe",
  "The Steam Room",
  "Espresso Cafe",
  "Screamin' Beans",
  "Topped Off",
  "Espresso Express",
  "Spiced Chai Cafe",
  "Wake Up Cafe",
  "Expresso",
  "Steam Beans Cafe",
  "Wide Awake Cafe",
  "Grind House",
  "Steamin' Mugs",
  "Yo Jo Coffee Shop",
];

export const locations = names.map((name, index) => ({
  id: index + 1,
  name,
  visits: randomInt(30),
  tags: randomBoolean(0.1) ? ["featured"] : [],
}));
