import { ContractSpec, Address } from 'soroban-client';
import { Buffer } from "buffer";
import { invoke } from './invoke.js';
export * from './invoke.js';
export * from './method-options.js';
export { Address };
;
;
export class Ok {
    value;
    constructor(value) {
        this.value = value;
    }
    unwrapErr() {
        throw new Error('No error');
    }
    unwrap() {
        return this.value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return !this.isOk();
    }
}
export class Err {
    error;
    constructor(error) {
        this.error = error;
    }
    unwrapErr() {
        return this.error;
    }
    unwrap() {
        throw new Error(this.error.message);
    }
    isOk() {
        return false;
    }
    isErr() {
        return !this.isOk();
    }
}
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
const regex = /Error\(Contract, #(\d+)\)/;
function parseError(message) {
    const match = message.match(regex);
    if (!match) {
        return undefined;
    }
    if (Errors === undefined) {
        return undefined;
    }
    let i = parseInt(match[1], 10);
    let err = Errors[i];
    if (err) {
        return new Err(err);
    }
    return undefined;
}
export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CBAXERCQJFTHAE6X2VKURINWKQEK7OH3XPXH3PHOUPVKGYX2S57YFT7U",
    }
};
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Success"] = 0] = "Success";
    ErrorCode[ErrorCode["GetErrorFailed"] = 100] = "GetErrorFailed";
    ErrorCode[ErrorCode["IncorrectAdmin"] = 110] = "IncorrectAdmin";
    ErrorCode[ErrorCode["InvalidAdmin"] = 111] = "InvalidAdmin";
    ErrorCode[ErrorCode["FeeNotSet"] = 115] = "FeeNotSet";
    ErrorCode[ErrorCode["WorkNotFound"] = 120] = "WorkNotFound";
    ErrorCode[ErrorCode["AlreadyApplied"] = 121] = "AlreadyApplied";
    ErrorCode[ErrorCode["NotApplied"] = 122] = "NotApplied";
    ErrorCode[ErrorCode["BountyNotFound"] = 130] = "BountyNotFound";
    ErrorCode[ErrorCode["NoApplyToSelfBounty"] = 131] = "NoApplyToSelfBounty";
    ErrorCode[ErrorCode["InvalidBountyStatus"] = 132] = "InvalidBountyStatus";
    ErrorCode[ErrorCode["EmptyName"] = 133] = "EmptyName";
    ErrorCode[ErrorCode["ZeroReward"] = 134] = "ZeroReward";
    ErrorCode[ErrorCode["ZeroDeadline"] = 135] = "ZeroDeadline";
    ErrorCode[ErrorCode["InsuffCreatorBalance"] = 136] = "InsuffCreatorBalance";
    ErrorCode[ErrorCode["InsuffCreatorAllowance"] = 137] = "InsuffCreatorAllowance";
    ErrorCode[ErrorCode["InvalidCreator"] = 138] = "InvalidCreator";
    ErrorCode[ErrorCode["InvalidParticipant"] = 139] = "InvalidParticipant";
    ErrorCode[ErrorCode["InvalidBountyID"] = 140] = "InvalidBountyID";
    ErrorCode[ErrorCode["InvalidWorkRepo"] = 141] = "InvalidWorkRepo";
    ErrorCode[ErrorCode["NoTimeout"] = 142] = "NoTimeout";
})(ErrorCode || (ErrorCode = {}));
export var BountyStatus;
(function (BountyStatus) {
    BountyStatus[BountyStatus["INIT"] = 0] = "INIT";
    BountyStatus[BountyStatus["ACTIVE"] = 1] = "ACTIVE";
    BountyStatus[BountyStatus["CANCELLED"] = 2] = "CANCELLED";
    BountyStatus[BountyStatus["COMPLETE"] = 3] = "COMPLETE";
    BountyStatus[BountyStatus["CLOSED"] = 4] = "CLOSED";
})(BountyStatus || (BountyStatus = {}));
export var WorkStatus;
(function (WorkStatus) {
    WorkStatus[WorkStatus["INIT"] = 0] = "INIT";
    WorkStatus[WorkStatus["APPLIED"] = 1] = "APPLIED";
    WorkStatus[WorkStatus["SUBMITTED"] = 2] = "SUBMITTED";
    WorkStatus[WorkStatus["APPROVED"] = 3] = "APPROVED";
    WorkStatus[WorkStatus["REJECTED"] = 4] = "REJECTED";
})(WorkStatus || (WorkStatus = {}));
const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
            "AAAAAwAAAAAAAAAAAAAACUVycm9yQ29kZQAAAAAAABUAAAAAAAAAB1N1Y2Nlc3MAAAAAAAAAAAAAAAAOR2V0RXJyb3JGYWlsZWQAAAAAAGQAAAAAAAAADkluY29ycmVjdEFkbWluAAAAAABuAAAAAAAAAAxJbnZhbGlkQWRtaW4AAABvAAAAAAAAAAlGZWVOb3RTZXQAAAAAAABzAAAAAAAAAAxXb3JrTm90Rm91bmQAAAB4AAAAAAAAAA5BbHJlYWR5QXBwbGllZAAAAAAAeQAAAAAAAAAKTm90QXBwbGllZAAAAAAAegAAAAAAAAAOQm91bnR5Tm90Rm91bmQAAAAAAIIAAAAAAAAAE05vQXBwbHlUb1NlbGZCb3VudHkAAAAAgwAAAAAAAAATSW52YWxpZEJvdW50eVN0YXR1cwAAAACEAAAAAAAAAAlFbXB0eU5hbWUAAAAAAACFAAAAAAAAAApaZXJvUmV3YXJkAAAAAACGAAAAAAAAAAxaZXJvRGVhZGxpbmUAAACHAAAAAAAAABRJbnN1ZmZDcmVhdG9yQmFsYW5jZQAAAIgAAAAAAAAAFkluc3VmZkNyZWF0b3JBbGxvd2FuY2UAAAAAAIkAAAAAAAAADkludmFsaWRDcmVhdG9yAAAAAACKAAAAAAAAABJJbnZhbGlkUGFydGljaXBhbnQAAAAAAIsAAAAAAAAAD0ludmFsaWRCb3VudHlJRAAAAACMAAAAAAAAAA9JbnZhbGlkV29ya1JlcG8AAAAAjQAAAAAAAAAJTm9UaW1lb3V0AAAAAAAAjg==",
            "AAAAAQAAAAAAAAAAAAAAB0ZlZUluZm8AAAAAAgAAAAAAAAAIZmVlX3JhdGUAAAAEAAAAAAAAAApmZWVfd2FsbGV0AAAAAAAT",
            "AAAAAwAAAAAAAAAAAAAADEJvdW50eVN0YXR1cwAAAAUAAAAAAAAABElOSVQAAAAAAAAAAAAAAAZBQ1RJVkUAAAAAAAEAAAAAAAAACUNBTkNFTExFRAAAAAAAAAIAAAAAAAAACENPTVBMRVRFAAAAAwAAAAAAAAAGQ0xPU0VEAAAAAAAE",
            "AAAAAwAAAAAAAAAAAAAACldvcmtTdGF0dXMAAAAAAAUAAAAAAAAABElOSVQAAAAAAAAAAAAAAAdBUFBMSUVEAAAAAAEAAAAAAAAACVNVQk1JVFRFRAAAAAAAAAIAAAAAAAAACEFQUFJPVkVEAAAAAwAAAAAAAAAIUkVKRUNURUQAAAAE",
            "AAAAAQAAAAAAAAAAAAAACkJvdW50eUluZm8AAAAAAAYAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAIZW5kX2RhdGUAAAAGAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAJcGF5X3Rva2VuAAAAAAAAEwAAAAAAAAANcmV3YXJkX2Ftb3VudAAAAAAAAAYAAAAAAAAABnN0YXR1cwAAAAAH0AAAAAxCb3VudHlTdGF0dXM=",
            "AAAAAQAAAAAAAAAAAAAACFdvcmtJbmZvAAAABAAAAAAAAAAJYm91bnR5X2lkAAAAAAAABAAAAAAAAAALcGFydGljaXBhbnQAAAAAEwAAAAAAAAAGc3RhdHVzAAAAAAfQAAAACldvcmtTdGF0dXMAAAAAAAAAAAAJd29ya19yZXBvAAAAAAAAEA==",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABwAAAAAAAAAAAAAACUVycm9yQ29kZQAAAAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAADRmVlAAAAAAAAAAAAAAAAC0JvdW50eUNvdW50AAAAAAEAAAAAAAAAC1JlZ0JvdW50aWVzAAAAAAEAAAAEAAAAAAAAAAAAAAAJV29ya0NvdW50AAAAAAAAAQAAAAAAAAAIUmVnV29ya3MAAAABAAAABA==",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAgAAAAAAAAAJb2xkX2FkbWluAAAAAAAAEwAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAEAAAfQAAAACUVycm9yQ29kZQAAAA==",
            "AAAAAAAAAAAAAAAHc2V0X2ZlZQAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAACGZlZV9yYXRlAAAABAAAAAAAAAAKZmVlX3dhbGxldAAAAAAAEwAAAAEAAAfQAAAACUVycm9yQ29kZQAAAA==",
            "AAAAAAAAAAAAAAAHZ2V0X2ZlZQAAAAAAAAAAAQAAA+0AAAACAAAABAAAABM=",
            "AAAAAAAAAAAAAAAOZ2V0X2xhc3RfZXJyb3IAAAAAAAAAAAABAAAABA==",
            "AAAAAAAAAAAAAAAQcmVzZXRfbGFzdF9lcnJvcgAAAAAAAAAA",
            "AAAAAAAAAAAAAAAOY291bnRfYm91bnRpZXMAAAAAAAAAAAABAAAABA==",
            "AAAAAAAAAAAAAAALY291bnRfd29ya3MAAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAANY3JlYXRlX2JvdW50eQAAAAAAAAYAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAEbmFtZQAAABAAAAAAAAAABnJld2FyZAAAAAAABgAAAAAAAAAJcGF5X3Rva2VuAAAAAAAAEwAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAAAAABFleHBpcmF0aW9uX2xlZGdlcgAAAAAAAAQAAAABAAAABA==",
            "AAAAAAAAAAAAAAAMYXBwbHlfYm91bnR5AAAAAgAAAAAAAAALcGFydGljaXBhbnQAAAAAEwAAAAAAAAAJYm91bnR5X2lkAAAAAAAABAAAAAEAAAAE",
            "AAAAAAAAAAAAAAALc3VibWl0X3dvcmsAAAAAAwAAAAAAAAALcGFydGljaXBhbnQAAAAAEwAAAAAAAAAHd29ya19pZAAAAAAEAAAAAAAAAAl3b3JrX3JlcG8AAAAAAAAQAAAAAQAAB9AAAAAJRXJyb3JDb2RlAAAA",
            "AAAAAAAAAAAAAAAMYXBwcm92ZV93b3JrAAAAAgAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAAAAAAd3b3JrX2lkAAAAAAQAAAABAAAH0AAAAAlFcnJvckNvZGUAAAA=",
            "AAAAAAAAAAAAAAALcmVqZWN0X3dvcmsAAAAAAgAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAAAAAAd3b3JrX2lkAAAAAAQAAAABAAAH0AAAAAlFcnJvckNvZGUAAAA=",
            "AAAAAAAAAAAAAAANY2FuY2VsX2JvdW50eQAAAAAAAAIAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAJYm91bnR5X2lkAAAAAAAABAAAAAEAAAfQAAAACUVycm9yQ29kZQAAAA==",
            "AAAAAAAAAAAAAAAMY2xvc2VfYm91bnR5AAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAlib3VudHlfaWQAAAAAAAAEAAAAAQAAB9AAAAAJRXJyb3JDb2RlAAAA",
            "AAAAAAAAAAAAAAAOdG9rZW5fYmFsYW5jZXMAAAAAAAIAAAAAAAAAB2FjY291bnQAAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAQAAAAY="
        ]);
    }
    async setAdmin({ old_admin, new_admin }, options = {}) {
        return await invoke({
            method: 'set_admin',
            args: this.spec.funcArgsToScVals("set_admin", { old_admin, new_admin }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("set_admin", xdr);
            },
        });
    }
    async setFee({ admin, fee_rate, fee_wallet }, options = {}) {
        return await invoke({
            method: 'set_fee',
            args: this.spec.funcArgsToScVals("set_fee", { admin, fee_rate, fee_wallet }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("set_fee", xdr);
            },
        });
    }
    async getFee(options = {}) {
        return await invoke({
            method: 'get_fee',
            args: this.spec.funcArgsToScVals("get_fee", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_fee", xdr);
            },
        });
    }
    async getLastError(options = {}) {
        return await invoke({
            method: 'get_last_error',
            args: this.spec.funcArgsToScVals("get_last_error", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("get_last_error", xdr);
            },
        });
    }
    async resetLastError(options = {}) {
        return await invoke({
            method: 'reset_last_error',
            args: this.spec.funcArgsToScVals("reset_last_error", {}),
            ...options,
            ...this.options,
            parseResultXdr: () => { },
        });
    }
    async countBounties(options = {}) {
        return await invoke({
            method: 'count_bounties',
            args: this.spec.funcArgsToScVals("count_bounties", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("count_bounties", xdr);
            },
        });
    }
    async countWorks(options = {}) {
        return await invoke({
            method: 'count_works',
            args: this.spec.funcArgsToScVals("count_works", {}),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("count_works", xdr);
            },
        });
    }
    async createBounty({ creator, name, reward, pay_token, deadline, expiration_ledger }, options = {}) {
        return await invoke({
            method: 'create_bounty',
            args: this.spec.funcArgsToScVals("create_bounty", { creator, name, reward, pay_token, deadline, expiration_ledger }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("create_bounty", xdr);
            },
        });
    }
    async applyBounty({ participant, bounty_id }, options = {}) {
        return await invoke({
            method: 'apply_bounty',
            args: this.spec.funcArgsToScVals("apply_bounty", { participant, bounty_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("apply_bounty", xdr);
            },
        });
    }
    async submitWork({ participant, work_id, work_repo }, options = {}) {
        return await invoke({
            method: 'submit_work',
            args: this.spec.funcArgsToScVals("submit_work", { participant, work_id, work_repo }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("submit_work", xdr);
            },
        });
    }
    async approveWork({ creator, work_id }, options = {}) {
        return await invoke({
            method: 'approve_work',
            args: this.spec.funcArgsToScVals("approve_work", { creator, work_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("approve_work", xdr);
            },
        });
    }
    async rejectWork({ creator, work_id }, options = {}) {
        return await invoke({
            method: 'reject_work',
            args: this.spec.funcArgsToScVals("reject_work", { creator, work_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("reject_work", xdr);
            },
        });
    }
    async cancelBounty({ creator, bounty_id }, options = {}) {
        return await invoke({
            method: 'cancel_bounty',
            args: this.spec.funcArgsToScVals("cancel_bounty", { creator, bounty_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("cancel_bounty", xdr);
            },
        });
    }
    async closeBounty({ admin, bounty_id }, options = {}) {
        return await invoke({
            method: 'close_bounty',
            args: this.spec.funcArgsToScVals("close_bounty", { admin, bounty_id }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("close_bounty", xdr);
            },
        });
    }
    async tokenBalances({ account, token }, options = {}) {
        return await invoke({
            method: 'token_balances',
            args: this.spec.funcArgsToScVals("token_balances", { account, token }),
            ...options,
            ...this.options,
            parseResultXdr: (xdr) => {
                return this.spec.funcResToNative("token_balances", xdr);
            },
        });
    }
}
