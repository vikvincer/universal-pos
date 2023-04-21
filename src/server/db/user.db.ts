import sqlite3 from 'sqlite3';
import db from "./db.connect";
import { UserModel } from '../models/user.model'
import { insertQuery } from './db.utils/insertQuery';
import encryptValue from './db.utils/encrypt';


export const addUser = async (user: UserModel) => {

    const query =  `INSERT INTO USERS (
        username, 
        password, 
        userType, 
        email, 
        phoneNumber, 
        createDate, 
        firstName, 
        lastName
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const value = [
        user.userName,
        await encryptValue(user.password),
        user.userType,
        user.email,
        user.phoneNumber,
        user.createDate,
        user.firstName,
        user.lastName ];
    
    try {
        await  db.run(query, value);
        return {success: true}

    } catch(error) {
        return {error}
    }
     
}

const getUserInfo = () => {
    const query = `SELECT * FROM USERS WHERE username = ?`;

} 

const createUserTable = () => {
    const createUserTableQuery = `
            CREATE TABLE USERS (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                userType TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phoneNumber TEXT,
                createDate DATE NOT NULL,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL
            )`;
    db.run(createUserTableQuery);
}


export default {
    addUser,
    createUserTable
}