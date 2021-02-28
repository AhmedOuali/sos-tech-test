export default interface ITask {
  id?: number,
  title: string,
  shortDesc: string,
  longDesc: string,
  createdAt?: string,
  updatedAt?: string,
  ownerId?: number
}

