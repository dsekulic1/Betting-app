import { basicGet, basicPut, basicPost, basitGetWithParams } from 'api/common'

const eventUrl = '/api/v1'

export const get = async (url) => {
  return await basicGet(eventUrl + url)
}

export const getWithParams = async (url, params) => {
  return await basitGetWithParams(eventUrl + url, params)
}

export const post = async (url, data) => {
  return await basicPost(eventUrl + url, data)
}

export const put = async (url, data) => {
  return await basicPut(eventUrl + url, data)
}
