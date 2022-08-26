import {Cc} from "./cc.class";
import {Cp} from "./cp.class";
import { Accounts } from "./accounts.interface";
import { Account } from "./account.class";
import { Client } from "../client/cliente.class";

let accounts: Accounts = {
    1: new Cc('01','01', new Client("Paulo", "Oliveira", "000.000.000-00"),1),
    2: new Cp('02','01', new Client("João", "Nunes", "111.111.111-11"),2)
}

export const findAll = async () : Promise<Accounts> => Object.values(accounts)
export const find = async (id:number): Promise<Account> => accounts[id]
export const create = async (newAccount : Cp | Cc): Promise<Account> => {
    const id = newAccount.getId()
           
    accounts[id] = newAccount

    return accounts[id]
}
export const update = async (id: number, accountUpdate: Account): Promise<Account | null> =>{
    const account = await find(id);

    if (!account) return null;

    accounts[id] = accountUpdate

    return accounts[id]
}
export const remove = async(id: number): Promise<null | void> => {
    const account = await find(id);
    
    if (!account) return null;

    delete accounts[id]
}
export const deposit =async (id:number, value:number):Promise<number | null> => {
    const account = await find(id)

    if(!account) return null;

    return account.deposit(value)
}
export const withdraw = async (id:number, value:number):Promise<number | null> =>{
    const account = await find(id)

    if(!account) return null;

    return account.withdraw(value)
}
export const transfer = async (id_donator:number, id_receiver:number, value:number):Promise<any> =>{
    const accountDonator = await find(id_donator)
    const accountReceiver = await find(id_receiver)

    if(!accountDonator && !accountReceiver && accountDonator == accountReceiver) return null;
    
    return(accountDonator.withdraw(value), accountReceiver.deposit(value))
}