import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { firebaseStorage } from '../storages/firebase.storage';
// import { logger } from '../middlewares/logger.middleware';
import { customSessionStorage } from '../storages/session.storage';
import { useWeddingBoundStore } from '../wedding';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const pesonStore: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) =>
    set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) =>
    set({ lastName: value }, false, 'setLastName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  // logger(
  devtools(
    persist(pesonStore, {
      name: 'person-storage',
      // storage: firebaseStorage,
      storage: customSessionStorage,
    })
  )
  // )
);

// Acutalizar otro store
// * Solo tener cuidado de no hacer dependencias cíclicas
usePersonStore.subscribe((nexState /*prevState*/) => {
  // console.log({ nexState, prevState });

  const { firstName, lastName } = nexState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
