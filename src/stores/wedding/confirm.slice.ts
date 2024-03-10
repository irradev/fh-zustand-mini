import { StateCreator } from "zustand";

export interface ConfirmSlice {
    isConfirmed: boolean;

    setIsConfirmed: (isConfirmed: boolean) => void;
}

export const createConfirmSlice: StateCreator<ConfirmSlice, [["zustand/devtools", never]]> = (set) => ({
    isConfirmed: false,
    
    setIsConfirmed: (isConfirmed) => set({ isConfirmed }, false, 'ConfirmSlice_setIsConfirmed'),
})