import { basicGet, basicPut, basicPost, basitGetWithParams } from 'api/common'

const sportUrl = '/api/v1'

export const get = async (url) => {
  return await basicGet(sportUrl + url)
}

export const getWithParams = async (url, params) => {
  return await basitGetWithParams(sportUrl + url, params)
}

export const post = async (url, data) => {
  return await basicPost(sportUrl + url, data)
}

export const put = async (url, data) => {
  return await basicPut(sportUrl + url, data)
}
