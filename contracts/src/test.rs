#![cfg(test)]
extern crate std;

use soroban_sdk::{ log, token };
use crate::storage_types::{ DEF_FEE_RATE, FEE_DECIMALS, TOKEN_DECIMALS, INSTANCE_BUMP_AMOUNT, FeeInfo, Error };
use crate::{ BountyHunter, BountyHunterClient };
use soroban_sdk::{
    symbol_short, Symbol,
    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation, Ledger, LedgerInfo},
    Address, Env, IntoVal, String
};


const MUL_VAL: u64 = u64::pow(10, TOKEN_DECIMALS);
const ONE_DAY: u64 = 60 * 60 * 24; // 60sec * 60min * 24hr


fn create_bounty_contract<'a>(
    e: &Env
) -> BountyHunterClient<'a> {
    let bounty_contract = BountyHunterClient::new(e, &e.register_contract(None, BountyHunter {}));

    bounty_contract
}

fn create_token_contract<'a>(
    e: &Env,
    admin: &Address
) -> (Address, token::Client<'a>, token::AdminClient<'a>) {
    let addr = e.register_stellar_asset_contract(admin.clone());
    (
        addr.clone(),
        token::Client::new(e, &addr),
        token::AdminClient::new(e, &addr)
    )
}

// timelock test
#[test]
fn test4() {
    let e = Env::default();
    e.mock_all_auths();

    let token_admin: Address = Address::random(&e);
    let creator: Address = Address::random(&e);
    
    // create contract
    let bounty_contract = create_bounty_contract(&e);

    // create pay token
    let pay_token = create_token_contract(&e, &token_admin);
    let pay_token_id: Address = pay_token.0;
    let pay_token_client = pay_token.1;
    let pay_token_admin_client = pay_token.2;
    pay_token_admin_client.mint(&creator.clone(), &(10000 * MUL_VAL as i128));
    pay_token_client.approve(&creator.clone(), &bounty_contract.address.clone(), &(10000 * MUL_VAL as i128), &INSTANCE_BUMP_AMOUNT);
    
    // init fee
    let fee_rate = DEF_FEE_RATE;
    let fee_wallet = Address::random(&e);
    bounty_contract.set_fee(&fee_rate, &fee_wallet);

    let old_timestamp = e.ledger().timestamp();
    let new_timestamp = old_timestamp + ONE_DAY * 5;

    // create bounty
    let bounty_id: u32 = bounty_contract.create_bounty(
        &creator,
        &String::from_slice(&e, "Test4"),
        &(1000 * MUL_VAL),
        &pay_token_id,
        &new_timestamp
    );
    assert_eq!(bounty_id, 0);

    // fund bounty
    let ret1 = bounty_contract.fund_bounty(
        &creator,
        &bounty_id
    );
    assert_eq!(ret1, Error::Success);
    // check transfer
    assert_eq!(
        e.auths(),
        std::vec![(
            creator.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    bounty_contract.address.clone(),
                    Symbol::new(&e, "fund_bounty"),
                    (
                        creator.clone(),
                        bounty_id
                    ).into_val(&e)
                )),
                sub_invocations: std::vec![
                    AuthorizedInvocation {
                        function: AuthorizedFunction::Contract((
                            pay_token_id.clone(),
                            symbol_short!("transfer"),
                            (
                                creator.clone(),
                                bounty_contract.address.clone(),
                                (1000 * MUL_VAL) as i128,
                            ).into_val(&e)
                        )),
                        sub_invocations: std::vec![]
                    },
                    AuthorizedInvocation {
                        function: AuthorizedFunction::Contract((
                            pay_token_id.clone(),
                            symbol_short!("transfer"),
                            (
                                creator.clone(),
                                fee_wallet.clone(),
                                (1000 * MUL_VAL * (fee_rate as u64) / u64::pow(10, FEE_DECIMALS)) as i128,
                            ).into_val(&e)
                        )),
                        sub_invocations: std::vec![],
                    }
                ]
            }
        )]
    );

    // advance time 5 days
    e.ledger().set(LedgerInfo {
        timestamp: new_timestamp,
        ..Default::default()
    });
    assert_eq!(new_timestamp, e.ledger().timestamp());

    // close bounty
    let ret2 = bounty_contract.close_bounty(
        &token_admin,
        &bounty_id
    );
    assert_eq!(ret2, Error::Success);
    assert_eq!(
        e.auths(),
        std::vec![(
            token_admin.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    bounty_contract.address.clone(),
                    Symbol::new(&e, "close_bounty"),
                    (
                        token_admin.clone(),
                        bounty_id
                    ).into_val(&e)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
    // check refund
    assert_eq!(pay_token_client.balance(&creator), 
        (10000 * MUL_VAL - 1000 * MUL_VAL * (fee_rate as u64) / u64::pow(10, FEE_DECIMALS)) as i128);
}
