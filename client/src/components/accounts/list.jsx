// Dependencies
import React from 'react'
import { connect } from 'react-redux'

// Components

// Accounts
const Accounts = ({ accounts }) => {
  return (
    <>
      {accounts.map((account) => (
        <div key={account.id}>
          <div>{account.name}</div>
          {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accountList.accounts
  }
}

// Export
export default connect(mapStateToProps)(Accounts);