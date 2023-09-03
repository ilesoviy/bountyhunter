#![no_std]

mod storage_types;
mod fee;
mod participance;
mod work;
mod bounty;


use soroban_sdk::{
    token, contract, contractimpl, 
    Address, Env, String
};
use crate::storage_types::{ INSTANCE_BUMP_AMOUNT, FeeInfo, DataKey, Error };
use crate::fee::{ fee_set };
use crate::participance::{ participance_set };
use crate::bounty::{
    bounty_count, 
    bounty_create, bounty_fund, bounty_submit, bounty_approve, bounty_reject, bounty_cancel, bounty_close, 
    error
};


#[contract]
pub struct BountyHunter;

#[contractimpl]
impl BountyHunter {
    pub fn set_fee(e: Env, fee_rate: u32, fee_wallet: Address) {
        let fee_info: FeeInfo = FeeInfo {fee_rate, fee_wallet};
        fee_set(&e, &fee_info);
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
        // b_type: u32, 
        // difficulty: u32
    ) -> u32 {
        let ret: u32 = bounty_create(&e, 
            &creator, 
            &name, 
            reward, 
            &pay_token, 
            deadline, 
            // b_type, 
            // difficulty
        );

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn fund_bounty(e: Env, 
        creator: Address, 
        bounty_id: u32
    ) -> Error {
        let ret: Error = bounty_fund(&e, &creator, bounty_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    pub fn participate_bounty(e: Env, 
        participant: Address, 
        bounty_id: u32
    ) -> Error {
        let ret: Error = participance_set(&e, &participant, bounty_id);

        e.storage().instance().set(&DataKey::ErrorCode, &ret);
        e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

        ret
    }

    // returns work_id on success, errorcode on failure
    pub fn submit_work(e: Env, 
        participant: Address, 
        bounty_id: u32, 
        work_repo: String
    ) -> u32 {
        let ret: u32 = bounty_submit(&e, &participant, bounty_id, &work_repo);

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
