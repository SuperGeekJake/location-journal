import { type Component, Show, createMemo } from "solid-js";
import { formatDistance } from "date-fns";
import { parseSerialDate } from "./utils";

const Visit: Component<IVisit> = (props) => {
  return (
    <div class="bg-amber-100 dark:bg-slate-900 border-2 border-neutral-900 dark:border-slate-600 p-4 pb-1 md:p-5 md:pb-2 shadow-solid">
      <div class="flex gap-2 relative">
        <img src={props.imageUrl} class="w-full bg-cover flex-1 rounded-2xl" />
        <p class="[writing-mode:vertical-rl] text-neutral-600 dark:text-neutral-300 italic -mr-2">
          {props.description}
        </p>
        <Show when={props.featured}>
          <span class="absolute -bottom-0.5 -right-0.5 text-lg float-right">
            ⭐
          </span>
        </Show>
      </div>
      <div class="py-2 border-t mt-3 border-neutral-900 dark:border-slate-600">
        <h3 class="font-serif text-xl mt-1 leading-none 2xl:text-3xl md:leading-tight dark:text-white">
          <span>{props.locationName}</span>
        </h3>
        <div class="text-sm text-neutral-600 dark:text-neutral-300">
          {formatDistance(parseSerialDate(props.date), new Date())} ago
        </div>
      </div>
    </div>
  );
};

export default Visit;
