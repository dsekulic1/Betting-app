import { getWithParams, get } from './common'

const sportUrl = '/sports'

export const getSport = async (params) => {
  return await getWithParams(sportUrl, params)
}

export const getSports = async () => {
  return await get(sportUrl)
}
