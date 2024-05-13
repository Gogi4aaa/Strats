function convertTimeStampToUnixTime(timestamp) {
    // Converts a timestamp to Unix Time
    return new Date(timestamp);
}

function formatDateTime(dt) {
    // Converts a Unix Time timestamp to a human-readable string

    var strTime = getTime(dt);
    // var hours = dt.getHours();
    // var minutes = dt.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';

    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0' + minutes : minutes;

    // var strTime = hours + ':' + minutes + ' ' + ampm;

    return (
        dt.getMonth() + 1 + '/' + 
        dt.getDate() + '/' + 
        dt.getFullYear() + ' ' +
        strTime
    )
}

function getMonthDay(dt) {
    return dt.getMonth() + '/' + dt.getDate();
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

export {
    convertTimeStampToUnixTime,
    formatDateTime,
<<<<<<< HEAD
    getMonthDay,
    getTime
=======
    convertToCelsius
>>>>>>> e8092efec42a0819e250f4e39ff8219216f79ac1
}