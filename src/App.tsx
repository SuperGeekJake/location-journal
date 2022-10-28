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
    <div class="grid">
      <Show
        when={showFeatured()}
        fallback={
          <button
            class="max-w-max h-max inline-flex items-center gap-x-2 py-1.5 px-3 rounded-full border-2 border-neutral-900"
            onClick={toggle}
            aria-label="Show featured visits only"
          >
            <span class="rounded-full w-3 h-3 bg-black" /> Show all visits
          </button>
        }
      >
        <button
          class="max-w-max h-max inline-flex items-center gap-x-2 py-1.5 px-3 rounded-full border-2 border-neutral-900"
          onClick={toggle}
          aria-label="Show all visits"
        >
          <span class="rounded-full w-3 h-3 border-2 border-neutral-900" /> Show
          all visits
        </button>
      </Show>
      <main class="grid grid-cols-4 gap-0.5 border-2 border-neutral-900 bg-neutral-900">
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
      </main>
    </div>
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
