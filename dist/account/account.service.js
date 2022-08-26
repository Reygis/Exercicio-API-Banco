"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.withdraw = exports.deposit = exports.remove = exports.update = exports.create = exports.find = exports.findAll = void 0;
const cc_class_1 = require("./cc.class");
const cp_class_1 = require("./cp.class");
const cliente_class_1 = require("../client/cliente.class");
let accounts = {
    1: new cc_class_1.Cc('01', '01', new cliente_class_1.Client("Paulo", "Oliveira", "000.000.000-00"), 1),
    2: new cp_class_1.Cp('02', '01', new cliente_class_1.Client("João", "Nunes", "111.111.111-11"), 2)
};
const findAll = () => __awaiter(void 0, void 0, void 0, function* () { return Object.values(accounts); });
exports.findAll = findAll;
const find = (id) => __awaiter(void 0, void 0, void 0, function* () { return accounts[id]; });
exports.find = find;
const create = (newAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const id = newAccount.getId();
    accounts[id] = newAccount;
    return accounts[id];
});
exports.create = create;
const update = (id, accountUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        return null;
    accounts[id] = accountUpdate;
    return accounts[id];
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        return null;
    delete accounts[id];
});
exports.remove = remove;
const deposit = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        return null;
    return account.deposit(value);
});
exports.deposit = deposit;
const withdraw = (id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, exports.find)(id);
    if (!account)
        return null;
    return account.withdraw(value);
});
exports.withdraw = withdraw;
const transfer = (id_donator, id_receiver, value) => __awaiter(void 0, void 0, void 0, function* () {
    const accountDonator = yield (0, exports.find)(id_donator);
    const accountReceiver = yield (0, exports.find)(id_receiver);
    if (!accountDonator && !accountReceiver && accountDonator == accountReceiver)
        return null;
    return (accountDonator.withdraw(value), accountReceiver.deposit(value));
});
exports.transfer = transfer;
