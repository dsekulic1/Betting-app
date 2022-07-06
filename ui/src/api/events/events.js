import { getWithParams, get, put, post } from './common'

const eventsUrl = '/events'

export const getEventsWithParams = async (params) => {
  return await getWithParams(eventsUrl, params)
}

export const getEvents = async () => {
  return await get(eventsUrl)
}

export const resolveEvents = async () => {
  return await put(eventsUrl + '/resolve')
}

export const addEvent = async (body) => {
  return await post(eventsUrl, body)
}
