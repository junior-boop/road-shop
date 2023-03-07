import { createSignal } from '@dilane3/gx';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('database.db')

const CategorieSignal = createSignal({
  name: 'categorie',
  state: 0,
  actions: {
    create: (state, payload) => {

        console.log(payload)

        
    
        // db.transaction( tx => {
        //     tx.executeSql('SELECT * FROM categories', [], 
        //         (obj, resultSet) => {state = resultSet.rows._array ; console.log(resultSet.rows._array)},
        //         (obj, error) => console.log(error.message)
        //     )
        // });

        db.transaction( tx => {
            tx.executeSql('INSERT INTO categories(categorie_name) values (?)', [payload], 
              (obj, resultSet) => {console.log(resultSet.rows._array)},
              (obj, error) => console.log(error.message))
        });

        const new_state = async function(){
            setTimeout(() => {
              
            }, 500)

          return await state
        };
        return state.length + 1;
    },

    update: (state, payload) => {
      return state - payload
    }
  }
});

export default CategorieSignal;