#![no_std]

mod storage_types;
mod admin;
mod fee;
mod work;
mod bounty;


use soroban_sdk::{
    token, contract, contractimpl, 
    Env, Address, String
};
use crate::storage_types::{ INSTANCE_BUMP_AMOUNT, FeeInfo, DataKey, Error };
use crate::admin::{ has_administrator, read_administrator, write_administrator };
use crate::fee::{ fee_set };
use crate::bounty::{
    bounty_count,
    bounty_create, bounty_approve, bounty_reject, bounty_cancel, bounty_close,
    bounty_apply, bounty_submit,
    error
};


#[contract]
pub struct BountyHunter;

#[contractimpl]
impl BountyHunter {
    // set admin
    pub fn set_admin(e: Env, old_admin: Address, new_admin: Address) -> Error {
        if !has_administrator(&e) {
            write_administrator(&e, &new_admin);
            return Error::Success
        }

        let cur_admin = read_administrator(&e);
        if cur_admin != old_admin {
            // panic!("incorrect admin!");
            return Error::IncorrectAdmin
        }

        old_admin.require_auth();

        write_administrator(&e, &new_admin);
        return Error::Success
    }

    // only admin can set fee
    pub fn set_fee(e: Env, admin: Address, fee_rate: u32, fee_wallet: Address) -> Error {
        if !has_administrator(&e) {
            // panic!("invalid admin!");
            return Error::InvalidAdmin
        }

        let cur_admin = read_administrator(&e);
        if cur_admin != admin {
            // panic!("incorrect admin!");
            return Error::IncorrectAdmin
        }

        let fee_info: FeeInfo = FeeInfo {fee_rate, fee_wallet};
        fee_set(&e, &admin, &fee_info);

        return Error::Success
    }

    pub fn get_error(e: Env) -> u32 {
        error(&e)
    }

    pub fn count_bounties(e: Env) -> u32 {
        bounty_count(&e)
    }

    // return new bounty id on success, errorcode on failure
    pub fn create_bounty(e: Env, 
        creator: Address, 
        name: String, 
        reward: u64, 
        pay_token: Address, 
        deadline: u64, 
    ) -> u32 {
        let ret: u32 = bounty_create(&e, 
            &creator, 
            &name, 
            reward, 
            &pay_token, 
            deadline, 
        );

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    // returns work_id on success, errorcode on failure
    pub fn apply_bounty(e: Env, 
        participant: Address, 
        bounty_id: u32
    ) -> u32 {
        let ret: u32 = bounty_apply(&e, &participant, bounty_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn submit_work(e: Env, 
        participant: Address, 
        work_id: u32, 
        work_repo: String
    ) -> Error {
        let ret: Error = bounty_submit(&e, &participant, work_id, &work_repo);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn approve_work(e: Env, 
        creator: Address, 
        work_id: u32
    ) -> Error {
        let ret: Error = bounty_approve(&e, &creator, work_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn reject_work(e: Env, 
        creator: Address, 
        work_id: u32
    ) -> Error {
        let ret: Error = bounty_reject(&e, &creator, work_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn cancel_bounty(e: Env, 
        creator: Address, 
        bounty_id: u32
    ) -> Error {
        let ret: Error = bounty_cancel(&e, &creator, bounty_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn close_bounty(e: Env, 
        admin: Address, 
        bounty_id: u32
    ) -> Error {
        let ret: Error = bounty_close(&e, &admin, bounty_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    
    pub fn token_balances(e: Env, 
        account: Address, 
        token: Address, 
    ) -> u64 {
        let token_client = token::Client::new(&e, &token);
        token_client.balance(&account) as u64
    }
}


mod test;
