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
  const [category, setCategory] = useState();
  const [currentLocationInfo, setcurrentLocationInfo] = useState(null);
  const options = [
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'accommodation.hotel', label: 'Hotels' },
    { value: 'accommodation.apartment', label: 'Apartaments' },
    { value: 'accommodation.guest_house', label: 'Guest Houses' },
    { value: 'accommodation.hostel', label: 'Hostels' },
    { value: 'accommodation.motel', label: 'Motels' },
    { value: 'activity', label: 'Activity' },
    { value: 'activity.community_center', label: 'Community Centers' },
    { value: 'activity.sport_club', label: 'Sport Clubs' },
    { value: 'airport', label: 'Airports' },
    { value: 'commercial', label: 'Comemercial' },
    { value: 'commercial.supermarket', label: 'Supermarkets' },
    { value: 'commercial.marketplace', label: 'Market Places' },
    { value: 'commercial.shopping_mall', label: 'Shopping Malls' },
    { value: 'commercial.department_store', label: 'Department Stores' },
    { value: 'commercial.elektronics', label: 'Elektronics' },
    { value: 'commercial.outdoor_and_sport', label: 'Outdoor and sport' },
    { value: 'commercial.vehicle', label: 'Vehicles' },
    { value: 'commercial.hobby.games', label: 'Games' },
    { value: 'commercial.hobby.music', label: 'Musics' },
    { value: 'commercial.books', label: 'Books' },
    { value: 'commercial.gift_and_souvenir', label: 'Gifts and souvenirs' },
    { value: 'commercial.tickets_and_lottery', label: 'Tickets and Lottery' },
    { value: 'commercial.clothing', label: 'Clothing' },
    { value: 'commercial.clothing.shoes', label: 'Shoes' },
    { value: 'commercial.clothing.clothes', label: 'Clothes' },
    { value: 'commercial.clothing.sport', label: 'Sport clothing' },
    { value: 'commercial.clothing.men', label: 'Men clothing' },
    { value: 'commercial.clothing.women', label: 'Women clothing' },
    { value: 'commercial.clothing.kids', label: 'Kids clothing' },
    { value: 'commercial.clothing.accessories', label: 'Accessories' },
    { value: 'commercial.garden', label: 'Garden' },
    { value: 'commercial.houseware_and_hardware', label: 'Houseware and Hardware' },
    { value: 'commercial.florist', label: 'Florist' },
    { value: 'commercial.chemist', label: 'Chemist' },
    { value: 'commercial.toy_and_game', label: 'Toys and Games' },
    { value: 'commercial.pet', label: 'Pets' },
    { value: 'commercial.food_and_drink', label: 'Food and drinks' },
    { value: 'commercial.food_and_drink.bakery', label: 'Bakery' },
    { value: 'commercial.second_hand', label: 'Second hand' },
    { value: 'commercial.gas', label: 'Gas stations' },
    { value: 'commercial.weapons', label: 'Weapons' },
    { value: 'commercial.pyrotechnics', label: 'Pyrotechnics' },
    { value: 'commercial.jewelry', label: 'Jewelry' },
    { value: 'commercial.watches', label: 'Watches' },
    { value: 'commercial.antiques', label: 'Antiques' },
    { value: 'catering', label: 'Catering' },
    { value: 'catering.restaurant', label: 'Restaurants' },
    { value: 'catering.fast_food', label: 'Fast food' },
    { value: 'catering.cafe', label: 'Cafe' },
    { value: 'catering.bar', label: 'Bar' },
    { value: 'catering.ice_cream', label: 'Ice cream' },
    { value: 'education', label: 'Education' },
    { value: 'education.school', label: 'Schools' },
    { value: 'education.driving_school', label: 'Driving Schools' },
    { value: 'education.language_school', label: 'language Schools' },
    { value: 'office', label: 'Offices' },
    { value: 'parking', label: 'Parkings' },
    { value: 'pet.shop', label: 'Pet shops' },
    { value: 'pet.veterinary', label: 'Veterinary' },
    { value: 'sport.fitness', label: 'Fitness' },
    { value: 'sport.stadium', label: 'Stadiums' },
    { value: 'public_transport', label: 'Public Transport stations' },
  ]

  //Map functionality
  var map = null;
  var marker, circle, zoomed;
  function initializeMap () {
    map = L.map('map').setView([51.505, -0.09], 13);
    var container = L.DomUtil.get("map");
    if (container != null) {
    container._leaflet_id = null;
    }
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

  navigator.geolocation.watchPosition(success, error);

  }

  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if(marker){
      map.removeLayer(marker);
      map.removeLayer(circle);
    }
    var marker = L.marker([lat, lng]).addTo(map);
    var circle = L.circle([lat, lng], {radius: accuracy }).addTo(map);
    if(!zoomed){
      zoomed = map.fitBounds(circle.getBounds());
    }
    map.setView([lat, lng]);
  }
  function error(err){
    if(err.code == 1){
      alert("Please allow geolocation access!")
    }else{
      alert("Cannot get current location");
    }
  }
  // Map functionality END

  function handleSelectChange(e){
    setCategory(e.value);
  }
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
    initializeMap()
  }, [map])//could be without map here
  useEffect(() => {
    setTimeout(() => {
      getLocations();
    }, 1000)
    
    if(currentLocationInfo != null){
      //url for finding places near the typed place in search bar
    const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${currentLocationInfo.lon},${currentLocationInfo.lat},2000&limit=20&apiKey=${API_KEY}`
    axios.get(url)
    .then(result => {
      //save data for later searching on map
      setSearchData(result.data.features)
      console.log(result.data.features)
    })
      }
  }, [currentLocation]);
  return (
    <>
      <div className="autocomplete-container" id="autocomplete-container">
        <div className="input-container input-div">
          <Select className="select" onChange={handleSelectChange} options={options} />
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
        <div className="map-div">
          <div id="map"></div>
        </div>
      </div>
    </>
  );
}
