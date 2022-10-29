import {
  type Component,
  For,
  Show,
  createSignal,
  createMemo,
  createResource,
} from "solid-js";

import Visit from "./Visit";

const App: Component = () => {
  const [locations] = createResource<Record<string, ILocation>>(fetchLocations);
  const [visits] = createResource<Record<string, IVisit>>(fetchVisits);
  const [showFeatured, setShowFeatured] = createSignal(true);

  const list = createMemo(() => {
    const visitData = visits();
    const locationData = locations();
    if (!visitData || !locationData) return [];

    const visitArr = Object.values(visitData).sort((a, b) => b.date - a.date);
    if (!showFeatured()) return visitArr;
    return visitArr.filter((v) => {
      const location = locationData[v.locationId];
      return location.tags.includes("featured");
    });
  });

  const toggle = () => {
    setShowFeatured(!showFeatured());
  };

  return (
    <main class="px-4 md:px-8 pt-5 md:pt-9">
      <nav class="bg-amber-100 dark:bg-slate-900 px-4 py-3 border-2 border-b-8 border-neutral-900 dark:border-slate-600 sticky top-0 z-40 flex justify-between items-center">
        <a href="/" class="flex gap-2 items-center">
          <img
            src="./src/assets/logo.svg"
            alt="Website logo"
            class="w-9 flex-none"
            loading="eager"
          />
          <span class="font-serif font-semibold uppercase text-2xl leading-none text-indigo-900 dark:text-white">
            Lojo Jojo
          </span>
        </a>
        <Show
          when={showFeatured()}
          fallback={
            <button
              class="max-w-max h-max inline-flex items-center gap-x-2 py-1.5 px-3 rounded-full border-2 border-neutral-900 dark:border-white dark:text-white"
              onClick={toggle}
              aria-label="Show featured visits only"
            >
              <span class="rounded-full w-3 h-3 bg-black dark:bg-white" /> Show
              all visits
            </button>
          }
        >
          <button
            class="max-w-max h-max inline-flex items-center gap-x-2 py-1.5 px-3 rounded-full border-2 border-neutral-900 dark:border-white dark:text-white"
            onClick={toggle}
            aria-label="Show all visits"
          >
            <span class="rounded-full w-3 h-3 border-2 border-neutral-900 dark:border-white" />{" "}
            Show all visits
          </button>
        </Show>
      </nav>

      <section class="py-6 md:py-8 flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 md:gap-y-7">
        <For each={list()}>
          {(item) => (
            <Visit
              visit={item}
              location={
                (locations() as Record<string, ILocation>)[item.locationId]
              }
            />
          )}
        </For>
      </section>

      <footer class="text-sm pt-5 pb-8 border-t-2 border-neutral-900 dark:border-slate-600">
        Lojo Jojo is a Hacktoberfest 2022 project by{" "}
        <a
          class="text-indigo-500 hover:text-indigo-800 dark:text-slate-300 hover:dark:text-white"
          href="https://github.com/SuperGeekJake"
        >
          Jake Williams
        </a>{" "}
        and{" "}
        <a
          class="text-indigo-500 hover:text-indigo-800 dark:text-slate-300 hover:dark:text-white"
          href="https://twitter.com/meowlivia_"
        >
          Meowlivia
        </a>
        .
      </footer>
    </main>
  );
};

export default App;

const fetchVisits = async () => {
  const res = await fetch("/.netlify/functions/visits");
  return res.json();
};

const fetchLocations = async () => {
  const res = await fetch("/.netlify/functions/locations");
  return res.json();
};
