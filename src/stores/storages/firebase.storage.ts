import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'YOUR_FIREBASE_DATABASE_URL';

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      throw Error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    // console.log('setItem', { name, value });

    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: value,
      }).then((res) => res.json());

      return;
    } catch (error) {
      throw Error;
    }
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', { name });
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
