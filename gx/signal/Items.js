import { createSignal } from '@dilane3/gx';
import DataCache from '../../database/schema';

const Items = new DataCache('Items')

const CategorieSignal = createSignal({
  name: 'items',
  state: '',
  actions: {
        save_item : async (state, payload) => {
        state = await Items.SetItem(payload)
        return state ;
    }
  }
});

export default CategorieSignal;