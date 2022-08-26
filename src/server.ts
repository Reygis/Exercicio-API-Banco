import express from 'express';
// import { Router, Request, Response } from 'express';
import { accountsRouter } from './account/accounts.router';

const app = express()

app.use(express.json())

app.use(accountsRouter)

app.listen(5000, ()=> console.log("Server running on port 5000"))
