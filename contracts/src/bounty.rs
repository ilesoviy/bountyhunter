const BOUNTY: Symbol = symbol_short!("BOUNTY");

use soroban_sdk::{
    log, token, symbol_short, 
    Env, Address, Symbol, String
};
use crate::storage_types::{ INSTANCE_BUMP_AMOUNT, FeeInfo, WorkStatus, WorkInfo, BountyStatus, BountyInfo, DataKey, ErrorCode };
use crate::fee::{ fee_check, fee_get, fee_calculate };
use crate::work::{ work_create, work_write, work_get };


pub fn get_error(
    e: &Env
) -> u32 {
    if !e.storage().instance().has(&DataKey::ErrorCode) {
        return ErrorCode::GetErrorFailed as u32;
    }

    let err_code: u32 = e.storage().instance().get(&DataKey::ErrorCode).unwrap_or(0);
    err_code
}

pub fn reset_error(
    e: &Env
) {
    e.storage().instance().set(&DataKey::ErrorCode, &0);
}

pub fn bounty_count(e: &Env
) -> u32 {
    let bounty_count: u32 = e.storage().instance().get(&DataKey::BountyCount).unwrap_or(0);
    bounty_count
}

pub fn work_count(e: &Env
) -> u32 {
    let work_count: u32 = e.storage().instance().get(&DataKey::WorkCount).unwrap_or(0);
    work_count
}

pub fn bounty_create(
    e: &Env, 
    creator: &Address, 
    name: &String, 
    reward_amount: u64, 
    pay_token: &Address, 
    deadline: u64
) -> u32 {
    // check args
    if name.len() == 0 {
        // panic!("empty name");
        return ErrorCode::EmptyName as u32
    }
    if reward_amount == 0 {
        // panic!("zero reward");
        return ErrorCode::ZeroReward as u32
    }
    if deadline == 0 {
        // panic!("zero deadline");
        return ErrorCode::ZeroDeadline as u32
    }

	if !fee_check(e) {
        // panic!("fee not set");
        return ErrorCode::FeeNotSet as u32
    }
    
    // Authorize the `create` call by creator to verify his/her identity.
    creator.require_auth();

	let fee_info: FeeInfo = fee_get(e);
    let fee_amount: u64 = fee_calculate(e, &fee_info.clone(), reward_amount);
    let transfer_amount: i128 = (reward_amount + fee_amount) as i128;
    
    let contract = e.current_contract_address();
    let pay_token_client = token::Client::new(e, &pay_token.clone());

    if pay_token_client.balance(&creator) < transfer_amount {
        // panic!("insufficient creator's balance");
        return ErrorCode::InsuffCreatorBalance as u32
    }
    if pay_token_client.allowance(&creator, &contract) < transfer_amount {
        // panic!("insufficient creator's allowance");
        return ErrorCode::InsuffCreatorAllowance as u32
    }

    pay_token_client.transfer(&creator, &contract, &(reward_amount as i128));
    pay_token_client.transfer(&creator, &fee_info.fee_wallet, &(fee_amount as i128));
    
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
            status: BountyStatus::ACTIVE
        },
    );
    
    // increase bounty count
    e.storage().instance().set(&DataKey::BountyCount, &(bounty_count + 1));
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT, INSTANCE_BUMP_AMOUNT);

    // emit BountyActive event
    e.events().publish((BOUNTY, symbol_short!("BActive")), 
        (creator.clone(), name.clone(), reward_amount, deadline, bounty_id)
    );

    bounty_id
}

pub fn bounty_apply(
    e: &Env, 
    participant: &Address, 
    bounty_id: u32
) -> u32 {
    // check args
    if !bounty_check(e, bounty_id) {
        // panic!("bounty not found");
        return ErrorCode::BountyNotFound as u32
    }

    let bounty = bounty_load(e, bounty_id);
    if bounty.creator == participant.clone() {
        // panic!("can't apply to self-created bounty!");
        return ErrorCode::NoApplyToSelfBounty as u32;
    }
    if bounty.status != BountyStatus::ACTIVE {
        // panic!("invalid bounty status");
        return ErrorCode::InvalidBountyStatus as u32
    }

    // Authorize the `create` call by participant to verify his/her identity.
    participant.require_auth();

    let ret: u32 = work_create(&e, &participant, bounty_id);

    e.storage().instance().set(&DataKey::ErrorCode, &ret);
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT, INSTANCE_BUMP_AMOUNT);
    
    // emit BountyApplied event
    e.events().publish((BOUNTY, symbol_short!("BApply")), 
        (participant.clone(), bounty_id, ret)
    );

    ret
}

