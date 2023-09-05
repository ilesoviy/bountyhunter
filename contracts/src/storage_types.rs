use soroban_sdk::{ contracttype, Address, String };


pub(crate) const FEE_DECIMALS: u32 = 4;     // fee is described with the unit of 0.01%
pub(crate) const DEF_FEE_RATE: u32 = 30;    // default fee is 0.3%
pub(crate) const TOKEN_DECIMALS: u32 = 4;

pub(crate) const INSTANCE_BUMP_AMOUNT: u32 = 34560; // 2 days


#[derive(Clone, Copy, PartialEq, Debug)]
#[contracttype]
pub enum Error {
    Success = 0,

    GetErrorFailed = 100,

    // admin
    IncorrectAdmin = 110,
    InvalidAdmin = 111,
    // Fee
    FeeNotSet = 115,
    
    // Work
    WorkNotFound = 120,
    AlreadyApplied = 121,
    NotApplied = 122,
    
    // Bounty
    BountyNotFound = 130,
    InvalidBountyStatus = 131,
    EmptyName = 132,
    ZeroReward = 133,
    ZeroDeadline = 134,
    InsuffCreatorBalance = 135,
    InsuffCreatorAllowance = 136,
    InvalidCreator = 137,
    InvalidParticipant = 138,
    InvalidBountyID = 139,
    InvalidWorkRepo = 140,
    NoTimeout = 141
}

#[derive(Clone)]
#[contracttype]
pub struct FeeInfo {                                                                                                                                                                                                                                                                                                                                                                              
    pub fee_rate: u32,
    pub fee_wallet: Address,
}

#[derive(Clone, Copy, PartialEq)]
#[contracttype]
pub enum BountyStatus {
    INIT = 0,
    ACTIVE = 1,
    CANCELLED = 2,
    COMPLETE = 3,
    CLOSED = 4
}

#[derive(Clone, Copy, PartialEq)]
#[contracttype]
pub enum WorkStatus {
    INIT = 0,
    APPLIED = 1,
    SUBMITTED = 2,
    APPROVED = 3,
    REJECTED = 4
}


#[derive(Clone)]
#[contracttype]
pub struct BountyInfo {
    pub creator: Address,
    
    pub name: String,
    pub reward_amount: u64,
    pub pay_token: Address,
    pub end_date: u64,

    pub status: BountyStatus
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
    Admin,
    Fee,
    BountyCount,
    RegBounties(u32),
    WorkCount,
    RegWorks(u32)
}
