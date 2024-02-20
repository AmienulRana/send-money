import { create } from "zustand";

interface StepState {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

const useStepStore = create<StepState>((set) => ({
  activeStep: 0,
  nextStep: () =>
    set((state) => ({
      activeStep:
        state.activeStep < 4 ? state.activeStep + 1 : state.activeStep,
    })),
  prevStep: () =>
    set((state) => ({
      activeStep:
        state.activeStep > 0 ? state.activeStep - 1 : state.activeStep,
    })),
  resetStep: () =>
    set((state) => ({
      activeStep: 0,
    })),
}));

export default useStepStore;
