import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string, days?: number) => {
  const options: Cookies.CookieAttributes = {
    expires: days,
    secure: true,
    sameSite: 'Strict',
  }
  Cookies.set(name, value, options)
}

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const removeCookie = (name: string) => {
  Cookies.remove(name)
}
