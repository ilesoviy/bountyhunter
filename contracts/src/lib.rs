#![no_std]

mod storage_types;
mod admin;
mod fee;
mod work;
mod bounty;


use soroban_sdk::{
    token, contract, contractimpl, BytesN, 
    Env, Address, String
};
use crate::storage_types::{ /* INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT,  */FeeInfo, /* DataKey, */ ErrorCode };
use crate::admin::{ has_administrator, read_administrator, write_administrator };
use crate::fee::{ fee_check, fee_set, fee_get };
use crate::bounty::{
    /* bounty_count, */
    bounty_create, bounty_approve, bounty_reject, bounty_cancel, bounty_close, 
    bounty_apply, bounty_submit, 
    /* get_error, reset_error */
};
// use crate::work::{ work_count };


#[contract]
pub struct BountyHunter;

#[contractimpl]
impl BountyHunter {
    pub fn init(e: Env, admin: Address) {
        write_administrator(&e, &admin);
    }

    pub fn version() -> u32 {
        1
    }

    pub fn upgrade(e: Env, new_wasm_hash: BytesN<32>) {
        let admin: Address = read_administrator(&e);
        admin.require_auth();

        e.deployer().update_current_contract_wasm(new_wasm_hash);
    }

    // set admin
    pub fn set_admin(e: Env, new_admin: Address) -> Result<(), ErrorCode> {
        let admin: Address = read_administrator(&e);
        admin.require_auth();

        write_administrator(&e, &new_admin);
        Ok(())
    }

    // get admin
    pub fn get_admin(e: Env) -> Result<Address, ErrorCode> {
        if !has_administrator(&e) {
            return Err(ErrorCode::AdminNotSet)
        }

        let admin = read_administrator(&e);
        Ok(admin)
    }

    // only admin can set fee
    pub fn set_fee(e: Env, fee_rate: u32, fee_wallet: Address) -> Result<(), ErrorCode> {
        let admin: Address = read_administrator(&e);
        admin.require_auth();

        let fee_info: FeeInfo = FeeInfo {fee_rate, fee_wallet};
        fee_set(&e, &fee_info);

        return Ok(())
    }

    pub fn get_fee(e: Env) -> Result<(u32, Address), ErrorCode> {
        if !fee_check(&e) {
            return Err(ErrorCode::FeeNotSet)
        }

        let fee_info = fee_get(&e).unwrap();
        return Ok((fee_info.fee_rate, fee_info.fee_wallet))
    }

    // pub fn get_last_error(e: Env) -> u32 {
    //     get_error(&e)
    // }

    // pub fn reset_last_error(e: Env) {
    //     reset_error(&e)
    // }

    // pub fn count_bounties(e: Env) -> u32 {
    //     bounty_count(&e)
    // }

    // pub fn count_works(e: Env) -> u32 {
    //     work_count(&e)
    // }

    // return new bounty id on success, errorcode on failure
    pub fn create_bounty(e: Env, 
        creator: Address, 
        name: String, 
        reward: u64, 
        pay_token: Address, 
        deadline: u64/* , 
        expiration_ledger: u32 */
    ) -> Result<u32, ErrorCode> {
        let ret: Result<u32, ErrorCode> = bounty_create(&e, 
            &creator, 
            &name, 
            reward, 
            &pay_token, 
            deadline/* , 
            expiration_ledger */
        );

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    // returns work_id on success, errorcode on failure
    pub fn apply_bounty(e: Env, 
        participant: Address, 
        bounty_id: u32
    ) -> Result<u32, ErrorCode> {
        let ret: Result<u32, ErrorCode> = bounty_apply(&e, &participant, bounty_id);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    pub fn submit_work(e: Env, 
        participant: Address, 
        work_id: u32, 
        work_repo: String
    ) -> Result<i32, ErrorCode> {
        let ret: Result<i32, ErrorCode> = bounty_submit(&e, &participant, work_id, &work_repo);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    pub fn approve_work(e: Env, 
        creator: Address, 
        work_id: u32
    ) -> Result<i32, ErrorCode> {
        let ret: Result<i32, ErrorCode> = bounty_approve(&e, &creator, work_id);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    pub fn reject_work(e: Env, 
        creator: Address, 
        work_id: u32
    ) -> Result<i32, ErrorCode> {
        let ret: Result<i32, ErrorCode> = bounty_reject(&e, &creator, work_id);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    pub fn cancel_bounty(e: Env, 
        creator: Address, 
        bounty_id: u32
    ) -> Result<i32, ErrorCode> {
        let ret: Result<i32, ErrorCode> = bounty_cancel(&e, &creator, bounty_id);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
    }

    pub fn close_bounty(e: Env, 
        admin: Address, 
        bounty_id: u32
    ) -> Result<u32, ErrorCode> {
        let ret: Result<u32, ErrorCode> = bounty_close(&e, &admin, bounty_id);

        // e.storage().instance().set(&DataKey::ErrorCode, &ret);
        // e.storage().instance().bump(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        return ret
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
