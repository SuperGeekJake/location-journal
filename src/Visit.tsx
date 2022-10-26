import { type Component, Show } from "solid-js";

import { type IVisit, type ILocation } from "./locations";

const Visit: Component<{ visit: IVisit; location: ILocation }> = (props) => {
  return (
    <div class="bg-white">
      <img src="https://via.placeholder.com/150" class="w-full bg-cover" />
      <div class="px-4 py-3 border-t border-neutral-900">
        <h3 class="font-hackyd text-2xl leading-6">
          <span>{props.location.name}</span>
          <Show when={props.location.tags.includes("featured")}>
            <span>⭐</span>
          </Show>
        </h3>
      </div>
    </div>
  );
};

export default Visit;
