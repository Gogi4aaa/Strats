function convertTimeStampToUnixTime(timestamp) {
    // Converts a timestamp to Unix Time
    return new Date(timestamp);
}

function formatDateTime(dt) {
    // Converts a Unix Time timestamp to a human-readable string
    var datetime = dt;

    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var strTime = hours + ':' + minutes + ' ' + ampm;

    return (
        datetime.getMonth() + 1) + '/' + 
        datetime.getDate() + '/' + 
        datetime.getFullYear() + ' ' +
        strTime;
}

export {
    convertTimeStampToUnixTime,
    formatDateTime
}