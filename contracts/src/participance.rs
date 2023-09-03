use soroban_sdk::{ /* log,  */Env, Address };

use crate::storage_types::{ /* INSTANCE_BUMP_AMOUNT,  */DataKey, Error };


pub fn participance_set(e: &Env, participant: &Address, bounty_id: u32) -> Error {
    let key = DataKey::Participance(participant.clone(), bounty_id);
    
    if e.storage().instance().has(&key) && e.storage().instance().get::<_, bool>(&key).unwrap() {
        // log!(&e, "participant has already taken part in");
        return Error::AlreadyParticipated;
    }

    e.storage().instance().set(&key, &true);

    Error::Success
}

// pub fn participance_reset(e: &Env, participant: &Address, bounty_id: u32) -> Error {
//     let key = DataKey::Participance(participant.clone(), bounty_id);

//     if !e.storage().instance().has(&key) || !e.storage().instance().get::<_, bool>(&key).unwrap() {
//         // log!(&e, "participant hasn't taken part in");
//         return Error::NotParticipated;
//     }

//     e.storage().instance().set(&key, &false);
//     e.storage().instance().bump(INSTANCE_BUMP_AMOUNT);

//     Error::Success
// }

pub fn participance_get(e: &Env, participant: &Address, bounty_id: u32) -> bool {
    let key = DataKey::Participance(participant.clone(), bounty_id);
    
    if e.storage().instance().has(&key) && e.storage().instance().get::<_, bool>(&key).unwrap() {
        true
    }
    else {
        false
    }
}
