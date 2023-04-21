import { z } from 'zod';


export const TransactionSchema = z.object({
    userId: z.number(),
    dateTime: z.date(),
    totalPrice: z.number(),
    customerName: z.string().optional(),
});

export type TransactionModel = z.infer<typeof TransactionSchema>;

export const TransactionItemSchema = z.object({
    transactionId: z.number(),
    itemId: z.number(),
    quantity: z.number(),
    price: z.number()
});

export type TransactionItemModel = z.infer<typeof TransactionItemSchema>;


  