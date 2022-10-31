import { sub, set, format } from "date-fns";
// @ts-ignore
import Papa from "papaparse";

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

const descriptions = [
  "Best matcha latte!",
  "Worst matcha latte :(",
  "Pistachio croissant Yum!",
  "Stale croissants only",
  "Best coffee in town",
  "Coffee is too hot",
  "Love the atmosphere",
  "Too loud",
  "Great service",
  "Just okay",
  "Love the decor",
  "Harry Potter themed",
];

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

const visits = [
  ["Date", "Location Name", "Image Url", "Featured", "Description"],
  ...dates.map(
    (date) =>
      [
        format(date, "yyyy-MM-dd"),
        names[random.int(names.length - 1, 0)],
        `https://placekitten.com/150/150?image=${random.int(16)}`,
        random.bool(0.3),
        descriptions[random.int(descriptions.length - 1, 0)],
      ] as const
  ),
];

export const sampleCSV = Papa.unparse(visits);
