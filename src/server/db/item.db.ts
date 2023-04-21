import { CategoryModel, ItemModel } from "../models/item.model";
import insertQuery from "./db.utils/insertQuery";
import db from "./db.connect";


export const addItem = async (item: ItemModel) => {
    const query = `INSERT INTO ITEMS (categoryId, name, price, description, image, createDate, updateDate, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [item.categoryId, item.name, item.price, item.description, item.image, item.createDate, item.updateDate, item.type];
    try {
        await db.run(query, values);
        return { success: true }
    } catch (error) {
        return { error }
    }
}

export const addCategory = async (category: CategoryModel) => {
    const query = `INSERT INTO CATEGORIES (name, description) VALUES (?, ?)`;
    const values = [category.name, category.description];
    try {
        await insertQuery(query, values);
        return { success: true };
    } catch (error) {
       return { error };
    }
}

export const createCategoryTable = () => {
    const createItemTableQuery = `
            CREATE TABLE CATEGORIES (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                desciption TEXT
            )`;
   db.run(createItemTableQuery);
}

export const createItemTable = () => {
    const createItemTableQuery = `
            CREATE TABLE ITEMS (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                image TEXT NOT NULL,
                createDate DATE NOT NULL,
                updateDate DATE NOT NULL
            )`;
   db.run(createItemTableQuery);
}

export default {
    addItem,
    createItemTable
}