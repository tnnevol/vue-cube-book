// 全局工具js

import router from '@/router'

const RouterLink = route => {
  if (!route) return
  if (
    typeof route === 'string' &&
    /miniapp:\/\//.test(route)
  ) {
    window.wx.minProgram.reLaunch({
      url: route.replace('miniapp://', '/')
    })
  } else if (
    typeof route === 'string' &&
    (/http/.test(route) || /\/api/.test(route))
  ) {
    location.href = route
  } else {
    // Navigating to current location ("/bookCity") is not allowed
    // "NavigationDuplicated"
    router.push(route)
  }
}

/**
 * 判断字符串时间格式是否正确
 * checkTimeStringFormat
 * @param date
 * @returns {boolean}
 */
const checkTimeStringFormat = date => {
  if (typeof date === 'string') {
    const mts = date.match(/(\/Date(\d+)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }
  date = new Date(date)

  return !(!date || date.toUTCString() === 'Invalid Date')
}

/**
 * 对日期进行格式化
 * dateFormat
 * @param date 要格式化的日期 日期对象 / 时间戳
 * @param format 进行格式化的模式字符串 yyyy-MM-dd hh:mm:ss:SS q
 *  支持的模式字母有：
 *  y:年,
 *  M:年中的月份(1-12),
 *  d:月份中的天(1-31),
 *  h:小时(0-23),
 *  m:分(0-59),
 *  s:秒(0-59),
 *  S:毫秒(0-999),
 *  q:季度(1-4)
 * @return String
 */
const dateFormat = (date, format) => {
  if (!checkTimeStringFormat(date)) {
    return ''
  }
  date = new Date(date)
  const map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return `${date.getFullYear()}`.substr(4 - all.length)
    }
    return all
  })
  return format
}

export default {
  RouterLink,
  dateFormat
}
