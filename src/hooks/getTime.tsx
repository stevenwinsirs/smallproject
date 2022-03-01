import {useDispatch} from 'react-redux';
import axios from "axios";

function useGetTime() {
   const dispatch = useDispatch();
   return (location:Object) => {
      let config:Object = {
         method: 'get',
         url: `https://api.timezonedb.com/v2.1/get-time-zone?key=C24TJA7LMLY7&format=xml&by=position&lat=${location.latitude}&lng=${location.longitude}`
      };
      axios(config)
         .then(function (response) {
            let str = JSON.stringify(response.data);
            let time = str.replaceAll('/', '').split('<formatted>');
            let zone = str.replaceAll('/', '').split('<zoneName>');
            dispatch({
               type: 'ADD_LOCATION',
               res: {
                  key: Date.now(),
                  address: location.name,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  zoom: 11,
                  checked: false,
                  timeZone: zone[1],
                  localTime: time[1]
               }
            });
         });
   };
}

export {useGetTime};