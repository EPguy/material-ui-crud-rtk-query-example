export class Board {
    seq: number;
    title: string;
    password: string;
    content: string;
    createdDate: string;

    constructor(seq: number, title: string, password: string, content: string, createdDate: string) {
        this.seq = seq
        this.title = title
        this.password = password
        this.content = content
        this.createdDate = createdDate
    }
}