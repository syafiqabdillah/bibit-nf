function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function isLoggedIn() {
  return getCookie("token") !== "";
}

function getJwtData() {
  const jwt = getCookie("token");
  const data = parseJwt(jwt);
  return data;
}

function priceFormat(price) {
  if (price !== "0") {
    return new Intl.NumberFormat(["ban", "id"]).format(price);
  }
  return "Tanya penjual";
}

function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

export {
  parseJwt,
  setCookie,
  getCookie,
  isLoggedIn,
  getJwtData,
  priceFormat,
  isMobile,
};
