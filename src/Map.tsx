
import React,{FC} from 'react';
import {useSelector} from 'react-redux';
import GoogleMap from 'google-map-react';

const Map:FC = ()=> {
   let state = useSelector(state => state);
   let location = state[state.length - 1];
   const Marker = () => <div><img src="./marker.png" alt="" style={{height: 30, width: 30}}/></div>;

   const MapOptions = ():Object => {
      return {
         panControl: false,
         mapTypeControl: false,
         scrollwheel: true,
      };
   };

   return (
      <div style={{height: '400px', width: '500px'}}>
         <GoogleMap
            options={MapOptions}
            bootstrapURLKeys={{
               key: 'XXXX',  //hide to public
               libraries: 'places',
               language: 'en'
            }}
            center={[location.latitude, location.longitude]}
            zoom={location.zoom}
         >
            {state.map(point => {
               return <Marker
                  key={point.key}
                  lat={point.latitude}
                  lng={point.longitude}
               />;
            })}
         </GoogleMap>
      </div>
   );
}

export default Map;