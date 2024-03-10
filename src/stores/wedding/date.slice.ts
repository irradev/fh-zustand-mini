import { StateCreator } from "zustand";

type FormatDates = 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD';
type FormatHours = 'HH:MM';

export interface DateSlice {
    eventDate: Date;

    setEventDate: (parcialDate: string) => void;
    setEventTime: (eventTime: string) => void;


    getDate: (format?: FormatDates) => string;
    getTime: (format?: FormatHours) => string;
}


export const createDateSlice: StateCreator<DateSlice, [["zustand/devtools", never]]> = (set, get) => ({
    eventDate: new Date(),

    setEventDate: (parcialDate) => {
        const date = new Date(parcialDate);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(get().eventDate);
        newDate.setFullYear(year);
        newDate.setMonth(month);
        newDate.setDate(day);

        set({ eventDate: newDate }, false, 'DateSlice_setEventDate');
    },
    setEventTime: (eventTime) => {
       
        const [hours, minutes] = eventTime.split(':');
        const newDate = new Date(get().eventDate);
        newDate.setHours(parseInt(hours));
        newDate.setMinutes(parseInt(minutes));
        set({ eventDate: newDate }, false, 'DateSlice_setEventTime');
    },

    getDate: () => {
        return get().eventDate.toISOString().split('T')[0];
    },
    getTime: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },
});