import express, { Request, Response } from "express";
import * as AccountService from './account.service';
import { Account } from "./account.class";
import { Cc } from "./cc.class";
import { Cp } from "./cp.class";
import { Accounts } from "./accounts.interface";
import { Client } from "../client/cliente.class";
import { parse } from "path";

export const accountsRouter = express.Router()

accountsRouter.get('/', async (req:Request, res: Response) => {
    try {
        const accounts: Accounts = await AccountService.findAll()

        return  res.status(200).send(accounts)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.get('/:id',async (req:Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const account: Account = await AccountService.find(id)

        if(account) return res.status(200).send(account);
        return res.status(404).send("Account not found")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
    
})

accountsRouter.post("/create", async(req: Request, res: Response) => {
    try {
        let id = new Date().valueOf();
        let client: Client = new Client(req.body.name, req.body.lastName, req.body.cpf)
        
        let account: Account
        if(req.body.type == 'cc'){
            account = new Cc(req.body.account_number, req.body.agency, client,id)
        } else{
            account = new Cp(req.body.account_number, req.body.agency, client,id)
        }

        const  newAccount = await AccountService.create(account)

        return res.status(201).json(newAccount)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.put("/:id",async (req: Request, res: Response) => {
    const id:number = parseInt(req.params.id, 10)
    
    try {
       
        const account: Account = await AccountService.find(id)
        if(account) {
            let accountUpdate: Account = new Account(req.body.account_number, req.body.agency, account.getClient(), account.getId())

            const updatedAccount = await AccountService.update(id, accountUpdate)
            return res.status(200).json(updatedAccount)
        } 

        return res.status(404).send("Account not found")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.delete("/:id", async(req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        const account: Account = await AccountService.find(id)

        if(account){
            await AccountService.remove(id)
            return res.status(204).send('Account deleted')
        }

        return res.status(404).send('Account not found')
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.post("/deposit/:id",async (req:Request, res:Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        const account: Account = await AccountService.find(id)
        if(account){
            const value:number = parseFloat(req.body.value)
            const balance:number | null = await AccountService.deposit(id, value)

            let message:string = value <= 0 ? "Error! Negative or empt value note allowed" : "Deposit made";
            return res.status(201).json({message: message, newBalance: balance})
        }
        return res.status(404).send('Account not found')
    } catch (error: any) {
        res.status(500).send(error.message)
    }
})

accountsRouter.post("/withdraw/:id",async (req: Request, res: Response) => {
    try {
        const id:number = parseInt(req.params.id, 10)

        const account: Account = await AccountService.find(id)
        if(account){
            const value:number = parseFloat(req.body.value)
            const balance:number | null = await AccountService.withdraw(id,value)
            
            let message:string = value <= 0 ? "Error! Negative or empt value note allowed" : "Withdraw made";
            return res.status(201).json({message: message, newBalance: balance})
        }
        return res.status(404).send('Account not found')
    } catch (error:any) {
        return res.status(500).send(error.message)
    }
})

accountsRouter.post("/transfer" , async (req: Request, res: Response) => {
    try {
        const id_donator:number = parseInt(req.body.id_donator, 10)
        const id_receiver:number = parseInt(req.body.id_receiver, 10)
        
        const account_donator: Account = await AccountService.find(id_donator)
        const account_receiver: Account = await AccountService.find(id_receiver)
        if(account_donator && account_receiver){
            const value:number = parseFloat(req.body.value)
            const balance_donator:number | null = await AccountService.withdraw(id_donator, value)
            const balance_receiver:number | null = await AccountService.deposit(id_receiver, value)

            let message:string = value <= 0 ? "Error! Negative or empt value note allowed" : "Transfer efetueted";
            return res.status(201).json({message: message, newBalanceOfDonator: balance_donator, newBalanceOfReceiver: balance_receiver})
        }
        return res.status(404).send("One or both of accounts was not found")
    } catch (error:any) {
        return res.status(500).send(error.message)        
    }
})