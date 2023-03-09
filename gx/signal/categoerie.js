import { createSignal } from '@dilane3/gx';
import Vasern from 'vasern';

export const VasernDB = new Vasern({
    schemas : [
        {
            name : 'Categories',
            props : {
                categorie_name : 'string',
                categorie_id : 'int'
            }
        },
        {
            name : 'Items',
            props : {
                item_name : 'string',
                item_id : 'int',
                parent : '#Categories',
                assignedTo : '#Categories',
                price : 'int',
                sale_price : 'int'
            }
        }
]})


const { Categories } = VasernDB

const CategorieSignal = createSignal({
  name: 'categorie',
  state: 0,
  actions: {
    create: (state, payload) => {
        console.log(payload)

        const Data = Categories.insert(payload, save = true)
        console.log(Data)
        return state + 1;
    },

    update: (state, payload) => {
      return state - payload
    }
  }
});

export default CategorieSignal;