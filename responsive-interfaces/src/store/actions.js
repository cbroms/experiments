import { writable } from "svelte/store";

const actions = {
  filter: {
    lagDuration: 800,
    loading: false,
  },
  switch: {
    lagDuration: 1200,
    loading: false,
  },
  zoom: {
    lagDuration: 2000,
    loading: false,
  },
};

export const createActions = () => {
  return writable(actions);
};
