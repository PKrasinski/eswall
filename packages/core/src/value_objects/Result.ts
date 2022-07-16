export class Result {
    static success(): Result {
        return new Result(null)
    }

    constructor (private error: string | null) {}
}
