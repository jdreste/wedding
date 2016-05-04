function getTime() {
    var d = new Date();
    var hour = d.getHours();
    var amPm = "PM";

    if (hour > 12) {
        convertHours(hour);
    } else if (hour == 0) {
        hour = 12;
        amPm = "AM";
    } else {
        amPm = "AM";
    }

    var minutes = d.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var seconds = d.getSeconds();

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    function convertHours(h) {
        hour = h - 12;
    }
    return hour + ":" + minutes + ":" + seconds + " " + amPm;
}

function getDate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    return month + "/" + day + "/" + year;
}