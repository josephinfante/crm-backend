import { File } from "../../../domain/file/file";
import { FileRepository } from "../../../domain/file/file.repository";

export class FileCrudUseCase {
    constructor(private readonly fileRepository: FileRepository) {}
    async upload(files: File | File[], static_directory: string): Promise<string[]> {
        return await this.fileRepository.upload(files, static_directory);
    }
    async delete(urls: string | string[]): Promise<void> {
        return await this.fileRepository.delete(urls);
    }
    async findAll(static_directory: string, page: number): Promise<string[]> {
        return await this.fileRepository.findAll(static_directory, page);
    }
}