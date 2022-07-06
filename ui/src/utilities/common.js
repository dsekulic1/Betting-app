import { getToken, getUser } from 'utilities/localStorage'
import { decode } from 'jsonwebtoken'
import { removeSession } from 'utilities/localStorage'

export const validToken = () => {
  const token = getToken()
  if (token === null) return false
  const exp = decode(token, { complete: true }).payload.exp
  if (exp * 1000 < Date.now()) {
    removeSession()
  }
  return Date.now() < exp * 1000
}

export const userId = () => {
  const user = getUser()
  return user.id
}

export const userRole = () => {
  const user = getUser()

  if (user != null) return user.roles[0]

  return ''
}
