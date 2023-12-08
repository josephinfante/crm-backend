import { IFile } from "./file.type";

export class File {
    name: string;
    data: Buffer;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: boolean;
    mimetype: string;
    md5: string;
    mv: (path: string) => Promise<void>;
    constructor(file: IFile) {
        this.name = file.name;
        this.data = file.data;
        this.size = file.size;
        this.encoding = file.encoding;
        this.tempFilePath = file.tempFilePath;
        this.truncated = file.truncated;
        this.mimetype = file.mimetype;
        this.md5 = file.md5;
        this.mv = file.mv;
    }
}