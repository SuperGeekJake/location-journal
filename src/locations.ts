import { sub, set } from "date-fns";

import { MurmurHash3, Xoshiro128 } from "./random";

export interface IVisit {
  id: number;
  locationId: number;
  date: number;
}

export interface ILocation {
  id: number;
  name: string;
  tags: string[];
}

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

export const locations = names.map<ILocation>((name, index) => ({
  id: index + 1,
  name,
  tags: randomBoolean(0.3) ? ["featured"] : [],
}));

export const locationMap = locations.reduce<Record<number, ILocation>>(
  (result, location) => {
    result[location.id] = location;
    return result;
  },
  {}
);

const dates = Array.from({ length: 100 }, (_, index) =>
  sub(
    set(new Date(), {
      hours: randomInt(23, 0),
      minutes: randomInt(59, 0),
      seconds: randomInt(59, 0),
      milliseconds: randomInt(999, 0),
    }),
    { days: randomInt(index + 5, index) }
  ).getTime()
).sort((a, b) => a - b);

export const visits = dates
  .map<IVisit>((date, index) => ({
    id: index + 1,
    locationId: randomInt(locations.length),
    date,
  }))
  .reverse();
