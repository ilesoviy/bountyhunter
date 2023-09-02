const BOUNTY: Symbol = symbol_short!("BOUNTY");

use soroban_sdk::{
    log, token, Address, Env, symbol_short, Symbol, String
};
use crate::storage_types::{ INSTANCE_BUMP_AMOUNT, FeeInfo, WorkStatus, WorkInfo, BountyStatus, BountyInfo, DataKey, Error };
use crate::fee::{ fee_check, fee_get, fee_calculate };
use crate::participance::{ participance_get };
use crate::work::{ work_create, work_write, work_get };


pub fn error(
    e: &Env
) -> u32 {
    if !e.storage().instance().has(&DataKey::ErrorCode) {
        return Error::GetErrorFailed as u32;
    }

    let err_code: u32 = e.storage().instance().get(&DataKey::ErrorCode).unwrap_or(0);
    err_code
}

pub fn bounty_count(e: &Env
) -> u32 {
    let bounty_count: u32 = e.storage().instance().get(&DataKey::BountyCount).unwrap_or(0);
    bounty_count
}

pub fn bounty_create(
    e: &Env, 
    creator: &Address, 
    name: &String, 
    reward_amount: u64, 
    pay_token: &Address, 
    deadline: u64, 
    // b_type: u32, 
    // difficulty: u32
) -> u32 {
    // check args
    if name.len() == 0 {
        // panic!("invalid name");
        return Error::InvalidName as u32
    }
    if reward_amount == 0 {
        // panic!("zero reward isn't allowed");
        return Error::InvalidReward as u32
    }
    if deadline == 0 {
        // panic!("invalid deadline");
        return Error::InvalidDeadline as u32
    }
    
    // Authorize the `create` call by creator to verify his/her identity.
    creator.require_auth();

    // write bounty info
    let bounty_count: u32 = e.storage().instance().get(&DataKey::BountyCount).unwrap_or(0);
    let bounty_id: u32 = bounty_count;

    bounty_write(
        e,
        bounty_id,
        &BountyInfo {
            creator: creator.clone(), 
            name: name.clone(), 
            reward_amount, 
            pay_token: pay_token.clone(), 
            end_date: deadline, 
            status: BountyStatus::CREATED
        },
    );
    
    // increase bounty count
    e.storage().instance().set(&DataKey::BountyCount, &(bounty_count + 1));
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

    // emit BountyCreated event
    e.events().publish((BOUNTY, symbol_short!("BCreate")), 
        (bounty_id, creator.clone(), name.clone(), reward_amount, deadline)
    );

    bounty_id
}

pub fn bounty_fund(
    e: &Env, 
    creator: &Address, 
    bounty_id: u32
) -> Error {
    if !fee_check(e) {
        // panic!("fee hasn't been set yet");
        return Error::FeeNotSet
    }

    if !e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        // panic!("can't find bounty");
        return Error::BountyNotFound
    }

    let mut bounty: BountyInfo = bounty_load(e, bounty_id);

    if bounty.creator != *creator {
        // panic!("creator and bounty mismatch");
        return Error::CreatorBountyMismatch
    }
    if bounty.status != BountyStatus::CREATED {
        // panic!("invalid bounty status");
        return Error::InvalidBountyStatus
    }

    creator.require_auth();

    let fee_info: FeeInfo = fee_get(e);
    let reward_amount: u64 = bounty.reward_amount;
    let fee_amount: u64 = fee_calculate(e, &fee_info, reward_amount);
    let transfer_amount: i128 = (reward_amount + fee_amount) as i128;
    
    let contract = e.current_contract_address();
    let pay_token_client = token::Client::new(e, &bounty.pay_token);

    if pay_token_client.balance(&creator) < transfer_amount {
        // panic!("creator's balance insufficient");
        return Error::InsuffCreatorBalance
    }
    if pay_token_client.allowance(&creator, &contract) < transfer_amount {
        // panic!("creator's allowance insufficient");
        return Error::InsuffCreatorAllowance
    }

    pay_token_client.transfer(&creator, &contract, &(reward_amount as i128));
    pay_token_client.transfer(&creator, &fee_info.fee_wallet, &(fee_amount as i128));

    bounty.status = BountyStatus::FUNDED;
    bounty_write(e, bounty_id, &bounty);

    // emit BountyFunded event
    e.events().publish((BOUNTY, symbol_short!("BFund")), 
        (creator.clone(), bounty_id, bounty.reward_amount)
    );

    Error::Success
}

pub fn bounty_submit(
    e: &Env, 
    participant: &Address, 
    bounty_id: u32, 
    work_repo: &String
) -> u32 {
    // check args
    if work_repo.len() == 0 {
        // panic!("invalid repo");
        return Error::InvalidWorkRepo as u32
    }
    
    if !participance_get(e, participant, bounty_id) {
        // panic!("not participated");
        return Error::NotParticipated as u32
    }

    if !bounty_check(e, bounty_id) {
        // panic!("bounty not found");
        return Error::BountyNotFound as u32
    }

    let bounty = bounty_load(e, bounty_id);
    if bounty.status != BountyStatus::FUNDED {
        // panic!("invalid bounty status");
        return Error::InvalidBountyStatus as u32
    }

    // Authorize the `create` call by participant to verify his/her identity.
    participant.require_auth();

    let ret: u32 = work_create(&e, &participant, bounty_id, &work_repo);

    e.storage().instance().set(&DataKey::ErrorCode, &ret);
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);// emit WorkCreated event
    
    e.events().publish((BOUNTY, symbol_short!("WCreate")), 
        (participant.clone(), bounty_id, work_repo.clone(), ret)
    );

    ret
}

