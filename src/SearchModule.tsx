import React, {useEffect, useRef, useState, Fragment} from 'react';
import {useGetTime} from "./hooks/getTime";
import PropTypes from 'prop-types';
import {Button} from 'antd';
import alertfy from "sweetalert2";

function SearchModule(props) {
   const ref = useRef();
   let searchBox = useRef();
   const [value, setValue] = useState('');
   const getTime = useGetTime();

   function fetchData() {
      let places:string = searchBox.current.getPlaces();
      if (typeof places === 'undefined') {
         alertfy.fire({
            icon: 'question',
            title: 'Fuzzy search? press Enter confirm',
         }).then(() => {
         });
         return;
      }
      if (places.length === 0) {
         alertfy.fire({
            icon: 'error',
            title: 'no map Data, try pick on the list below',
         }).then(() => {

         });
         return;
      }
      let latitude:string = places[0].geometry.location.lat();
      let longitude:string = places[0].geometry.location.lng();
      let name:string = places[0].name;
      getTime({latitude, longitude, name});
   }

   const handleChange = (e) => {
      setValue(e.target.value);
   };

   const keyboardSearch = ({keyCode}) => {
      if (keyCode === 13) {
         let v = searchBox.current;
         if (typeof v === 'undefined') {
            return;
         }
         fetchData();
      }
   };

   const handleClick = () => {
      fetchData();
   };


   useEffect(() => {
      if (typeof window.google === 'undefined') {
         console.log('test --- !!');
      } else {
         let input = ref.current;
         searchBox.current = new window.google.maps.places.SearchBox(input);
      }
      // document.addEventListener('keydown', keyboardSearch);
   });

   return <Fragment>
      <input
         {...props}
         ref={ref}
         placeholder="Input name of location"
         value={value}
         type="text"
         onChange={handleChange}
         onKeyDown={keyboardSearch}
         style={{width: 240}}
      />
      <Button type="primary" onClick={handleClick}>Search</Button>
   </Fragment>;
}

// data type
SearchModule.propTypes = {
   placeholder: PropTypes.string,
   onPlacesChanged: PropTypes.func
};

export default SearchModule;
