import crypt from 'bcryptjs';

export const createHash = async (password: string): Promise<string> => {
    const salt = await crypt.genSalt(10);
    return await crypt.hash(password, salt);
}

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
    return await crypt.compare(password, hash);
}
