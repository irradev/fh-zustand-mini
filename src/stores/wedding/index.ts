
import {create} from 'zustand';
import { type PersonSlice, createPersonSlice } from './person.slice';
import { type GuestSlice, createGuestSlice } from './guest.slice';
import { type ConfirmSlice, createConfirmSlice } from './confirm.slice';
import { type DateSlice, createDateSlice } from './date.slice';
import { devtools, persist } from 'zustand/middleware';





// Crear el store
type ShareState = PersonSlice & GuestSlice & ConfirmSlice & DateSlice;

// ? Si se usa el persist se debe convertir la propiedad del tipo Date a primitivo
// ? ya que el localStorage guardará unicamente objetos convertidos a strings (stringify).
// ? Por lo tanto el objeto Date (objeto anidado) no funcionará  y lanzará un error en la aplicación.
// ? new Date().getTime() <-- podemos convertirlo a tipo number
// ? pero hay que trabajar en un formateo de fechas porque devuelve una diferencia de 6 horas.
export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        // persist(
            (...a) => ({
                ...createPersonSlice(...a),
                ...createGuestSlice(...a),
                ...createConfirmSlice(...a),
                ...createDateSlice(...a),
            }), 
        //     { name: 'wedding-store' }
        // )
    )
);
