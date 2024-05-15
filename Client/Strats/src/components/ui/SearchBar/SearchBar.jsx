import {   useState } from 'react';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
const API_KEY = "341662abfefd4fe7a7d2121f1d802360";

export default function SearchBar() {
    const [currentLocation, setCurrentLocation] = useState('');
    function onPlaceSelect() {
        setCurrentLocation(4)
    }
    function handleClick() {
        console.log(5)
        console.log(currentLocation)
    }
    return(
        <>
        <GeoapifyContext apiKey={API_KEY}>
            <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here"
            value={currentLocation}
            onUserInput={onPlaceSelect}
            suggestionsChange={onPlaceSelect}
            
            />
        </GeoapifyContext>
            <button onClick={handleClick}>Test</button>
        </>
    )
}