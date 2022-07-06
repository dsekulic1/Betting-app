import { getWithParams, post } from './common'

const ticketUrl = '/ticket'

export const getTickets = async (params) => {
  return await getWithParams(ticketUrl, params)
}

export const addTicket = async (body) => {
  return await post(ticketUrl, body)
}
