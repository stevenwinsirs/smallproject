import axios from "axios";
import {useDispatch} from 'react-redux';

function useInit():Function {
   const dispatch = useDispatch();
   return ():void => {
      let geo = navigator.geolocation;
      if (geo) {
         geo.getCurrentPosition((res) => {
            let config:Object = {
               method: 'get',
               url: `https://api.timezonedb.com/v2.1/get-time-zone?key=C24TJA7LMLY7&format=xml&by=position&lat=${res.coords.latitude}&lng=${res.coords.longitude}`
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
                        address: 'My Location',
                        latitude: res.coords.latitude,
                        longitude: res.coords.longitude,
                        zoom: 11,
                        checked: false,
                        timeZone: zone[1],
                        localTime: time[1]
                     }
                  });
               });
         });
      } else {
         alert('Your browser not supported');
      }
   };
}

export {useInit};