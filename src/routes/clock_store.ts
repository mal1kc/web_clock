import { deleteCookie, getCookie, parseCookies, setCookie } from "./cookie_manage";

// Default clock page settings interface and values
export interface ClockPageSettings {
  def_timezone: string;
  world_clock_timezones: string[];
}

const cookie_name = "_settings";
const default_cp_data: ClockPageSettings = {
  def_timezone: "Europe/Istanbul",
  world_clock_timezones: [
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    "America/New_York",
    "Asia/Tokyo",
    "Europe/Berlin",
    "Asia/Baku",
    "Europe/Istanbul"
  ] // = 6 max
};

// Initialize settings from the cookie

export function getClockPageSettings(): ClockPageSettings {
  const cp_cookie = getCookie(cookie_name);
  console.debug("pre-parse-cookies", cp_cookie);

  // Initialize cookie_obj with default settings
  let cookie_obj: ClockPageSettings = { ...default_cp_data };

  if (typeof cp_cookie === "string") {
    try {
      const parsedCookies = parseCookies(cp_cookie);
      // TODO: fix this conversition bug
      console.debug("parsedCookies ", parsedCookies);
      console.debug("parsedCookies ", parsedCookies["def_timezone"]);
      console.debug("parsedCookies ", parsedCookies.world_clock_timezones);

      cookie_obj.def_timezone = parsedCookies.def_timezone || default_cp_data.def_timezone;

      const worldClockTimezones = parsedCookies.world_clock_timezones
        ? parsedCookies.world_clock_timezones
        : default_cp_data.world_clock_timezones;

      let world_clock_timezones_set = new Set(worldClockTimezones);

      const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!world_clock_timezones_set.has(currentTimezone)) {
        world_clock_timezones_set.add(currentTimezone);
      }

      if (world_clock_timezones_set.size < 3) {
        default_cp_data.world_clock_timezones.forEach(element => {
          if (!world_clock_timezones_set.has(element)) {
            world_clock_timezones_set.add(element);
          }
          if (world_clock_timezones_set.size >= 3) {
            return;
          }
        });
      }

      // Convert the Set back to an array and limit to a maximum of 6 items
      cookie_obj.world_clock_timezones = Array.from(world_clock_timezones_set).slice(0, 6);
    } catch (error) {
      console.debug("Error parsing cookie:", error);
    }
  } else {
    deleteCookie(cookie_name);
    console.log("Cookie is invalid or does not exist. Using default settings.");
  }

  return cookie_obj;
}

// Update clock page settings and persist them in cookies
export function setClockPageSettings(newSettings: Partial<ClockPageSettings>): void {
  const currentSettings = getClockPageSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };
  setCookie(cookie_name, JSON.stringify(updatedSettings), 30);
}

// change_timezone_for_clock_page_settings
export function change_def_timezone_for_clock_page_settings(timezone: string): void {
  if (Intl.supportedValuesOf("timeZone").includes(timezone)) {
    setClockPageSettings({ def_timezone: timezone });
    console.debug("changed_timezone", getClockPageSettings().def_timezone);
  } else {
    console.error("Invalid timezone:", timezone);
  }
}

export function change_worldclock_tz_for_clock_page_settings(timezone: string): void {
  const MAX_SIZE = 6;
  const currentSettings = getClockPageSettings();


  if (!currentSettings.world_clock_timezones.includes(timezone)) {
    // Add the new timezone to the list
    currentSettings.world_clock_timezones.push(timezone);

    // Ensure the list does not exceed the maximum size
    if (currentSettings.world_clock_timezones.length > MAX_SIZE) {
      currentSettings.world_clock_timezones.shift(); // Remove the oldest entry
    }

    setClockPageSettings(
      { world_clock_timezones: currentSettings.world_clock_timezones }
    )
  }
}


