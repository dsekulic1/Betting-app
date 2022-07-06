import { basitGetWithParams, basicPut } from 'api/common'

const userUrl = '/api/v1'

export const getWithParams = async (url, params) => {
  return await basitGetWithParams(userUrl + url, params)
}

export const put = async (url, data) => {
  return await basicPut(userUrl + url, data)
}
