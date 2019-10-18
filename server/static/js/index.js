import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDom from '@better-scroll/observe-dom'
import ScrollBar from '@better-scroll/scroll-bar'

BScroll.use(ScrollBar)
BScroll.use(ObserveDom)
BScroll.use(MouseWheel)

// 对象 请 深度拷贝， 不要让索引干扰你！！！
export const deepCopy = source => JSON.parse(JSON.stringify(source))

/**
 * 滚动条插件初始化
 * @param el
 * @param opts
 * @returns {BScroll}
 * @private
 */
export const _initBScroll = (el, opts = {
  click: true,
  tap: 'tap',
  freeScroll: true,
  scrollX: true,
  scrollY: true,
  observeDom: true,
  mouseWheel: {
    speed: 20,
    invert: false,
    easeTime: 300
  },
  scrollbar: {
    fade: false
  },
  disableMouse: false
}) => {
  return new BScroll(el, opts)
}

/**
 * 对日期进行格式化，
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
export const dateFormat = (date, format) => {
  if (typeof date === 'string') {
    let mts = date.match(/(\/Date(\d+)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }
  date = new Date(date)
  if (!date || date.toUTCString() === 'Invalid Date') {
    return ''
  }

  let map = {
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

/**
 * 返回当前时间的上个月
 * @returns {Date}
 */
export const prevMonth = () => {
  let curTimestamp = new Date().setDate(1)
  let curM = new Date(curTimestamp).getMonth()

  return new Date(new Date(curTimestamp).setMonth(curM - 1))
}

/**
 * 数组 对象根据字段排序
 * @param data
 * @param field
 * @param reverse
 * @returns {*}
 */
export const sortData = (data, field, reverse) => {
  return data.sort((a, b) => reverse ? b[field] - a[field] : a[field] - b[field])
}

/**
 * 开始时间到结束时间的区间
 * @param startTime
 * @param howMonth
 * @param format
 * @returns {Array}
 */
export const getIntervalTime = ({
  startTime = new Date().getTime(),
  howMonth = 12,
  format = 'yyyy-MM-dd'
} = {}) => {
  let sD = new Date(startTime)
  let sMonth = new Date(sD.setDate(1)).getMonth()
  let monthFormat = []
  for (let i = 0; i < howMonth; i++) {
    monthFormat.push(dateFormat(new Date(sD).setMonth(sMonth++), format))
  }
  return monthFormat
}

/**
 * 最大保留的位数
 * @param value
 * @param places
 */
export const maxDecimalPlaces = ({
  value = 0,
  places = 2
} = {}) => {
  // debugger;
  if (!Number.isInteger(value)) {
    value = String(value)
    if (value.split('.')[1].length > places) {
      value = parseFloat(value).toFixed(places)
    }
  }
  return parseFloat(value)
}

export const unitTranslate = ({
  value = 0,
  unit = ''
} = {}) => {
  let vLength = String(parseInt(value)).length

  if (vLength > 4) {
    unit = `万${unit}`
    value /= Math.pow(10, 4)
  } else if (vLength > 8) {
    unit = `亿${unit}`
    value /= Math.pow(10, 8)
  }

  return {
    value: maxDecimalPlaces({ value: value }),
    unit,
    formatter: `${maxDecimalPlaces({ value: value })}${unit}`
  }
}
