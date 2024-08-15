import create from "zustand";

const useStore = create((set) => ({
  selectedButtons: [],
  setSelectedButtons: (buttonName) =>
    set((state) => {
      const isSelected = state.selectedButtons.includes(buttonName);
      return {
        selectedButtons: isSelected
          ? state.selectedButtons.filter((name) => name !== buttonName)
          : [...state.selectedButtons, buttonName],
      };
    }),
}));

export default useStore;
