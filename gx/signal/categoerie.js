import { createSignal } from '@dilane3/gx';
import DataCache from '../../database/schema';


const db = new DataCache('Categories')

const CategorieSignal = createSignal({
  name: 'categorie',
  state: '',
  actions: {
    create: async (state, payload) => {
        state = await db.SetItem(payload)
        return state ;
    },
    getElement: async (state) => {
      state = await db.GetItem()
      return state
    },
    update: (state, payload) => {
      return state - payload
    }
  }
});

export default CategorieSignal;