import { basicGet, basicPut, basicPost } from 'api/common'

const authUrl = '/api/v1'

export const get = async (url) => {
  return await basicGet(authUrl + url)
}

export const post = async (url, data) => {
  return await basicPost(authUrl + url, data)
}

export const put = async (url, data) => {
  return await basicPut(authUrl + url, data)
}
