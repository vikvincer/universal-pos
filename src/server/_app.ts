import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
const express = require('express');
const path = require('path');
import { itemRoutes, routes, transactionRoutes, userRoutes } from './routers/index';
import cors from 'cors';

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const app = express();
app.use(cors()); 

app.use(express.static(path.join(__dirname,'../client')));
app.get('/admin', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/api/user',trpcExpress.createExpressMiddleware({router: userRoutes, createContext}),);
app.use('/api/item',trpcExpress.createExpressMiddleware({router: itemRoutes, createContext}),);
app.use('/api/transaction',trpcExpress.createExpressMiddleware({router: transactionRoutes, createContext}),);

app.listen(4000, (res: any, req: any) => {
  console.log('server is running');
});

export type AppRouter = typeof app;
