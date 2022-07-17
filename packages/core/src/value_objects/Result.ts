export class Result {
    static success(): Result {
        return new Result(null)
    }

    constructor (private error: string | null) {}

    isSuccess() : boolean {
        return !this.error
    }

    isError() : boolean {
        return !!this.error
    }
}