pub fn bounty_submit(
    e: &Env, 
    participant: &Address, 
    work_id: u32, 
    work_repo: &String
) -> ErrorCode {
    // check args
    if work_repo.len() == 0 {
        // panic!("invalid repo");
        return ErrorCode::InvalidWorkRepo
    }
    
    let mut work = work_get(e, work_id);
    if work.participant != *participant {
        // panic!("invalid participant");
        return ErrorCode::InvalidParticipant
    }
    if work.status != WorkStatus::APPLIED {
        // panic!("not applied");
        return ErrorCode::NotApplied
    }

    participant.require_auth();

	work.status = WorkStatus::SUBMITTED;
    work_write(&e, work_id, &work);

    // emit WorkSubmitted event
    e.events().publish((BOUNTY, symbol_short!("WSubmit")), 
        (participant.clone(), work_id, work_repo.clone())
    );

    ErrorCode::Success
}

pub fn bounty_approve(e: &Env, 
    creator: &Address, 
    work_id: u32
) -> ErrorCode {
    if !e.storage().instance().has(&DataKey::RegWorks(work_id)) {
        // panic!("can't find work");
        return ErrorCode::WorkNotFound
    }
    let mut work: WorkInfo = work_get(e, work_id);

    if !e.storage().instance().has(&DataKey::RegBounties(work.bounty_id)) {
        // panic!("can't find bounty");
        return ErrorCode::BountyNotFound
    }
    let bounty: BountyInfo = bounty_load(e, work.bounty_id);
    if bounty.creator != *creator {
        // panic!("invalid creator");
        return ErrorCode::InvalidCreator;
    }
    if bounty.status != BountyStatus::ACTIVE {
        // panic!("invalid bounty status");
        return ErrorCode::InvalidBountyStatus
    }

    // if !fee_check(e) {
    //     // panic!("fee not set");
    //     return ErrorCode::FeeNotSet
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
    
    // emit WorkAccepted event
    e.events().publish((BOUNTY, symbol_short!("WApprove")), 
        (creator.clone(), work.bounty_id, work.participant, work_id)
    );

    ErrorCode::Success
}

pub fn bounty_reject(e: &Env, 
    creator: &Address, 
    work_id: u32
) -> ErrorCode {
    if !e.storage().instance().has(&DataKey::RegWorks(work_id)) {
        // panic!("can't find work");
        return ErrorCode::WorkNotFound;
    }
    let mut work: WorkInfo = work_get(e, work_id);

    if !e.storage().instance().has(&DataKey::RegBounties(work.bounty_id)) {
        // panic!("can't find bounty");
        return ErrorCode::BountyNotFound;
    }
    let bounty: BountyInfo = bounty_load(e, work.bounty_id);

    if bounty.status != BountyStatus::ACTIVE {
        // panic!("invaid bounty status");
        return ErrorCode::InvalidBountyStatus;
    }
    
    creator.require_auth();

    work.status = WorkStatus::REJECTED;
    work_write(e, work_id, &work);

    // emit WorkRejected event
    e.events().publish((BOUNTY, symbol_short!("WReject")), 
        (creator.clone(), work.bounty_id, work.participant, work_id)
    );

    ErrorCode::Success
}

pub fn bounty_cancel(e: &Env, 
    creator: &Address, 
    bounty_id: u32
) -> ErrorCode {
    if !e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        // panic!("can't find bounty");
        return ErrorCode::BountyNotFound;
    }
    let mut bounty = bounty_load(e, bounty_id);

    if bounty.creator != *creator {
        // panic!("invalid creator");
        return ErrorCode::InvalidCreator
    }
    if bounty.status != BountyStatus::ACTIVE {
        // panic!("invalid bounty status");
        return ErrorCode::InvalidBountyStatus
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

    ErrorCode::Success
}

pub fn bounty_close(e: &Env, 
    admin: &Address, 
    bounty_id: u32
) -> ErrorCode {
    if !e.storage().instance().has(&DataKey::RegBounties(bounty_id)) {
        // panic!("can't find bounty");
        return ErrorCode::BountyNotFound
    }
    let mut bounty: BountyInfo = bounty_load(e, bounty_id);

    if bounty.status != BountyStatus::ACTIVE {
        // panic!("bounty not available");
        return ErrorCode::InvalidBountyStatus
    }
    if bounty.end_date > e.ledger().timestamp() {
        // panic!("bounty not timeout");
        return ErrorCode::NoTimeout
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

    ErrorCode::Success
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
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT, INSTANCE_BUMP_AMOUNT);
}
