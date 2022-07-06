import { basicGet, basicPost, basitGetWithParams } from 'api/common'

const ticketUrl = '/api/v1'

export const get = async (url) => {
  return await basicGet(ticketUrl + url)
}

export const getWithParams = async (url, params) => {
  return await basitGetWithParams(ticketUrl + url, params)
}

export const post = async (url, data) => {
  return await basicPost(ticketUrl + url, data)
}
