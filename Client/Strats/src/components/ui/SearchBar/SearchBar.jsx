import { createElement, useEffect, useState } from 'react';
import "../SearchBar/SearchBar.css"
import axios from 'axios';
const MIN_ADDRESS_LENGTH = 3;
const DEBOUNCE_DELAY = 0;

const API_KEY = "341662abfefd4fe7a7d2121f1d802360";

export default function SearchBar() {
    const [currentLocation, setcurrentLocation] = useState('')
    const [data, setData] = useState([]);
    function handleInputChange(e){
        setcurrentLocation(e.target.value);
        console.log(currentLocation);
    }

    function getLocations() {
            if(currentLocation.length < MIN_ADDRESS_LENGTH){
                return false;
            }                                                                                                                                             
        const currentTimeout = setTimeout(() => {                                                                                                                                                                                                                                                           
            const promise = new Promise((resolve, reject) => {
                var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentLocation)}&format=json&limit=5&apiKey=${API_KEY}`;
                fetch(url)
                  .then(response => {
        
                    // check if the call was successful
                    if (response.ok) {
                      response.json().then(data => resolve(data));
                    } else {
                      response.json().then(data => reject(data));
                    }
                  });
              });
              promise.then((data) => {
                // here we get address suggestions
                setData(data.results);
              }, (err) => {
                if (!err.canceled) {
                  console.log(err);
                }
              });
        }, DEBOUNCE_DELAY);

        $(document).on("click", () => {
            
        });
        return () => {
            clearTimeout(currentTimeout);
          };
    }
    useEffect(() => {
        getLocations();
    },[currentLocation])
    return(
        <>
            <div className="autocomplete-container" id="autocomplete-container">
            <div className='input-container'>
                <input onChange={handleInputChange} type='text' placeholder='Enter an address here'/>
                <div className='autocomplete-items'>
                    {data.map((result, index) => {
                        return(
                            <div key={index}>{result.formatted}</div>
                        )
                    })}
                </div>
        </div>
            </div>
        </>
    )
}