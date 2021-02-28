import axios from 'axios'
import { message } from 'antd'
import { END_POINT_WS_URL } from '../constants'
import { HTTPError } from './errors/HTTPError'

const instance = axios.create({
  baseURL: END_POINT_WS_URL,
})

declare type HttpData = any | FormData

export interface Options {
  disableDefaultErrorMessage?: boolean,
  headers?: any,
  push?: (path: string) => void
}

export const defaultAppError = new HTTPError(
  'Default Application Error',
  '_'
)

const errorHandler = (error: HTTPError) => {
  message.error({ content: error.message, duration: 5 })
}

export const httpGet = <T> (url: string, options: Options = {}): Promise<T> => {
  const { headers, push } = options
  return new Promise<T>((resolve, reject) => {
    instance.get(url, { withCredentials: true, headers, proxy : false })
      .then(response => {
        const { data } = response
        if (push && data.redirect) push(data.redirect)
        resolve(data)
      }).catch((err) => {
        const { response }= err
      const error = response && response.data && response.data.error
      const status = response && response.status || 500
      reject(error ? new HTTPError(error.message, error.errorCode, status) : defaultAppError)
    })
  })
}

export const httpPost = <T> (url: string, data: HttpData, options: Options = {}): Promise<T> => {
  const { headers, push } = options
  return new Promise<T>((resolve, reject) => {
    instance.post(url, data, { withCredentials: true, headers })
      .then(response => {
        const { data } = response
        if (push && data.redirect) push(data.redirect)
        resolve(data)
      }).catch((err) => {
      const { response } = err
      const error = response && response.data && response.data.error || err
      const errorInstance = new HTTPError(error.message, error.errorCode)
      if (!options.disableDefaultErrorMessage) errorHandler(errorInstance)
      reject(errorInstance)
    })
  })
}

export const httpUpdate = <T> (url: string, data: HttpData, options: Options = {}): Promise<T> => {
  const { headers, push } = options
  return new Promise<T>((resolve, reject) => {
    instance.put(url, data, { withCredentials: true, headers })
      .then(response => {
        const { data } = response
        if (push && data.redirect) push(data.redirect)
        resolve(data)
      }).catch(({ response }) => {
      const error = response && response.data && response.data.error
      const errorInstance = error ? new HTTPError(error.message, error.errorCode) : defaultAppError
      if (!options.disableDefaultErrorMessage) errorHandler(errorInstance)
      reject(errorInstance)
    })
  })
}

export const httpDelete = <T> (url: string, options: Options = {}): Promise<T> => {
  const { headers, push } = options
  return new Promise<T>((resolve, reject) => {
    instance.delete(url, { withCredentials: true, headers })
      .then(response => {
        const { data } = response
        if (push && data.redirect) push(data.redirect)
        resolve(data)
      })
      .catch(({ response }) => {
        const error = response && response.data && response.data.error
        const errorInstance = error ? new HTTPError(error.message, error.errorCode) : defaultAppError
        if (!options.disableDefaultErrorMessage) errorHandler(errorInstance)
        reject(errorInstance)
      })
  })
}
