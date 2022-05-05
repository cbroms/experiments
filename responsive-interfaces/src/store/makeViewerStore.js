import { writable } from "svelte/store";

export const makeViewerStore = () => {
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
  const actions = {
    filter: {
      lagDuration: 800,
      loading: false,
    },
    switch: {
      lagDuration: 800,
      loading: false,
    },
    zoom: {
      lagDuration: 800,
      loading: false,
    },
  };

  const active = 1;

  const createFilters = () => {
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

  return {
    filters: createFilters(),
    actions: writable(actions),
    active: writable(active),
  };
};
