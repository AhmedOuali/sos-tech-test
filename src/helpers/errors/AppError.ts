export class AppError extends Error {
  constructor (public message: string, public errorCode = '_', public code: number = 500) {
    super(message)
  }
}
