import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv'
const config = dotenv.config().parsed;


const encryptValue = async (value: string) => {
    const saltRounds = process.env.SALT_ROUNDS;
    console.log({saltRounds});
    const salt = await bcrypt.genSalt(10);
    const ecryptedValue = await bcrypt.hash(value, salt);
    return ecryptedValue;
}

export default encryptValue;