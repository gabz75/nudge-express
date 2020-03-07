export default class Response {
  static withPromise(promise) {
    return new Promise((resolve) => {
      const response = new Response({ promise, pending: true });

      promise
        .then((data) => {
          response.data = data;
          response.pending = false;
          response.success = true;
        })
        .catch((errors) => {
          response.errors = errors;
          response.pending = false;
          response.success = false;
        })
        .finally(() => {
          resolve(response);
        });
    });
  }

  static withValidationError(validationError) {
    return new Response({ pending: false, success: false, errors: validationError.errors });
  }

  constructor({ promise = null, errors = null, pending = false, success = null }) {
    this.data = null;
    this.errors = errors;
    this.pending = pending;
    this.success = success;
  }
}
