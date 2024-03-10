import { StateCreator } from "zustand";

export interface GuestSlice {
    guesCount: number;

    setGuestCount: (guestCount: number) => void;
}


export const createGuestSlice: StateCreator<GuestSlice, [["zustand/devtools", never]]> = (set) => ({
    guesCount: 0,

    setGuestCount: (guestCount) => {
       
        set({ guesCount: guestCount || 0}, false, 'GuestSlice_setGuestCount');
    },
});