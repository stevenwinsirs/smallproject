import {createStore} from 'redux';
import alert from 'sweetalert2'

let store = createStore(reducer);

//init default for Toronto, zoom 11
function reducer(data = [{
   google: window.google,
   key: 1,
   address: 'Default',
   latitude: 43.67,
   longitude: -79.4,
   zoom: 11,
   checked: false,
   timeZone: 'AmericaToronto',
   localTime: '',
}], action) {
   let copy = data;
   switch (action.type) {
      case 'ADD_LOCATION':
         let newData = data.slice(0);              //copy data
         let newArr = newData.filter((item) => {
            return item.address === action.res.address;
         });
         if (newArr.length === 0) {
            newData.push(action.res);
         } else {
            alert.fire({
               icon: 'error',
               title: 'Address already on the List',
            }).then(()=>{})
         }
         return data = newData;
      case "DEL_LOCATION":
         let preData = data.slice(0);
         for (let i = 0; i < action.res.length; i++) {
            for (let j = 0; j < preData.length; j++) {
               if (preData[j].key === action.res[i]) {
                  preData.splice(j, 1);
               }
            }
         }
         if (preData.length === 0) {
            alert.fire({
               icon: 'error',
               title: 'Cannot remove all addresses !!!',
            }).then(()=>{
               data = copy
            })
            return data
         } else {
            return data = preData;
         }
      default:
         return data;
   }
}

export default store;