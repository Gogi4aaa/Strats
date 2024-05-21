// weather api documentation at https://open-meteo.com/en/docs

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../ui/Input/Input.jsx";
import Select from "react-select";
import Map from "../../components/Map/Map.jsx";
import {
	convertTimeStampToUnixTime,
	formatDateTime,
	getMonthDay,
	getTime,
	convertToCelsius,
	getWeatherInterpretation,
	getIsDaytime,
	getWindDirection,
	getTempColor,
	filterMapCategory,
} from "../../helpers.js";
import "./Weather.scss";
import Slideshow from "../Carousel/Carousel.jsx";
import { SideBarContext } from "../../Contexts/MapContext.jsx";
//constants
const MIN_ADDRESS_LENGTH = 3;
const DEBOUNCE_DELAY = -1000;
const API_KEY = "341662abfefd4fe7a7d2121f1d802360";
const greenIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});
var map, marker, circle, zoomed, myMarker;
var viewCount = 0;
var allMarkers = [];
export default function Weather() {
	/* API vars */
	const url = "https://api.open-meteo.com/v1/forecast";
	const currWeather = "current_weather=true";
	const hourly = "hourly=temperature_2m,weathercode";

	// can add a useState check to see if user wants imperial or metric units
	const tempUnit = "temperature_unit=fahrenheit";
	const windUnit = "windspeed_unit=mph";
	const precipUnit = "precipitation_unit=inch";
	const forecastDays = "forecast_days=7";
	/* end API Vars */

	const imagePath = "weather-icons/animated";

	const myIcons = {
		search: "fa-solid fa-magnifying-glass",
	};
	/* get lat/lng from browser detect */
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [tz, setTz] = useState(null);

	// get api url
	const APIURL = `${url}?latitude=${lat}&longitude=${lng}&timezone=${tz}&${forecastDays}&${currWeather}&${hourly}&${tempUnit}&${windUnit}&${precipUnit}`;
	/* end get lat/lng from browser detect */

	// data objects
	const [resdata, setData] = useState(null);

	//all map and autocomplete searchbar states
	const [currentLocation, setcurrentLocation] = useState("");
	const [locationsData, setLocationsData] = useState([]);
	const [currentLocationInfo, setcurrentLocationInfo] = useState(null);
	const [searchData, setSearchData] = useState([]);
	const [category, setCategory] = useState();
	const [isSelectClicked, setIsSelectClicked] = useState(false);
	const options = [
		{ value: "accommodation", label: "Accommodation" },
		{ value: "accommodation.hotel", label: "Hotels" },
		{ value: "accommodation.apartment", label: "Apartaments" },
		{ value: "accommodation.guest_house", label: "Guest Houses" },
		{ value: "accommodation.hostel", label: "Hostels" },
		{ value: "accommodation.motel", label: "Motels" },
		{ value: "activity", label: "Activity" },
		{ value: "activity.community_center", label: "Community Centers" },
		{ value: "activity.sport_club", label: "Sport Clubs" },
		{ value: "airport", label: "Airports" },
		{ value: "commercial", label: "Comemercial" },
		{ value: "commercial.supermarket", label: "Supermarkets" },
		{ value: "commercial.marketplace", label: "Market Places" },
		{ value: "commercial.shopping_mall", label: "Shopping Malls" },
		{ value: "commercial.department_store", label: "Department Stores" },
		{ value: "commercial.elektronics", label: "Elektronics" },
		{ value: "commercial.outdoor_and_sport", label: "Outdoor and sport" },
		{ value: "commercial.vehicle", label: "Vehicles" },
		{ value: "commercial.hobby.games", label: "Games" },
		{ value: "commercial.hobby.music", label: "Musics" },
		{ value: "commercial.books", label: "Books" },
		{ value: "commercial.gift_and_souvenir", label: "Gifts and souvenirs" },
		{ value: "commercial.tickets_and_lottery", label: "Tickets and Lottery" },
		{ value: "commercial.clothing", label: "Clothing" },
		{ value: "commercial.clothing.shoes", label: "Shoes" },
		{ value: "commercial.clothing.clothes", label: "Clothes" },
		{ value: "commercial.clothing.sport", label: "Sport clothing" },
		{ value: "commercial.clothing.men", label: "Men clothing" },
		{ value: "commercial.clothing.women", label: "Women clothing" },
		{ value: "commercial.clothing.kids", label: "Kids clothing" },
		{ value: "commercial.clothing.accessories", label: "Accessories" },
		{ value: "commercial.garden", label: "Garden" },
		{ value: "commercial.houseware_and_hardware", label: "Houseware and Hardware" },
		{ value: "commercial.florist", label: "Florist" },
		{ value: "commercial.chemist", label: "Chemist" },
		{ value: "commercial.toy_and_game", label: "Toys and Games" },
		{ value: "commercial.pet", label: "Pets" },
		{ value: "commercial.food_and_drink", label: "Food and drinks" },
		{ value: "commercial.food_and_drink.bakery", label: "Bakery" },
		{ value: "commercial.second_hand", label: "Second hand" },
		{ value: "commercial.gas", label: "Gas stations" },
		{ value: "commercial.weapons", label: "Weapons" },
		{ value: "commercial.pyrotechnics", label: "Pyrotechnics" },
		{ value: "commercial.jewelry", label: "Jewelry" },
		{ value: "commercial.watches", label: "Watches" },
		{ value: "commercial.antiques", label: "Antiques" },
		{ value: "catering", label: "Catering" },
		{ value: "catering.restaurant", label: "Restaurants" },
		{ value: "catering.fast_food", label: "Fast food" },
		{ value: "catering.cafe", label: "Cafe" },
		{ value: "catering.bar", label: "Bar" },
		{ value: "catering.ice_cream", label: "Ice cream" },
		{ value: "education", label: "Education" },
		{ value: "education.school", label: "Schools" },
		{ value: "education.driving_school", label: "Driving Schools" },
		{ value: "education.language_school", label: "language Schools" },
		{ value: "office", label: "Offices" },
		{ value: "parking", label: "Parkings" },
		{ value: "pet.shop", label: "Pet shops" },
		{ value: "pet.veterinary", label: "Veterinary" },
		{ value: "sport.fitness", label: "Fitness" },
		{ value: "sport.stadium", label: "Stadiums" },
		{ value: "public_transport", label: "Public Transport stations" },
	];
	var oneTimeMapInitalization = 0;
	//END all map and autocomplete searchbar states

	/* call the API */
	function getForecast() {
		axios({
			method: "GET",
			url: APIURL,
		})
			.then((response) => {
				setData((prevData) => {
					return response.data;
				});
				// getWeatherInterpretation(response.data.current_weather.weathercode, getIsDaytime(convertTimeStampToUnixTime(response.data.current_weather.time)));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function getLatLng(URL) {
		axios({
			method: "GET",
			url: URL,
		})
			.then((response) => {
				// console.log(response);
				setLat(response.data[0].lat);
				setLng(response.data[0].lon);

				fetch(
					`https://api.geoapify.com/v1/geocode/reverse?lat=${response.data[0].lat}&lon=${response.data[0].lon}&format=json&apiKey=251fdb5c46734306b119d1c7e8a6e21b`
				)
					.then((response) => response.json())
					.then((data) => {
						if (data.results && data.results.length > 0) {
							setTz(data.results[0].timezone.name);
						} else {
							toast.error("Please enter a valid location.");
						}
					});
			})
			.catch((error) => {
				toast.error("Please enter a valid location.");
			});
	}

	//contextSideBar Value
	var isShowMenu = useContext(SideBarContext);

	const days = [];
	const forecastData = [];
	const daysData = [];
	const [clearTimer, setClearTimer] = useState(false);

	useEffect(() => {
		if (lat !== null && lng !== null && tz !== null) {
			let timer = setInterval(() => {
				setClearTimer(false);
				getForecast();
			}, 30000 /* 5 minutes * 60 seconds * 1000 milliseconds */);
			getForecast(); // Call 1 time, at start

			if (clearTimer) {
				clearInterval(timer);
			}
		}
	}, [lat, lng, tz]);
	/* end call the API */

	useEffect(() => {
		if (resdata !== null) {
			let numrows = resdata.hourly.time.length;

			let prevDay,
				currDay = "";

			for (let i = 0; i < numrows; i++) {
				let index = i;
				let time = getTime(convertTimeStampToUnixTime(resdata.hourly.time[i]));
				let unformatted_time = resdata.hourly.time[i];
				let temp = resdata.hourly.temperature_2m[i];
				let code = resdata.hourly.weathercode[i];

				currDay = getMonthDay(convertTimeStampToUnixTime(resdata.hourly.time[i]));

				if (prevDay !== currDay) {
					days.push(currDay);
					prevDay = currDay;
				}

				forecastData.push({
					currDay,
					index,
					time,
					unformatted_time,
					temp,
					code,
				});
			}

			for (let i = 0; i < days.length; i++) {
				let day = days[i];
				let dayData = [];
				for (let j = 0; j < forecastData.length; j++) {
					if (j % 3 === 0) {
						let data = forecastData[j];
						if (day === data.currDay) {
							let index = data.index;
							let time = data.time;
							let unformatted_time = data.unformatted_time;
							let temp = data.temp;
							let code = data.code;
							dayData.push({
								currDay,
								index,
								time,
								unformatted_time,
								temp,
								code,
							});
						}
					}
				}
				daysData.push({ day, dayData });
			}
		}
	}, [resdata]);

	/* set html to display from results */
	const [result, setResult] = useState(null);

	useEffect(() => {
		if (resdata !== null) {
			// console.log(resdata);
			let interpretation = getWeatherInterpretation(
				resdata.current_weather.weathercode,
				getIsDaytime(convertTimeStampToUnixTime(resdata.current_weather.time))
			);
			setResult(
				<>
					<div>
						<div>
							<div>
								{formatDateTime(
									convertTimeStampToUnixTime(resdata.current_weather.time)
								)}
							</div>
						</div>
						<div
							style={{
								color: getTempColor(resdata.current_weather.temperature),
							}}>
							{resdata.current_weather.temperature}
							{resdata.current_weather_units.temperature}
							&nbsp; ({convertToCelsius(resdata.current_weather.temperature)}
							&deg;C)
						</div>
						<div className='current-weather-image-and-text'>
							<img
								className='current-weather-image'
								src={`${imagePath}/${interpretation.icon}.svg`}
							/>
							<div
								className='current-weather-text'
								style={{
									color: getTempColor(resdata.current_weather.temperature),
								}}>
								&nbsp;
							</div>
						</div>
					</div>
					<div>
						Wind: {resdata.current_weather.windspeed}
						{resdata.current_weather_units.windspeed}
						&nbsp;
						{getWindDirection(resdata.current_weather.winddirection)}
					</div>
					<Slideshow className='slideshow' items={daysData} />
				</>
			);
		}
	}, [resdata]);
	/* end set html to display from results */

	//map locations
	useEffect(() => {
		if (oneTimeMapInitalization == 0) {
			initializeMap();
			oneTimeMapInitalization++;
		}
	}, []);
	useEffect(() => {
		setTimeout(() => {
			getLocations();
		}, 1000);
	}, [currentLocation]);
	//end map locations
	function getLocation2() {
		getLatLng(
			`https://geocode.maps.co/search?q=${currentLocation}&api_key=664170165e212689634179wro17f9c9`
		);
	}

	function keyDownHandler(event) {
		let key = event.key;

		if (key === "Enter") {
			clearAndGetLocation();
		}
	}

	function clearAndGetLocation() {
		setClearTimer(true);
		getLocation2();
		if (category && currentLocation) {
			viewCount = 0;
			findSearchedData();
		}
		if (!category) {
			toast.warn("You have not entered a category!");
		}
		if (!currentLocation) {
			toast.warning("You have not entered a location!");
		}
	}

	// Map functionality START
	function initializeMap() {
		map = L.map("map").setView([51.513, -0.09], 13);
		var container = L.DomUtil.get("map");
		if (container != null) {
			container._leaflet_id = null;
		}
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(map);
		navigator.geolocation.getCurrentPosition(success, error);
	}
	function success(pos) {
		const lat = pos.coords.latitude;
		const lng = pos.coords.longitude;
		const accuracy = pos.coords.accuracy;

		if (marker) {
			map.removeLayer(marker);
			map.removeLayer(circle);
		}
		marker = L.marker([lat, lng]).addTo(map);
		circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
		if (!zoomed) {
			zoomed = map.fitBounds(circle.getBounds());
		}
		map.setView([lat, lng], 13);
	}
	function error(err) {
		if (err.code == 1) {
			const geoAlertInteraction = localStorage.getItem("geo-alert");
			if (!geoAlertInteraction) {
				alert("Please allow geolocation access for optimal experience");
				localStorage.setItem("geo-alert", "true");
			}
		} else {
			alert("Cannot get current location");
		}
	}
	function addPointsOnMap(array) {
		if (marker) {
			map.removeLayer(marker);
			map.removeLayer(circle);
		}
		if (Object.keys(array).length == 0) {
			circle = L.circle([currentLocationInfo.lat, currentLocationInfo.lon], {
				radius: 3000,
			}).addTo(map);
			marker = L.marker([currentLocationInfo.lat, currentLocationInfo.lon]).addTo(map);
			map.setView([lat, lng]);
		} else {
			allMarkers = [];
			array.map((pos) => {
				if (viewCount <= 1) viewCount++;
				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				var accommodationCount = 0;
				var activityCount = 0;
				var commercialCount = 0;
				var cateringCount = 0;
				var educationCount = 0;
				var petCount = 0;
				var stadiumCount = 0;
				var fitnessCount = 0;
				pos.data.categories.map((category) => {
					if (category.name.includes("accommodation")) {
						accommodationCount++;
					} else if (category.name.includes("activity")) {
						activityCount++;
					} else if (category.name.includes("commercial")) {
						commercialCount++;
					} else if (category.name.includes("catering")) {
						cateringCount++;
					} else if (category.name.includes("education")) {
						educationCount++;
					} else if (category.name.includes("pet")) {
						petCount++;
					} else if (category.name.includes("stadium")) {
						stadiumCount++;
					} else if (category.name.includes("fitness")) {
						fitnessCount++;
					} else {
						pos.data.categories = pos.data.categories.filter(
							(item) => item.name != category.name
						);
					}
				});

				pos.data.categories.map((key) => {
					if (accommodationCount > 1) {
						if (key.name.includes("accommodation")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							accommodationCount--;
						}
					} else if (activityCount > 1) {
						if (key.name.includes("activity")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							activityCount--;
						}
					} else if (commercialCount > 1) {
						if (key.name.includes("commercial")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							commercialCount--;
						}
					} else if (cateringCount > 1) {
						if (key.name.includes("catering")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							cateringCount--;
						}
					} else if (educationCount > 1) {
						if (key.name.includes("education")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							educationCount--;
						}
					} else if (petCount > 1) {
						if (key.name.includes("pet")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							petCount--;
						}
					} else if (stadiumCount > 1) {
						if (key.name.includes("stadium")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							stadiumCount--;
						}
					} else if (fitnessCount > 1) {
						if (key.name.includes("fitness")) {
							pos.data.categories = pos.data.categories.filter(
								(item) => item.name != key.name
							);
							fitnessCount--;
						}
					} else {
						pos.data.categories = pos.data.categories.filter(
							(item) => item.name != undefined
						);
					}
				});
				myMarker = L.marker([lat, lng], { icon: greenIcon }).addTo(map);
				var textForPopup = `<b>${pos.data.street}</b><br><h5>${pos.data.postcode} ${
					pos.data.city
				}, ${pos.data.country}</h5>${pos.data.categories.map(
					(x) =>
						`<div style="display:flex;justify-content:center;align-items:center;">${filterMapCategory(
							x.name
						)}</div>`
				)}`;
				myMarker.bindPopup(textForPopup); //here
				allMarkers.push(myMarker);
				if (viewCount == 1) {
					circle = L.circle([currentLocationInfo.lat, currentLocationInfo.lon], {
						radius: 3000,
					}).addTo(map);
					map.setView([currentLocationInfo.lat, currentLocationInfo.lon]);
				}
			});
		}
	}
	// Map functionality END
	//map methods
	function handleInputChange(e) {
		setcurrentLocation(e.target.value);
	}
	function handleAdressClick(result) {
		setcurrentLocationInfo(result);
		setcurrentLocation(result.formatted);
	}
	function handleSelectChange(e) {
		setCategory(e.value);
	}
	function getLocations() {
		if (currentLocation.length < MIN_ADDRESS_LENGTH) {
			setLocationsData([]);
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
					setLocationsData(data.results);
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
	function findSearchedData() {
		if (currentLocationInfo != null && category != null) {
			//url for finding places near the typed place in search bar
			const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${currentLocationInfo.lon},${currentLocationInfo.lat},2000&limit=20&apiKey=${API_KEY}`;

			//delete markers from the map
			allMarkers.map((x) => {
				map.removeLayer(x);
			});
			axios.get(url).then((result) => {
				//save data for later searching on map
				if (result.data.features.length == 0) {
					setSearchData([]);
				} else {
					setSearchData(result.data.features);
				}
			});
		}
	}
	return (
		<>
			<div className='autocomplete-container mt-4' id='autocomplete-container'>
				<div className='input-container input-div'>
					<Select
						onMenuOpen={() => {
							setIsSelectClicked(true);
						}}
						onMenuClose={() => {
							setIsSelectClicked(false);
						}}
						className='select select-options'
						onChange={handleSelectChange}
						options={options}
					/>
					<Input
						onChange={handleInputChange}
						value={currentLocation}
						className='form-control boxed-left'
						type='text'
						placeholder='Enter a location'
						onKeyDown={keyDownHandler}
					/>
					<button className='search-button' onClick={clearAndGetLocation}>
						<i className={myIcons.search}></i>
					</button>
					<div className='autocomplete-items'>
						{locationsData.map((result, index) => {
							return (
								<div key={index} onClick={() => handleAdressClick(result)}>
									{result.formatted}
								</div>
							);
						})}
					</div>
				</div>
				<Map
					searchData={searchData}
					viewCount={viewCount}
					allMarkers={allMarkers}
					currentLocationInfo={currentLocationInfo}
					map={map}
					marker={marker}
					circle={circle}
					addPoints={addPointsOnMap}
					mapHeight={
						isSelectClicked
							? "map-select-open-height"
							: "map-select-close-height" && result != null
							? "map-weather-open-height"
							: "map-weather-close-height"
					}
				/>
			</div>
			<div
				className={`current-weather ${
					isShowMenu ? "weather-navbar-open" : "weather-navbar-close"
				}`}>
				{result !== null && <div>{result}</div>}
			</div>
		</>
	);
}
