import { getCookie } from "../../api/cookie";

export function isLogin() {
  return getCookie("accessToken") !== undefined;
}

export function isCookieNull() {
  return getCookie("accessToken") === null;
}

export function isCookieAuthenticated() {
  return getCookie("accessToken") === "false";
}

export function isTempUser() {
  return getCookie("tempToken");
}

export const isGuest = (function () {
  return isTempUser() || !isLogin() || isCookieNull() || isCookieAuthenticated();
})();
