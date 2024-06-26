import "../Map/Map.css";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { SideBarContext } from "../../Contexts/MapContext";

export default function Map({searchData, currentLocationInfo, map, marker, circle, addPoints, mapHeight}){
    
    const isMenuOpen = useContext(SideBarContext)

    useEffect(() => {
        MapConfiguration();
    }, [searchData]);

    
    function MapConfiguration(){
    var array = [];
    if (searchData.length > 0) {
        array = searchData.map((destination) => {
        return {
            coords: {
            latitude: destination.geometry.coordinates[1],
            longitude: destination.geometry.coordinates[0],
            },
            data:{
                street: destination.properties.street,
                postcode: destination.properties.postcode,
                country: destination.properties.country,
                city: destination.properties.city,
                categories: destination.properties.categories.map(x => {
                    return {name: x}
                }),
                
            }
        };
        });
        console.log(array);
        addPoints(array);
    } else {
        if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
        }
        if (currentLocationInfo != null) {
        circle = L.circle([currentLocationInfo.lat, currentLocationInfo.lon], {
            radius: 3000,
        }).addTo(map);
        marker = L.marker([
            currentLocationInfo.lat,
            currentLocationInfo.lon,
        ]).addTo(map);
        map.setView([currentLocationInfo.lat, currentLocationInfo.lon]);
        toast.info(
            "We couldn't find anything in your category at the specified location!"
        );
        }
    }
    }  
    return(
        <div className={`map-div ${mapHeight} ${isMenuOpen ? "map-navbar-open" : "map-navbar-close"}`}>
          <div id="map"></div>
        </div>
    )
}