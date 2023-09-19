
use soroban_sdk::{ /* log, symbol_short,  */
    Env, /* Symbol,  */Address, String };

use crate::storage_types::{ INSTANCE_BUMP_AMOUNT, WorkStatus, WorkInfo, DataKey };


pub fn work_create(
    e: &Env, 
    participant: &Address, 
    bounty_id: u32
) -> u32 {
    // write work info
    let work_count: u32 = e.storage().instance().get(&DataKey::WorkCount).unwrap_or(0);
    let work_id: u32 = work_count;

    work_write(
        e,
        work_id,
        &WorkInfo {
            participant: participant.clone(), 
            bounty_id: bounty_id, 
            status: WorkStatus::APPLIED, 
            work_repo: String::from_slice(&e, "")
        },
    );
    
    // increase work count
    e.storage().instance().set(&DataKey::WorkCount, &(work_count + 1));
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT, INSTANCE_BUMP_AMOUNT);

    work_id
}


pub fn work_get(e: &Env, key: u32) -> WorkInfo {
    e.storage().instance().get(&DataKey::RegWorks(key)).unwrap()
}

pub fn work_write(e: &Env, key: u32, work: &WorkInfo) {
    e.storage().instance().set(&DataKey::RegWorks(key), work);
    e.storage().instance().bump(INSTANCE_BUMP_AMOUNT, INSTANCE_BUMP_AMOUNT);
}
