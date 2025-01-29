export class CustomError extends Error {
  code: number;

  constructor(cause: string, code: number) {
    super(cause);
    this.code = code;
  }
}
