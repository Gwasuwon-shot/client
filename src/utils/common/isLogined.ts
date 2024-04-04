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

export const isGuest = (function () {
  return !isLogin() || isCookieNull() || isCookieAuthenticated();
})();
