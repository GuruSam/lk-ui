import { authService } from './index.js'
import Cookie from 'js-cookie'
import JwtDecode from 'jwt-decode'
import store from '@/store'
import cryptoRandomString from 'crypto-random-string'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const XF_TOKEN_KEY = 'lab_csrf'

export default class TokenService {
  constructor () {
    if (this.tokenExists()) {
      store.dispatch('auth/loggedIn')
    }

    if (!this.xfTokenExists()) {
      this.createXfToken()
    }
  }
  /**
   * @returns {Object}
   */
  getToken () {
    const accessToken = Cookie.get(ACCESS_TOKEN_KEY)
    const refreshToken = Cookie.get(REFRESH_TOKEN_KEY)

    return { accessToken, refreshToken }
  }

  /**
   * @param {Object} token
   */
  saveToken (token) {
    const domain = authService.getDomain()
    const jwtAccess = JwtDecode(token.accessToken)
    const jwtRefresh = JwtDecode(token.refreshToken)

    Cookie.set(ACCESS_TOKEN_KEY, token.accessToken, {
      domain: domain,
      expires: new Date(jwtAccess.exp * 1000)
    })
    Cookie.set(REFRESH_TOKEN_KEY, token.refreshToken, {
      domain: domain,
      expires: new Date(jwtRefresh.exp * 1000)
    })
  }

  removeToken () {
    const domain = authService.getDomain()

    Cookie.remove(ACCESS_TOKEN_KEY, { domain: domain })
    Cookie.remove(REFRESH_TOKEN_KEY, { domain: domain })
  }

  /**
   * @returns boolean
   */
  tokenExists () {
    const token = this.getToken()

    return token.accessToken !== undefined || token.refreshToken !== undefined
  }

  xfTokenExists () {
    const token = Cookie.get(XF_TOKEN_KEY)

    return token !== undefined
  }

  createXfToken () {
    const string = cryptoRandomString({length: 16, type: 'base64'})
    const domain = authService.getDomain()

    Cookie.set(XF_TOKEN_KEY, string, { domain: domain })
  }
}
