"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Router, Request, Response } from 'express';
const accounts_router_1 = require("./account/accounts.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(accounts_router_1.accountsRouter);
app.listen(5000, () => console.log("Server running on port 5000"));
