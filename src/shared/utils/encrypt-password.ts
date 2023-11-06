import bycript from 'bcrypt';

export const encrypt_password = async (password: string) => {
    let salt = await bycript.genSalt(10);
    return await bycript.hash(password, salt);
}

export const compare_password = async (password: string, encrypted_password: string) => {
    return await bycript.compare(password, encrypted_password);
}