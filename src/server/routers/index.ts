import { mergeRouters } from '../trpc';
import { ItemRoutes } from './item';
import {   UserRoutes }  from './user';
import { TransactionRoutes } from './transaction';

export const routes = mergeRouters(UserRoutes, ItemRoutes);

export const userRoutes = mergeRouters(UserRoutes);

export const itemRoutes = mergeRouters(ItemRoutes);

export const transactionRoutes = mergeRouters(TransactionRoutes);



