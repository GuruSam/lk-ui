function install (Vue) {
  const breakpoint = {}

  const xsBreakpoint = matchMedia('(max-width: 576px)')
  const xlBreakpoint = matchMedia('(max-width: 1500px) and (min-width: 1200px)')
  
  breakpoint.isXs = xsBreakpoint.matches
  breakpoint.isXl = xlBreakpoint.matches

  if (typeof xsBreakpoint.addEventListener === 'function') {
    xsBreakpoint.addEventListener('change', () => {
      breakpoint.isXs = xsBreakpoint.matches
    })
  } else {
    // Safari support
    xsBreakpoint.addListener(() => {
      breakpoint.isXs = xsBreakpoint.matches
    })
  }

  if (typeof xlBreakpoint.addEventListener === 'function') {
    xlBreakpoint.addEventListener('change', () => {
      breakpoint.isXl = xlBreakpoint.matches
    })
  } else {
    // Safari support
    xlBreakpoint.addListener(() => {
      breakpoint.isXl = xlBreakpoint.matches
    })
  }

  Vue.mixin({
    data: () => ({
      breakpoint
    })
  })
}

export default install
