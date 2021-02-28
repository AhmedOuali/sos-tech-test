import moment from 'moment'

export const deserializeDateFormatter = (date: string) : string => moment(date).format('LLL')
