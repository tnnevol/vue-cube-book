// 封装了localStorage和sessionStorage存储

import Cookies from 'js-cookie'

/**
 * LocalStorageConstruct
 * localStorage 获取、设置、删除
 */
class LocalStorageConstruct {
  set (key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value))
  };
  get (key) {
    const getItem = window.localStorage.getItem(key)
    return (getItem === null || getItem === 'undefined')
      ? null
      : JSON.parse(getItem)
  };
  remove (key) {
    return window.localStorage.removeItem(key)
  };
}

/**
 * SessionStorageConstruct
 * sessionStorage 获取、设置、删除
 */
class SessionStorageConstruct {
  set (key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  };
  get (key) {
    const getItem = window.sessionStorage.getItem(key)
    return (getItem === null || getItem === 'undefined')
      ? null
      : JSON.parse(getItem)
  };
  remove (key) {
    return window.sessionStorage.removeItem(key)
  }
}

/**
 * supportLocalStorageJudge
 * 判断浏览器是否兼容localStorage
 * @returns {boolean}
 */
export const supportLocalStorageJudge = () => {
  let flag = true
  let uaFlag = false
  const uaArr = ['Chrome', 'MQQBrowser', 'QQ', 'TBS', 'wxwork', 'MicroMessenger', 'T7', 'baiduboxapp', 'baidubrowser', 'MiuiBrowser', 'NetType', 'OPR']
  const testKey = 'newblue'
  if (navigator.userAgent.indexOf('UCBrowser') > -1) {
    flag = false
  }
  uaArr.forEach((ua) => {
    if (navigator.userAgent.indexOf(ua) > -1) {
      uaFlag = true
    }
  })
  if (!uaFlag) {
    if (
      navigator.userAgent.indexOf('HUAWEIEVA') > -1 ||
      navigator.userAgent.indexOf('HUAWEIVTR') > -1
    ) {
      flag = false
    }
  }
  try {
    window.localStorage.setItem(testKey, 'tnnevol')
    window.localStorage.removeItem(testKey)
    flag = true
  } catch (e) {
    flag = false
  }
  return flag
}

const LocalStorage = new LocalStorageConstruct()

const supportLocalStorage = supportLocalStorageJudge()

/**
 * setStorage
 * 存储localStorage
 * @param key
 * @param value
 * @returns {*}
 */
export const setStorage = (key, value) => {
  return supportLocalStorage
    ? LocalStorage.set(key, value)
    : Cookies.set(key, value)
}

/**
 * getStorage
 * 获取localStorage
 * @param key
 * @returns {*}
 */
export const getStorage = (key) => {
  return supportLocalStorage
    ? LocalStorage.get(key)
    : Cookies.get(key)
}

/**
 * removeStorage
 * 删除localStorage
 * @param key
 * @returns {*}
 */
export const removeStorage = (key) => {
  return supportLocalStorage
    ? LocalStorage.remove(key)
    : Cookies.remove(key)
}

export const SessionStorage = new SessionStorageConstruct()
