import { type Component, For, Show, createSignal } from "solid-js";

import { locations } from "./locations";

const App: Component = () => {
  const [showFeatured, setShowFeatured] = createSignal(true);
  const toggle = () => setShowFeatured(!showFeatured());

  return (
    <div class="grid">
      {/* TODO: toggle to show all visits vs featured.
          TODO+: They are separate buttons due to different aria-labels. The only changing condition visually is the color of the small circle in the button. Would be nice if this was refactored o_O 
      */}
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
        <For each={locations}>
          {(item) => (
            <div class="bg-white">
              <img
                src="https://via.placeholder.com/150"
                class="w-full bg-cover"
              />
              <div class="px-4 py-3 border-t border-neutral-900">
                <h3 class="font-bold text-lg leading-6">
                  <span>{item.name}</span>
                  <Show when={item.tags.includes("featured")}>
                    <span>⭐</span>
                  </Show>
                </h3>
              </div>
            </div>
          )}
        </For>
      </main>
    </div>
  );
};

export default App;
