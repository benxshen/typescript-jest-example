

export class Greeting {
  private _lastGreetMsg: string = '';

  constructor(private message: string) { }
    

    greet() {
        return "Hello, " + this.message + ` [${this.now()}]`;
    }

    private now() {
        return new Date();
    }

    delayGreet(delay = 1000) {
        const ret = new Promise(resolve => {
            setTimeout(() => {
                this._lastGreetMsg = this.greet();
                resolve(this._lastGreetMsg);
            }, delay);
        })

        return ret;
    }

    get lastGreetMsg() { return this._lastGreetMsg; }
}