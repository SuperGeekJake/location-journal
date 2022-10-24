import { type Component, For, Show, createSignal, createMemo } from "solid-js";

import { visits, locationMap } from "./locations";
import Visit from "./Visit";

const App: Component = () => {
  const [showFeatured, setShowFeatured] = createSignal(true);
  const toggle = () => setShowFeatured(!showFeatured());
  const list = createMemo(() => {
    if (!showFeatured()) return visits;
    return visits.filter((v) => {
      const loc = locationMap[v.locationId];
      return loc.tags.includes("featured");
    });
  });

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
            <Visit visit={item} location={locationMap[item.locationId]} />
          )}
        </For>
      </main>
    </div>
  );
};

export default App;
