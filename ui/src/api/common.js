import axios from 'axios'
import { getToken } from 'utilities/localStorage'

export const hostUrl = 'http://localhost:8080'

export const basicGet = async (url) => {
  return (await axios.get(hostUrl + url, getAuthConfig())).data
}

export const basitGetWithParams = async (url, params) => {
  return (await axios.get(hostUrl + url, getAuthConfigWithParams(params))).data
}

export const basicDelete = async (url) => {
  return (await axios.delete(hostUrl + url, getAuthConfig())).data
}

export const basicPost = async (url, data) => {
  return (await axios.post(hostUrl + url, data, getAuthConfig())).data
}

export const basicPut = async (url, data) => {
  return (await axios.put(hostUrl + url, data, getAuthConfig())).data
}

export const getAuthConfig = () => {
  let config = {}
  const token = getToken()
  if (token) {
    config = {
      headers: { 'x-access-token': token },
    }
  }
  return config
}

export const getAuthConfigWithParams = (params) => {
  let config = {}
  const token = getToken()
  if (token) {
    config = {
      headers: { 'x-access-token': token },
      params: params,
    }
  } else {
    config = {
      params: params,
    }
  }
  return config
}
