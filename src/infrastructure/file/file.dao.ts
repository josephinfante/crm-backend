import { File } from "../../domain/file/file";
import fs from "fs";
import path from "path";
import { UniqueID, cleanFileName } from "../../shared/utils";
import { FileError } from "../../shared/errors";
import sharp from "sharp";

const directory = path.join(__dirname + '../../../../uploads/');

class FileDao {
    async upload(files: File | File[], static_directory: string): Promise<string[]> {
        try {
            let file_urls: string[] = [];
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }

            const file_directory_name = UniqueID.generate();
            const file_path = `${directory}/${file_directory_name}`;

            if (files) {
                fs.mkdirSync(file_path);
            }

            const processImage = async (file: File) => {
                const image = sharp(file.data);

                // Resize and set DPI to 300 for images
                const processedBuffer = await image
                    .withMetadata({ density: 300 })
                    .toBuffer();

                const clean_name = cleanFileName(file.name);
                // Save the processed image
                fs.writeFileSync(`${file_path}/${clean_name}`, processedBuffer);

                file_urls.push(`${static_directory}/${file_directory_name}/${clean_name}`);
            };

            if (files instanceof Array) {
                for (let file of files) {
                    if (file.mimetype.startsWith("image")) {
                        await processImage(file);
                    } else {
                        const clean_name = cleanFileName(file.name);
                        file_urls.push(`${static_directory}/${file_directory_name}/${clean_name}`);
                        await file.mv(`${file_path}/${clean_name}`);
                    }
                }
            } else {
                if (files.mimetype.startsWith("image")) {
                    await processImage(files);
                } else {
                    const clean_name = cleanFileName(files.name)
                    file_urls.push(`${static_directory}/${file_directory_name}/${clean_name}`);
                    await files.mv(`${file_path}/${clean_name}`);
                }
            }
            return file_urls;
        } catch (error) {
            if (error instanceof Error && error.message) throw new FileError(error.message);
            else throw new Error("Ha ocurrido un error al subir el archivo.");
        }
    }
    async delete(urls: string | string[]) {
        try {
            if (urls instanceof Array) {
                for (let url of urls) {
                    const file_path = url.split("/");
                    const file_directory_name = file_path[file_path.length - 2];
                    const file_name = file_path[file_path.length - 1];
                    const file_exist = fs.existsSync(`${directory}/${file_directory_name}/${file_name}`);
                    if (!file_exist) throw new FileError("El archivo no existe.");
                    fs.unlinkSync(`${directory}/${file_directory_name}/${file_name}`);
                    fs.readdir(`${directory}/${file_directory_name}`, (err, files) => {
                        if (err) throw err;
                        if (files.length === 0) {
                            fs.rmdirSync(`${directory}/${file_directory_name}`);
                        }
                    });
                }
                return;
            }
            const file_path = urls.split("/");
            const file_directory_name = file_path[file_path.length - 2];
            const file_name = file_path[file_path.length - 1];
            const file_exist = fs.existsSync(`${directory}/${file_directory_name}/${file_name}`);
            if (!file_exist) throw new FileError("El archivo no existe.");
            fs.unlinkSync(`${directory}/${file_directory_name}/${file_name}`);
            fs.readdir(`${directory}/${file_directory_name}`, (err, files) => {
                if (err) throw err;
                if (files.length === 0) {
                    fs.rmdirSync(`${directory}/${file_directory_name}`);
                }
            });
        } catch (error) {
            if (error instanceof Error && error.message) throw new FileError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el archivo.");
        }
    }
    async findAll(static_directory: string, page: number): Promise<string[]> {
        try {
            const files = fs.readdirSync(directory);
            const file_urls: string[] = [];

            const itemsPerPage = 50;
            const startIdx = (page - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;

            for (let i = startIdx; i < endIdx && i < files.length; i++) {
                const file = files[i];
                const file_path = `${directory}/${file}`;
                const file_exist = fs.existsSync(file_path);
    
                if (!file_exist) {
                    throw new FileError("El archivo no existe.");
                }
    
                const file_stat = fs.statSync(file_path);
    
                if (file_stat.isDirectory()) {
                    const file_directory = fs.readdirSync(file_path);
                    for (let file of file_directory) {
                        file_urls.push(`${static_directory}/${file_path.split("/").pop()}/${file}`);
                    }
                }
            }
    
            return file_urls;
        } catch (error) {
            if (error instanceof Error && error.message) throw new FileError(error.message);
            else throw new Error("Ha ocurrido un error al obtener los archivos.");
        }
    }
}
const fileDao = new FileDao();
export default fileDao;