pub fn bounty_approve(e: &Env, 
    creator: &Address, 
    work_id: u32
) -> Error {
    if !e.storage().instance().has(&DataKey::RegWorks(work_id)) {
        // panic!("can't find work");
        return Error::WorkNotFound
    }
    let mut work: WorkInfo = work_get(e, work_id);

    if !e.storage().instance().has(&DataKey::RegBounties(work.bounty_id)) {
        // panic!("can't find bounty");
        return Error::BountyNotFound
    }
    let mut bounty: BountyInfo = bounty_load(e, work.bounty_id);

    if bounty.creator != *creator {
        // panic!("creator and bounty mismatch");
        return Error::CreatorBountyMismatch;
    }
    if bounty.status != BountyStatus::FUNDED {
        // panic!("invalid bounty status");
        return Error::InvalidBountyStatus
    }

    // if !fee_check(e) {
    //     // panic!("fee isn't set");
    //     return Error::FeeNotSet
    // }
    
    creator.require_auth();

    let pay_token_client = token::Client::new(e, &bounty.pay_token);

    // let fee_info = fee_get(e);
    // let fee_amount: u64 = fee_calculate(&fee_info, bounty.reward_amount);
    let amount: u64 = bounty.reward_amount/*  - fee_amount */;
    let contract = e.current_contract_address();
    
    // pay_token_client.transfer(&contract, &fee_info.fee_wallet, &(fee_amount as i128));
    pay_token_client.transfer(&contract, &work.participant, &(amount as i128));

    work.status = WorkStatus::APPROVED;
    work_write(e, work_id, &work);
    
    bounty.status = BountyStatus::APPROVED;
    bounty_write(e, work.bounty_id, &bounty);

    // emit WorkAccepted event
    e.events().publish((BOUNTY, symbol_short!("WApprove")), 
        (creator.clone(), work.bounty_id, work.participant, work_id)
    );

    Error::Success
}

pub fn bounty_reject(e: &Env, 
    creator: &Address, 
    work_id: u32
) -> Error {
    if !e.storage().instance().has(&DataKey::RegWorks(work_id)) {
        // panic!("can't find work");
        return Error::WorkNotFound;
    }
    let mut work: WorkInfo = work_get(e, work_id);

    if !e.storage().instance().has(&DataKey::RegBounties(work.bounty_id)) {
        // panic!("can't find bounty");
        return Error::BountyNotFound;
    }
    let bounty: BountyInfo = bounty_load(e, work.bounty_id);

    if bounty.status != BountyStatus::FUNDED {
        // panic!("invaid bounty status");
        return Error::InvalidBountyStatus;
    }
    
    creator.require_auth();

    work.status = WorkStatus::REJECTED;
    work_write(e, work_id, &work);

    // emit WorkRejected event
    e.events().publish((BOUNTY, symbol_short!("WReject")), 
        (creator.clone(), work.bounty_id, work.participant, work_id)
    );

    Error::Success
}

pub fn bounty_cancel(e: &Env, 
    creator: &Address, 
    bounty_id: u32
) -> Error {
    if !e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        // panic!("can't find bounty");
        return Error::BountyNotFound;
    }
    let mut bounty = bounty_load(e, bounty_id);

    if bounty.creator != *creator {
        // panic!("creator and bounty mismatch");
        return Error::CreatorBountyMismatch
    }
    if bounty.status != BountyStatus::FUNDED {
        // panic!("invalid bounty status");
        return Error::InvalidBountyStatus
    }

    creator.require_auth();

    // refund to creator
    token::Client::new(e, &bounty.pay_token).transfer(
        &e.current_contract_address(), 
        &creator, 
        &(bounty.reward_amount as i128), 
    );

    bounty.status = BountyStatus::CANCELLED;
    bounty_write(e, bounty_id, &bounty);

    // emit BountyCancelled event
    e.events().publish((BOUNTY, symbol_short!("BCancel")), 
        (creator.clone(), bounty_id)
    );

    Error::Success
}

pub fn bounty_close(e: &Env, 
    admin: &Address, 
    bounty_id: u32
) -> Error {
    if !e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        // panic!("can't find bounty");
        return Error::BountyNotFound
    }
    let mut bounty: BountyInfo = bounty_load(e, bounty_id);

    if bounty.status != BountyStatus::FUNDED {
        // panic!("bounty not available");
        return Error::InvalidBountyStatus
    }
    if bounty.end_date > e.ledger().timestamp() {
        // panic!("bounty not timeout");
        return Error::NoTimeout
    }

    admin.require_auth();

    // refund to bounty creator
    token::Client::new(e, &bounty.pay_token).transfer(
        &e.current_contract_address(), 
        &bounty.creator, 
        &(bounty.reward_amount as i128), 
    );

    bounty.status = BountyStatus::CLOSED;
    bounty_write(e, bounty_id, &bounty);

    // emit BountyClosed event
    e.events().publish((BOUNTY, symbol_short!("BClose")), 
        (admin.clone(), bounty_id)
    );

    Error::Success
}


fn bounty_check(e: &Env, bounty_id: u32) -> bool {
    if e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        true
    }
    else {
        false
    }
}

fn bounty_load(e: &Env, key: u32) -> BountyInfo {
    e.storage().instance().get(&DataKey::RegBounties(key)).unwrap()
}

fn bounty_write(e: &Env, key: u32, bounty: &BountyInfo) {
    e.storage().instance().set(&DataKey::RegBounties(key), bounty);
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);
}
