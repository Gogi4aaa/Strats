function convertTimeStampToUnixTime(timestamp) {
    // Converts a timestamp to Unix Time
    return new Date(timestamp);
}

function formatDateTime(dt) {
    // Converts a Unix Time timestamp to a human-readable string

    var strTime = getTime(dt);

    return (
        dt.getMonth() + 1 + '/' + 
        dt.getDate() + '/' + 
        dt.getFullYear() + ' ' +
        strTime
    )
}

function getMonthDay(dt) {
    return dt.getMonth() + 1 + '/' + dt.getDate();
}

function getTime(dt) {
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
}

function convertToCelsius(temperature) {
    var celsius = (temperature - 32) * 5/9;
    return celsius.toFixed(2);
}

function getWeatherInterpretation(code, isDaytime) {
    // console.log(code + '  ' + isDaytime);
    switch(code) {
        case 0: return({text: 'Clear Sky', icon: isDaytime ? 'clear-day' : 'clear-night'}); break;
        case 1: return({text: 'Mainly Clear', icon: isDaytime ? 'cloudy-1-day' : 'cloudy-1-night'}); break;
        case 2: return({text: 'Partly Cloudy', icon: isDaytime ? 'cloudy-2-day' : 'cloudy-2-night'}); break;
        case 3: return({text: 'Overcast', icon: isDaytime ? 'cloudy-3-day' : 'cloudy-3-night'}); break;
        case 45: return({text: 'Fog', icon: isDaytime ? 'fog-day' : 'fog-night'}); break;
        case 45: return({text: 'Depositing Rime Fog', icon: isDaytime ? 'fog-day' : 'fog-night'}); break;
        case 51: return({text: 'Light Drizzle', icon: isDaytime ? 'rainy-1-day' : 'rainy-1-night'}); break;
        case 53: return({text: 'Moderate Drizzle', icon: isDaytime ? 'rainy-2-day' : 'rainy-2-night'}); break;
        case 55: return({text: 'Dense Drizzle', icon: isDaytime ? 'rainy-3-day' : 'rainy-3-night'}); break;
        case 56: return({text: 'Light Freezing Drizzle', icon: isDaytime ? 'rain-and-sleet-mix' : 'rain-and-sleet-mix'}); break;
        case 57: return({text: 'Dense Freezing Drizzle', icon: isDaytime ? 'rain-and-sleet-mix' : 'rain-and-sleet-mix'}); break;
        case 61: return({text: 'Slight Rain', icon: isDaytime ? 'rainy-1-day' : 'rainy-1-night'}); break;
        case 63: return({text: 'Moderate Rain', icon: isDaytime ? 'rainy-2-day' : 'rainy-2-night'}); break;
        case 65: return({text: 'Heavy Rain', icon: isDaytime ? 'rainy-3-day' : 'rainy-3-night'}); break;
        case 66: return({text: 'Light Freezing Rain', icon: isDaytime ? 'rain-and-sleet-mix' : 'rain-and-sleet-mix'}); break;
        case 67: return({text: 'Heavy Freezing Rain', icon: isDaytime ? 'rain-and-sleet-mix' : 'rain-and-sleet-mix'}); break;
        case 71: return({text: 'Slight Snow Fall', icon: isDaytime ? 'snowy-1-day' : 'snowy-1-night'}); break;
        case 73: return({text: 'Moderate Snow Fall', icon: isDaytime ? 'snowy-2-day' : 'snowy-2-night'}); break;
        case 75: return({text: 'Heavy Snow Fall', icon: isDaytime ? 'snowy-3-day' : 'snowy-3-night'}); break;
        case 77: return({text: 'Snow Grains', icon: isDaytime ? 'snowy-1' : 'snowy-1'}); break;
        case 80: return({text: 'Slight Rain Showers', icon: isDaytime ? 'rainy-1-day' : 'rainy-1-night'}); break;
        case 81: return({text: 'Moderate Rain Showers', icon: isDaytime ? 'rainy-2-day' : 'rainy-3-night'}); break;
        case 82: return({text: 'Violent Rain Showers', icon: isDaytime ? 'rainy-3-day' : 'rainy-3-night'}); break;
        case 85: return({text: 'Slight Snow Showers', icon: isDaytime ? 'snowy-1-day' : 'snowy-1-night'}); break;
        case 86: return({text: 'Heavy Snow Showers', icon: isDaytime ? 'snowy-3-day' : 'snowy-3-night'}); break;
        case 95: return({text: 'Slight or Moderate Thunderstorm', icon: isDaytime ? 'scattered-thunderstorms-day' : 'scattered-thunderstorms-night'}); break;
        case 96: return({text: 'Thunderstorm with Slight Hail', icon: isDaytime ? 'scattered-thunderstorms-day' : 'scattered-thunderstorms-night'}); break;
        case 99: return({text: 'Thunderstorm with Heavy Hail', icon: isDaytime ? 'scattered-thunderstorms-day' : 'scattered-thunderstorms-night'}); break;
    }
}

/* Pretty functions */
function getIsDaytime(today) {
    const hour = today.getHours();
    if (hour >= 6 && hour <= 18) {
        return true;
    } else {
        return false;
    }
}

