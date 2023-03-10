import { createSignal } from '@dilane3/gx';
import DataCache from '../../database/schema';


const db = new DataCache('Categories')
const Items = new DataCache('Items')

const CategorieSignal = createSignal({
  name: 'categorie',
  state: '',
  actions: {
    create: async (state, payload) => {
        state = await db.SetItem(payload)
        return state ;
    },

    update: (state, payload) => {
      return state - payload
    },

    save_item : async (state, payload) => {
        state = await Items.SetItem(payload)
        return state ;
    }
  }
});

export default CategorieSignal;