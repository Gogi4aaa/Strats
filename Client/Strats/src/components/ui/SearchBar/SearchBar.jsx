import { useEffect, useState } from "react";
import "../SearchBar/SearchBar.css";
const MIN_ADDRESS_LENGTH = 3;
const DEBOUNCE_DELAY = -1000;
const API_KEY = "341662abfefd4fe7a7d2121f1d802360";
import Select from 'react-select'
import axios from "axios";
export default function SearchBar() {
  const [currentLocation, setcurrentLocation] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [categories, setCategories] = useState();
  const [currentLocationInfo, setcurrentLocationInfo] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  function handleInputChange(e) {
    setcurrentLocation(e.target.value);
    console.log(currentLocation);
  }
  function handleAdressClick(result){
    setcurrentLocationInfo(result);
    setcurrentLocation(result.formatted)
  }
  function getLocations() {
    if (currentLocation.length < MIN_ADDRESS_LENGTH) {
      setData([]);
      return false;
    }
    const currentTimeout = setTimeout(() => {
      const promise = new Promise((resolve, reject) => {
        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          currentLocation
        )}&format=json&apiKey=${API_KEY}`;
        fetch(url).then((response) => {
          // check if the call was successful
          if (response.ok) {
            response.json().then((data) => resolve(data));
          } else {
            response.json().then((data) => reject(data));
          }
        });
      });
      promise.then(
        (data) => {
          // here we get address suggestions
          setData(data.results);
          console.log(data)
        },
        (err) => {
          if (!err.canceled) {
            console.log(err);
          }
        }
      );
    }, DEBOUNCE_DELAY);
    return () => {
      clearTimeout(currentTimeout);
    };
  }
  useEffect(() => {
    getLocations();
    console.log(currentLocationInfo)
    console.log(data)
    if(currentLocationInfo != null){
      //url for finding places near the typed place in search bar
    const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${currentLocationInfo.lon},${currentLocationInfo.lat},2000&limit=20&apiKey=${API_KEY}`
    axios.get(url)
    .then(result => {
      //save data for later searching on map
      setSearchData(result.data)
      console.log(result.data)
    })
      }
  }, [currentLocation]);
  return (
    <>
      <div className="autocomplete-container" id="autocomplete-container">
        <div className="input-container input-div">
          <Select options={options} />
          <input
            className="form-control boxed-left"
            onChange={handleInputChange}
            value={currentLocation}
            type="text"
            placeholder="Enter an address here"
          />
          <button className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
          <div className="autocomplete-items">
            {data.map((result, index) => {
              return <div key={index} onClick={() => handleAdressClick(result)}>{result.formatted}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
