import { getWithParams, put } from './common'

const userUrl = '/user'

export const getUserBalance = async (params) => {
  return await getWithParams(userUrl + '/balance', params)
}

export const updateUserBalance = async (id, body) => {
  return await put(userUrl + '/balance/' + id, body)
}
