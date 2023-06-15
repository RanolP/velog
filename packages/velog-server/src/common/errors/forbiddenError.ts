import { HttpError } from './httpError.js'

export class ForbiddenError extends HttpError {
  constructor(description = 'FORBIDDEN') {
    super(description, 403)
  }
}
