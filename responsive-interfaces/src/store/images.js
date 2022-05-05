import { writable } from "svelte/store";

const images = {
  active: 0,
  srcs: ["./images/shrooms1.jpeg", "./images/shrooms2.jpeg"],
};

export const createImages = () => {
  const { subscribe, set, update } = writable(images);

  const setActive = (active) => {
    return update((n) => {
      const newStore = { ...n };
      newStore.active = active;
      return { ...newStore };
    });
  };

  return {
    subscribe,
    set,
    update,
    setActive,
  };
};
