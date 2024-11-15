import { browser } from "$app/environment";

type StringKeyObject = {
  [key: string]: string | null;
};

export function setCookie(name: string, value: any, days: number) {
  if (browser) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
}


export function getCookie(name: string) {
  if (browser) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}


export function parseCookies(cookieString: string) {
  const cookies: StringKeyObject = {};
  const cookieArray = cookieString.split(';');

  cookieArray.forEach(cookie => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (name) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}


export function deleteCookie(name: string) {
  if (browser) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}
