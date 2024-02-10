import { defineStore } from "pinia";

export const usePassStore = defineStore({
  id: "pass",
  state: () => {
    const storedPassToken = localStorage.getItem("passToken");

    return {
      passToken: storedPassToken ? storedPassToken : null,
    };
  },
});
