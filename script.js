class PromiseSimple {
  constructor(executionFunction) {
    this.allThenFunctions = [];
    this.handleError = () => {};
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);
    executionFunction(this.onResolve, this.onReject);
  }

  static all(promises) {
    if (promises.length === 0) {
      return;
    }

    return new PromiseSimple((resolve, reject) => {
      const results = [];
      let resolved = 0;
      promises.forEach((promise, i) => {
        promise
          .then((result) => {
            results[i] = result;
            resolved++;
            if (resolved === promises.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
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

const promise1 = new PromiseSimple((resove, reject) => {
  setTimeout(reject, 1500, { status: "404" });
});

const promise2 = new PromiseSimple((resove, reject) => {
  setTimeout(resove, 1500, { status: "OK" });
});

const promise3 = new PromiseSimple((resove, reject) => {
  setTimeout(resove, 1500, { status: "OK" });
});

const promise4 = new PromiseSimple((resove, reject) => {
  setTimeout(resove, 1500, { status: "OK" });
});

PromiseSimple.all([promise1, promise2])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error);
  });

PromiseSimple.all([promise3, promise4])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error);
  });
