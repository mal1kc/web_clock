import { writable } from "svelte/store";
import { deleteCookie, getCookie, parseCookies, setCookie } from "./cookie_manage";


export interface WorldClockSettings {
  selected_timezone_list: string[]
}

const cookie_name = "world_clock_settins";

const default_wcs_data: WorldClockSettings = {
  selected_timezone_list: [
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    "Europe/Istanbul",
    "America/New_York",
    "Asia/Tokyo",
    "Europe/Berlin",
    "Asia/Baku"
  ]
}

let wc_cookie_data: WorldClockSettings = (() => {
  const wcs_cookie = getCookie(cookie_name);
  if (typeof wcs_cookie === 'string') {
    let cookie_obj: WorldClockSettings | null = null;
    try {
      const parsedCookies = parseCookies(wcs_cookie);
      // Assuming the cookie contains a JSON string for selected_timezone_list
      if (parsedCookies.selected_timezone_list) {
        cookie_obj = {
          selected_timezone_list: JSON.parse(parsedCookies.selected_timezone_list)
        };
      }
    } catch (error) {
      console.debug("has error:", error);
    }
    return cookie_obj || default_wcs_data; // Return cookie_obj or default data
  } else {
    deleteCookie(cookie_name);
    console.log("Cookie is not a string or does not exist.");
    return default_wcs_data; // Return default data if cookie doesn't exist
  }
})();


if (typeof wc_cookie_data == 'undefined') {
  wc_cookie_data = default_wcs_data;
}

export const world_clock_data = writable(wc_cookie_data);


world_clock_data.subscribe((nw_world_clock_data: WorldClockSettings | null) => {
  if (nw_world_clock_data) {
    setCookie(cookie_name, JSON.stringify({ selected_timezone_list: nw_world_clock_data.selected_timezone_list }), 30);
  }
});

export function add_new_world_clock(timezone: string) {
  const MAX_SIZE = 6;
  if (!wc_cookie_data.selected_timezone_list.includes(timezone)) {
    wc_cookie_data.selected_timezone_list.push(timezone);

    if (wc_cookie_data.selected_timezone_list.length > MAX_SIZE) {
      wc_cookie_data.selected_timezone_list.shift();
    }

    world_clock_data.update((currentData) => ({
      ...currentData,
      selected_timezone_list: wc_cookie_data.selected_timezone_list
    }));
  }
}







