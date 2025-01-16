export class CustomError extends Error {
  code: number;
  field?: string;

  constructor(cause: string, code: number = 400, field?: string) {
    super(cause);
    this.code = code;
    if (field) this.field = field;
  }
}
