import { type Component, For, Show } from "solid-js";

import { locations } from "./locations";

const App: Component = () => {
  return (
    <div class="grid grid-cols-3">
      <For each={locations}>
        {(item) => (
          <div>
            <h3 class="font-bold text-lg">
              <span>{item.name}</span>
              <Show when={item.tags.includes("featured")}>
                <span>⭐</span>
              </Show>
            </h3>
            <div>{item.visits}</div>
          </div>
        )}
      </For>
    </div>
  );
};

export default App;
