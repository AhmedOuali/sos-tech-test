import { httpDelete, httpGet, httpPost, httpUpdate, Options } from '../helpers/httpClient'
import { END_POINT_WS_URL } from '../constants'
import ITask from '../interfaces/ITask'

export const getAllTasks = (options?: Options): Promise<ITask[]> => {
  return httpGet<ITask[]>(`${END_POINT_WS_URL}/tasks`, options)
}

export const getOneTask = (id: string | number, options?: Options): Promise<ITask> => {
  return httpGet<ITask>(`${END_POINT_WS_URL}/tasks/${id}`, options)
}

export const createTask = (task: ITask, options?: Options): Promise<ITask> => {
  return httpPost<ITask>(`${END_POINT_WS_URL}/tasks`, task, options)
}

export const updateTask = (id: string | number, task: ITask, options?: Options): Promise<ITask> => {
  return httpUpdate<ITask>(`${END_POINT_WS_URL}/tasks/${id}`, task, options)
}

export const deleteTask = (id: string | number, options?: Options): Promise<ITask> => {
  return httpDelete<ITask>(`${END_POINT_WS_URL}/tasks/${id}`, options)
}
