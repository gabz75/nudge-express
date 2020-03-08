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
    return new Response({ success: false, pending: false, errors: validationError.errors });
  }

  static withData(data) {
    return new Response({ success: true, pending: false, data });
  }

  static withError(error) {
    return new Response({ success: false, pending: false, errors: [error] });
  }

  constructor({
    promise = null,
    data = null,
    errors = null,
    pending = false,
    success = null,
  }) {
    this.promise = promise;
    this.data = data;
    this.errors = errors;
    this.pending = pending;
    this.success = success;
  }
}
