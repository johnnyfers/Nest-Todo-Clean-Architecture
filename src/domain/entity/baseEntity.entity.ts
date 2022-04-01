export abstract class BaseEntity<T> {
    protected readonly id: number;
    protected props: T
    protected readonly createdata: Date
    protected updatedate: Date

    constructor(props: T, id?: number) {
        this.id = id
        this.props = props
        this.createdata = new Date()
        if (!id) {
            this.id = Math.random()
        }
    }

    getId(): number {
        return this.id
    }

    getProps(): T {
        return this.props
    }

    getCreatedata(): Date {
        return this.createdata
    }

    geUpdatedData(): Date {
        return this.updatedate
    }

    setUpdatedate(date: Date): void {
        this.updatedate = date
    }
}