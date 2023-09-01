use soroban_sdk::{ contracttype, Address, String };


pub(crate) const FEE_DECIMALS: u32 = 4;     // fee is described with the unit of 0.01%
pub(crate) const DEF_FEE_RATE: u32 = 30;    // default fee is 0.3%
pub(crate) const TOKEN_DECIMALS: u32 = 4;

pub(crate) const INSTANCE_BUMP_AMOUNT: u32 = 34560; // 2 days


#[derive(Clone)]
#[contracttype]
pub enum Error {
    Success = 0,

    GetErrorFailed = 100,

    // Fee
    FeeNotSet = 110,
    
    // Participance
    AlreadyParticipated = 120,
    NotParticipated = 121,
    
    // Work
    WorkNotFound = 130,
    
    // Bounty
    BountyNotFound = 140,
    InvalidBountyStatus = 141,
    InvalidName = 142,
    InvalidReward = 143,
    InvalidDeadline = 144,
    InsuffCreatorBalance = 145,
    InsuffCreatorAllowance = 146,
    CreatorBountyMismatch = 147,
    InvalidBountyID = 148,
    InvalidWorkRepo = 149,
    NoTimeout = 150,
}

#[derive(Clone)]
#[contracttype]
pub struct FeeInfo {                                                                                                                                                                                                                                                                                                                                                                              
    pub fee_rate: u32,
    pub fee_wallet: Address,
}

// #[derive(Clone, Copy, PartialEq)]
// #[contracttype]
// pub enum BountyType {
//     NONE = 0,
//     COMPETITIVE = 1,
//     COOPERATIVE = 2,
//     HACKATHON = 3,
// }

// #[derive(Clone, Copy, PartialEq)]
// #[contracttype]
// pub enum BountyDifficulty {
//     NONE = 0, 
//     BEGINNER = 1, 
//     INTERMEDIATE = 2, 
//     ADVANCED = 3
// }

#[derive(Clone, Copy, PartialEq)]
#[contracttype]
pub enum BountyStatus {
    INIT = 0,
    CREATED = 1,
    FUNDED = 2,
    APPLIED = 3,
    SUBMITTED = 4,
    APPROVED = 5,
    REJECTED = 6,
    CANCELLED = 7,
    CLOSED = 8
}

#[derive(Clone, Copy, PartialEq)]
#[contracttype]
pub enum WorkStatus {
    INIT = 0,
    CREATED = 1,
    APPROVED = 2,
    REJECTED = 3
}


#[derive(Clone)]
#[contracttype]
pub struct BountyInfo {
    pub creator: Address,
    
    pub name: String,
    // pub description: String,
    // pub repo_link: String,
    pub reward_amount: u64,
    pub end_date: u64,
    // pub bounty_type: BountyType,
    // pub difficulty: BountyDifficulty,

    pub status: BountyStatus,

    pub pay_token: Address
}

#[derive(Clone)]
#[contracttype]
pub struct WorkInfo {
    pub participant: Address,
    pub bounty_id: u32,
    pub work_repo: String,
    pub status: WorkStatus
}


#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    ErrorCode,
    Fee,
    Participance(Address, u32),
    BountyCount,
    RegBounties(u32),
    WorkCount,
    RegWorks(u32)
}
