import { writable } from "svelte/store";

const filters = {
  desaturate: {
    active: true,
    css: "grayscale(100%)",
  },
  contrast: {
    active: false,
    css: "contrast(1.75)",
  },
  invert: {
    active: false,
    css: "invert(1)",
  },
};

export const createFilters = () => {
  const { subscribe, set, update } = writable(filters);

  const setFilter = (type, active) => {
    return update((n) => {
      const newStore = { ...n };
      newStore[type].active = active;
      return { ...newStore };
    });
  };

  return {
    subscribe,
    set,
    update,
    setFilter,
  };
};
