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
    var seconds = d.getSeconds();

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