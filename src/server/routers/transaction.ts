import { addTransaction, createTransactionItemTable, createTransactionTable } from '../db/transtaction.db';
import { TransactionSchema } from '../models/transaction.model';
import { publicProcedure, router } from '../trpc';

export const TransactionRoutes = router({
    addTransaction: publicProcedure.input(TransactionSchema).mutation(async (req) => {  
        const result = await addTransaction(req.input);
        if (result.success) {
            return req.input;
        } else {
            return { error: result.error };
        }
    }),
    getTransaction: publicProcedure.query((req) => {
        return 'get transaction'
    }),
    createTransactionTable: publicProcedure.query( async(req) => {
       const result = await createTransactionTable();
        return 'create transaction table'
    }),

    createTransactionItemTable: publicProcedure.query( async(req) => {
        const result = await createTransactionItemTable();
        return 'create transaction table'
    }),

})