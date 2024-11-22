<script lang="ts">
  import { dev } from "$app/environment";
  import { goto } from "$app/navigation";

  if (dev) {
    // Assuming you have the following types defined
    type StringKeyObject = { [key: string]: string };
    type ClockPageSettings = {
      def_timezone: string;
      world_clock_timezones: string[];
    };

    // Your parseCookies function
    function parseCookies(cookieString: string): StringKeyObject {
      const cookies: StringKeyObject = {};
      const cookieArray = cookieString.split(";");

      cookieArray.forEach((cookie) => {
        const [name, value] = cookie.split("=").map((c) => c.trim());
        if (name) {
          cookies[name] = decodeURIComponent(value);
        }
      });

      return cookies;
    }

    // Example cookie string input
    const cookieString =
      '{"def_timezone":"Europe/Guernsey","world_clock_timezones":["Atlantic/Reykjavik","America/New_York","Asia/Tokyo","Europe/Berlin","Asia/Baku","Europe/Istanbul"]}';

    // Parse the cookies
    const parsedCookies = parseCookies(cookieString);

    // Create the default_cp_data object
    const default_cp_data: ClockPageSettings = {
      def_timezone: parsedCookies.def_timezone || "Europe/Istanbul", // Fallback to a default timezone
      world_clock_timezones: [
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...JSON.parse(parsedCookies.world_clock_timezones || "[]"), // Parse the world clock timezones
      ].slice(0, 6), // Limit to 6 max
    };

    // Output the result
    // console.log(default_cp_data);
  } else {
    goto("/");
  }
</script>
