import { writable } from "svelte/store";

function createTemplateStore() {
  const { subscribe, set } = writable("");

  set(localStorage.templateFile ?? "");

  return {
    subscribe,
    set,
    save: (value) => {
      set(value);
      localStorage.templateFile = value;
    },
  };
}

export const templates = createTemplateStore();
