import { z } from 'zod';

export const ItemSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string(),
    createDate: z.date().default(new Date()),
    updateDate: z.date().default(new Date()),
    type: z.string(),
})

export const CategorySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    image: z.any().nullable().optional(),
})

export type CategoryModel = z.infer<typeof CategorySchema>;

export type ItemModel = z.infer<typeof ItemSchema>;