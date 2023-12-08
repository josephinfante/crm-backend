import { File } from "../../domain/file/file";
import { FileRepository } from "../../domain/file/file.repository";
import fileDao from "./file.dao";

export class FileRepositoryImpl implements FileRepository {
    upload(files: File | File[], static_directory: string): Promise<string[]> {
        return fileDao.upload(files, static_directory);
    }
    delete(urls: string | string[]): Promise<void> {
        return fileDao.delete(urls);
    }
    findAll(static_directory: string, page: number): Promise<string[]> {
        return fileDao.findAll(static_directory, page);
    }
}