import { createFilters } from "./filters";
import { createActions } from "./actions";
import { createImages } from "./images";

export const makeViewerStore = () => {
  return {
    filters: createFilters(),
    actions: createActions(),
    images: createImages(),
  };
};
