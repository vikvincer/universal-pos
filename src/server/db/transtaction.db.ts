import { TransactionItemModel, TransactionModel } from "../models/transaction.model";
import db from "./db.connect";
import insertQuery from "./db.utils/insertQuery";


export const addTransaction = async (transaction: TransactionModel) => {
    const query = `INSERT INTO TRANSACTIONS (customerId, dateTime, totalPrice, customerName) VALUES (?, ?, ?)`;
    const values = [transaction.userId, transaction.dateTime, transaction.totalPrice, transaction.customerName];
    try {
        await db.run(query, values);
        return { success: true }
    } catch (error) {
        return { error }
    }
}

export const createTransactionTable = () => {
    const createTransactionTableQuery = `
            CREATE TABLE TRANSACTIONS (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER NOT NULL,
                dateTime DATE NOT NULL,
                totalPrice REAL NOT NULL
            )`;
   db.run(createTransactionTableQuery);
}

export const addTransationItem = async (transaction: TransactionItemModel) => {
    const query = `INSERT INTO TRANSACTION_ITEMS (transactionId, itemId, quantity, price) VALUES (?, ?, ?)`;
    const values = [transaction.transactionId, transaction.itemId, transaction.quantity, transaction.price];
    try {
        await db.run(query, values);
        return { success: true }
    } catch (error) {
        return { error }
    }
}

export const createTransactionItemTable = () => {
    const createTransactionItemTableQuery = `
            CREATE TABLE TRANSACTION_ITEMS (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                transactionId INTEGER NOT NULL,
                itemId INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL
            )`;
   db.run(createTransactionItemTableQuery);
}

export default {
    addTransaction,
    createTransactionTable,
    addTransationItem,
    createTransactionItemTable
}