import { CategorySchema, ItemSchema } from '../models/item.model';
import { publicProcedure, router } from '../trpc';
import { addCategory, addItem, createCategoryTable, createItemTable } from '../db/item.db';

export const ItemRoutes = router({
    addItem: publicProcedure.input(ItemSchema).mutation(async (req) => {
        const result = await addItem(req.input);
        if (result.success) {
            return req.input;
        } else {
            return { error: result.error };
        }
    }),
    getItem: publicProcedure.query((req) => {
        createItemTable();
        return 'get item'
    }),
    addCategory: publicProcedure.input(CategorySchema).mutation(async (req) => {
        const result = await addCategory(req.input);
        if (result.success) {
            return req.input;
        } else {
            return { error: result.error };
        }
    }),
    getCategory: publicProcedure.query((req) => {
        createCategoryTable();
        return 'get category'
    }),
})