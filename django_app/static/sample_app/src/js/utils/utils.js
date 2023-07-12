import axios from "axios";
import { _readCookie,_eraseCookie,_createCookie } from "../network/network";
const makeAPICallForGet = async (api_url, payload) => {
    var data = [];
    try {
        var apidata = await axios.get(api_url, {
            params: payload,
            headers: {
                Authorization: _readCookie("auth_token"),
                "X-CSRFToken": _readCookie("csrftoken"),
            },
        });
        data = apidata;
        return data;
    } catch (message) {
            console.error(message);
            return "errror_in_api";
    }
};
const makeAPICallForPost = async (api_url, payload) => {
    var data = [];
    try {
        var apidata = await axios.post(api_url, payload, {
            headers: {
                Authorization: _readCookie("auth_token"),
                "X-CSRFToken": _readCookie("csrftoken"),
            },
        });
        data = apidata;
        return data;
    } catch (message) {
            if (message.response.data.error)
            {
                throw new Error(message.response.data.error);
            }
            throw new Error("Server error")
            
    }
};
const makeAPICallForPostFileUpload = async (api_url, payload) => {
    var data = [];
    try {
        var apidata = await axios.post(api_url, payload, {
            headers: {
                Authorization: _readCookie("auth_token"),
                "X-CSRFToken": _readCookie("csrftoken"),
                "Content-Type": "multipart/form-data",
            },
        });
        data = apidata;
        return data;
    } catch (message) {
            
            return "errror_in_api";
    }
};

const makeAPICallForPostWithData = async (api_url, payload) => {
  var data = [];
  try {
    var apidata = await axios.post(api_url, payload, {
      headers: {
        Authorization: _readCookie("auth_token"),
        "X-CSRFToken": _readCookie("csrftoken"),
      },
    });
    data = apidata;
    return data;
  } catch (message) {
    if (message.response.status == "401") {
        window.location.href = "/login/";
        if (_readCookie("auth_token") != null)
            window.alert("Session Expired.Please Login Again");
        _eraseCookie("auth_token");
        return;
    } else {
        return message.response;
    }
  }
};



export { makeAPICallForGet, makeAPICallForPost, makeAPICallForPostFileUpload,makeAPICallForPostWithData};
