export const txTypes = {
  transfers: {
    send: 'Send'
  },
  declarations: {
    create_validator: 'Create Validator',
    edit_validator: 'Edit Validator',
    unjail: 'Unjail'
  },
  stakings: {
    delegate: 'Delegate',
    begin_redelegate: 'Redelegate',
    begin_unbonding: 'Unbond',
    set_withdraw_address: 'Set Withdraw Address',
    withdraw_delegator_reward: 'Withdraw Delegation Reward'
  },
  governance: {
    submit_proposal: 'Submit Proposal',
    deposit: 'Deposit',
    vote: 'Vote'
  },
  exchanges: {
    create_order: 'Make Order',
    take_order: 'Take Order',
    withdrawal_order: 'Cancel Order'
  },
  issuances: {
    issue: 'Issue',
    issue_mint: 'Issue Mint',
    issue_burn: 'Issue Burn',
    issue_burn_from: 'Issue Burn From',
    issue_burn_any: 'Issue Burn Any',
    issue_finish_minting: 'Issue Finish Minting',
    issue_description: 'Issue Description',
    issue_transfer_ownership: 'Issue Transfer Ownership',
    issue_burn_off: 'Issue Burn Off',
    issue_burn_from_off: 'Issue Burn From Off',
    issue_burn_any_off: 'Issue Burn Any Off'
  },
  tokenBoxs: {
    box_create_lock: 'Create LockBox',
    box_create_deposit: 'Create DepositBox',
    box_create_future: 'Create FutureBox',
    box_interest: 'Deposit Interests',
    box_deposit: 'Deposit Capital',
    box_description: 'Box Description',
    box_disable_feature: 'Desable Feature'
  }
};
