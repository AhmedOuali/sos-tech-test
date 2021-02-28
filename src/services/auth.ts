import { END_POINT_WS_URL } from '../constants'
import { httpGet, httpPost, Options } from '../helpers/httpClient'
import IUser from '../interfaces/IUser'

interface ILoginResponse {
  status: "OK" | "FAILURE",
  redirect: string,
  user: IUser
}

interface ILoginRequest {
  username: string
  password: string
}

interface  ILogoutResponse {
  status: "OK" | "FAILURE",
}

export const login = (user: ILoginRequest, options?: Options): Promise<ILoginResponse> => {
  return httpPost<ILoginResponse>(`${END_POINT_WS_URL}/auth/login`, user, options)
}

export const checkAuthentication = (options?: Options): Promise<ILoginResponse> => {
  return httpGet<ILoginResponse>(`${END_POINT_WS_URL}/auth/checkAuthentication`, options)
}

export const logout = (options?: Options): Promise<ILogoutResponse> => {
  return httpGet<ILogoutResponse>(`${END_POINT_WS_URL}/auth/logout`, options)
}
