export function cleanFileName(fileName: string): string {
    const file_extension = fileName.split('.').pop();
    const file_name = fileName.split('.').slice(0, -1).join('.');

    // Remove special characters and leave letters, numbers, "-", "_", and spaces
    const cleaned_Name = file_name.replace(/[^\w\d\-_ ]/g, '');
    return `${cleaned_Name}.${file_extension}`;
}