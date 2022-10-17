import { type Component, For, Show } from "solid-js";

import { locations } from "./locations";

const App: Component = () => {
  return (
    <>
      <For each={locations}>
        {(item) => (
          <div>
            <h3>
              <span>{item.name}</span>
              <Show when={item.tags.includes("featured")}>
                <span>⭐</span>
              </Show>
            </h3>
            <div>{item.visits}</div>
          </div>
        )}
      </For>
    </>
  );
};

export default App;
