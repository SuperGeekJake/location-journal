import { sub, set } from "date-fns";

import getRandom from "./random";

const random = getRandom("Olivia loves BTS!");

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

const createRecord = <T extends { id: number }>(arr: T[]) =>
  arr.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {} as Record<string, T>);

export const locations = createRecord(
  names.map<ILocation>((name, index) => ({
    id: index + 1,
    name,
    tags: random.bool(0.3) ? ["featured"] : [],
  }))
);

const dates = Array.from({ length: 100 }, (_, index) =>
  sub(
    set(new Date(), {
      hours: random.int(23, 0),
      minutes: random.int(59, 0),
      seconds: random.int(59, 0),
      milliseconds: random.int(999, 0),
    }),
    { days: random.int(index + 5, index) }
  ).getTime()
).sort((a, b) => a - b);

const locationKeys = Object.keys(locations);

export const visits = createRecord(
  dates.map<IVisit>((date, index) => ({
    id: index + 1,
    locationId: random.int(locationKeys.length),
    date,
  }))
);
