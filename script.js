class PromiseSimple {
  constructor(executionFunction) {
    this.allThenFunctions = [];
    this.handleError = () => {};
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);
    executionFunction(this.onResolve, this.onReject);
  }

  then(thenCallback) {
    this.allThenFunctions.push(thenCallback);
    return this;
  }

  catch(handlerError) {
    this.handleError = handlerError;
    return this;
  }

  onResolve(value) {
    let valueForNextFunction = value;

    try {
      this.allThenFunctions.forEach((nextFunction) => {
        valueForNextFunction = nextFunction(valueForNextFunction);
      });
    } catch (error) {
      this.allThenFunctions = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

const makeApiCall = (
  url,
  config = {
    method: "GET",
    responseType: "json",
  }
) => {
  return new PromiseSimple((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = config.responseType;
    xhr.onload = function () {
      const { response, status } = this;
      console.log(this);
      if (status === 200) {
        resolve(response);
      } else {
        reject("ERROR " + this.status);
      }
    };

    xhr.open(config.method, url);
    xhr.send();
  });
};

makeApiCall("https://jsonplaceholder.typicode.com/todos/1")
  .then((data) => {
    data.id = 2;
    data.title = "Changed Title";
    return data;
  })
  .then((data2) => {
    console.log(data2);
  })
  .catch((error) => {
    console.log(error);
  });
