import cookie from 'js-cookie'

// will be useful when we need to make request to server with token
// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    })
  }
}
// remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1,
    })
  }
}
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key)
  }
}

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response?.token)
  setLocalStorage('user', response?.user)
  setLocalStorage('token', response?.token)
  next()
}

export const signout = () => {
  removeCookie('token')
  removeLocalStorage('user')
  removeLocalStorage('token')
}

// access user info from localstorage
export const isAuthenticated = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}

//update user in localstorage
export const updateUser = (response, next) => {
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'))
    auth = response.data
    localStorage.setItem('user', JSON.stringify(auth))
  }
  next()
}



