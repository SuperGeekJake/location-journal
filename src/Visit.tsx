import { type Component, Show } from "solid-js";
import { formatDistance } from "date-fns";

const Visit: Component<{ visit: IVisit; location: ILocation }> = (props) => {
  return (
    <div class="bg-amber-100 border-2 border-neutral-900  p-4 pb-2 md:p-5 md:pb-3 shadow-solid">
      <div class="flex gap-2 relative">
        <img src="https://via.placeholder.com/150" class="w-full bg-cover flex-1 rounded-2xl" />
        <p class="[writing-mode:vertical-rl] text-neutral-600 italic -mr-2">Visit description</p>
        <Show when={props.location.tags.includes("featured")}>
          <span class="absolute -bottom-0.5 -right-0.5 text-lg float-right">⭐</span>
        </Show>
      </div>     
      <div class="py-2 border-t mt-3 border-neutral-900">
        <h3 class="font-serif text-xl mt-1 leading-none 2xl:text-3xl md:leading-tight">
          <span>{props.location.name}</span>
        </h3>
        <div class="text-sm text-neutral-900">
          {formatDistance(props.visit.date, new Date())}
        </div>
      </div>
    </div>
  );
};

export default Visit;
