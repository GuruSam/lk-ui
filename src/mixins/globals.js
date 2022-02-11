import layoutHelpers from '@/components/layout/helpers.js'

export default function () {
  return {
    // Public url
    publicUrl: process.env.BASE_URL,

    // Layout helpers
    layoutHelpers,

    // Check for RTL layout
    get isRtlMode () {
      return document.documentElement.getAttribute('dir') === 'rtl' ||
             document.body.getAttribute('dir') === 'rtl'
    },

    // Check if IE
    get isIEMode () {
      return typeof document.documentMode === 'number'
    },

    // Check if IE10
    get isIE10Mode () {
      return this.isIEMode && document.documentMode === 10
    },

    // Layout navbar color
    get layoutNavbarBg () {
      return 'navbar-theme'
    },

    // Layout sidenav color
    get layoutSidenavBg () {
      return 'sidenav-theme'
    },

    // Layout footer color
    get layoutFooterBg () {
      return 'footer-theme'
    },

    // Animate scrollTop
    scrollTop (to, duration, element = document.scrollingElement || document.documentElement) {
      if (element.scrollTop === to) return
      const start = element.scrollTop
      const change = to - start
      const startDate = +new Date()

      // t = current time; b = start value; c = change in value; d = duration
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
      }

      const animateScroll = () => {
        const currentDate = +new Date()
        const currentTime = currentDate - startDate
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          element.scrollTop = to
        }
      }

      animateScroll()
    },

    declOfNum (number, phrases) {
      switch (true) {
        case number % 10 === 1 && number !== 11:
          return phrases[0]
      
        case number > 1 && number < 5:
          return phrases[1]

        default:
          return phrases[2]
      }
    }
  }
}
