import { CategorySchema, ItemSchema } from '../models/item.model';
import { publicProcedure, router } from '../trpc';
import { addCategory, addItem, createCategoryTable, createItemTable } from '../db/item.db';
import multer from 'multer';

const storage = multer.diskStorage({
    destination:  (req: Express.Request, file: any, callback: (error: Error | null, destination: string) => void) => {
        callback(null, './public/images')
    },  
    filename: (req: Express.Request, file: any, callback: (error: Error | null, destination: string) => void) => {
        callback(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({ storage: storage });

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
        // Temporary approach will convert to folder base upload once done
        // (upload.single('image'), req, null, (err: any) => {
        //     console.log(err);
        // });
        const result = await addCategory(req.input);
        if (result.success) {
            return {result: {
                success: true
            }};
        } else {
            return { error: result.error };
        }
    }),
    getCategory: publicProcedure.query((req) => {
        createCategoryTable();
        return 'get category'
    }),
})