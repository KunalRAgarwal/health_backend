var _createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
    } else expires = "";
    document.cookie = name + "=" + value + expires + ";path=/";
};

var _readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

var _eraseCookie = function (name) {
    _createCookie(name, "", -1);
};

const queryParams = new URLSearchParams(window.location.search);
var id = queryParams.get("client_idn");
var api_prefix = "";
var api_url = "";
var IA_URL = "";
api_prefix = " http://127.0.0.1:8000";

var api_header = {
    Authorization: "Token " + _readCookie("auth_token"),
    "X-CSRFToken": _readCookie("csrftoken"),
};


export { _readCookie };
export { _createCookie };
export { _eraseCookie };
export { api_url, IA_URL };
export { api_header };
export { id };
export { api_prefix };