function getWindDirection(code) {
    if (code === 0 || code === 360) {
        return 'E';
    } else if (code < 90) {
        return 'NE';
    } else if (code === 90) {
        return 'N';
    } else if (code < 180) {
        return 'NW'; 
    } else if (code === 180) {
        return 'W';
    } else if (code < 270) {
        return 'SW';
    } else if (code === 270) {
        return 'S';
    } else if (code < 360) {
        return 'SE';
    } else {
        return 'N/A';
    };
};

function getTempColor(temp) {
    if (temp >= 72) return 'red';
    if (temp >= 64 && temp < 72) return 'orangered';
    if (temp >= 50 && temp < 64) return 'goldenrod';
    if (temp >= 40 && temp < 50) return 'steelblue';
    if (temp < 40) return 'blue';
}
/* end Pretty functions */
var styles = {
    all: {
    width: '30px',
    height: '30px',
    border: '1px solid ',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    },
    accommodation: {
        icon: '<i class="fa-solid fa-bed"></i>',
        background: '#C4A484',
    },
    activity: {
        icon: '<i class="fa-solid fa-person-running"></i>',
        background: 'lightgreen'
    },
    airport: {
        icon: '<i class="fa-solid fa-plane"></i>',
        background: 'lightblue'
    },
    commercial: {
        icon: '<i class="fa-solid fa-store"></i>',
        background: '#FF999C'
    },
    catering: {
        icon: '<i class="fa-solid fa-utensils"></i>',
        background: 'lightgreen'
    },
    education: {
        icon: '<i class="fa-solid fa-user-graduate"></i>',
        background: '#FFD580'
    },
    office: {
        icon: '<i class="fa-regular fa-building"></i>',
        background: '#59788E'
    },
    parking: {
        icon: '<i class="fa-solid fa-square-parking"></i>',
        background: 'Golden'
    },
    pet: {
        icon: '<i class="fa-solid fa-dog"></i>',
        background: '#C4A484'
    },
    stadium: {
        icon: '<i class="fa-solid fa-person-running"></i>',
        background: 'lightgreen'
    },
    fitness: {
        icon: '<i class="fa-solid fa-dumbbell"></i>',
        background: 'lightgreen'
    },
    public_transport: {
        icon: '<i class="fa-solid fa-bus"></i>',
        background: 'lightblue'
    },
}
var categoriesIcons = {
    accommodation: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.accommodation.background}; background: ${styles.accommodation.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.accommodation.icon}</div>`,
    activity: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.activity.background}; background: ${styles.activity.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.activity.icon}</div>`,
    airport: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.airport.background}; background: ${styles.airport.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.airport.icon}</div>`,
    commercial: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.commercial.background}; background: ${styles.commercial.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.commercial.icon}</div>`,
    catering: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.catering.background}; background: ${styles.catering.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.catering.icon}</div>`,
    education: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.education.background}; background: ${styles.education.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.education.icon}</div>`,
    office: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.office.background}; background: ${styles.office.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.office.icon}</div>`,
    parking: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.parking.background}; background: ${styles.parking.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.parking.icon}</div>`,
    pet: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.pet.background}; background: ${styles.pet.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.pet.icon}</div>`,
    stadium: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.stadium.background}; background: ${styles.stadium.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.stadium.icon}</div>`,
    fitness: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.fitness.background}; background: ${styles.fitness.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.fitness.icon}</div>`,
    public_transport: `<div style='width: ${styles.all.width}; height: ${styles.all.height}; border: ${styles.all.border + styles.public_transport.background}; background: ${styles.public_transport.background}; border-radius: ${styles.all.borderRadius};display: ${styles.all.display}; align-items: ${styles.all.alignItems}; justify-content: ${styles.all.justifyContent};'>${styles.public_transport.icon}</div>`,
}
function filterMapCategory(category){
    if(category != null && category != undefined){
        
    if(category.includes("accommodation")){
        return categoriesIcons.accommodation;
    }
    else if(category.includes("activity")){
        return categoriesIcons.activity;
    }
    else if(category.includes("airport")){
        return categoriesIcons.airport;
    }
    else if(category.includes("commercial")){
        return categoriesIcons.commercial;
    }
    else if(category.includes("catering")){
        return categoriesIcons.catering;
    }
    else if(category.includes("education")){
        return categoriesIcons.education;
    }
    else if(category.includes("office")){
        return categoriesIcons.office;
    }
    else if(category.includes("parking")){
        return categoriesIcons.parking;
    }
    else if(category.includes("pet")){
        return categoriesIcons.pet;
    }
    else if(category.includes("stadium")){
        return categoriesIcons.stadium;
    }
    else if(category.includes("fitness")){
        return categoriesIcons.fitness;
    }
    else if(category.includes("public_transport")){
        return categoriesIcons.public_transport;
    }
}
}
export {
    convertTimeStampToUnixTime,
    formatDateTime,
    getMonthDay,
    getTime,
    convertToCelsius,
    getWeatherInterpretation,
    getIsDaytime,
    getWindDirection,
    getTempColor,
    filterMapCategory
}