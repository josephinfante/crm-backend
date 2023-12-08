import { File } from "./file";

export interface FileRepository {
    upload(files: File | File[], static_directory: string): Promise<string[]>;
    delete(urls: string | string[]): Promise<void>;
    findAll(static_directory: string, page: number): Promise<string[]>;
}