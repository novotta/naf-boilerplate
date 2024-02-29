// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import { Row } from '@narmi/design_system';

// Accounts
const Accounts = ({ accounts }) => {
  const favoriteAccounts = accounts.filter(account => account.favorited);
  const depositAccounts = accounts.filter(account => account.type === 'deposit');
  const creditAccounts = accounts.filter(account => account.type === 'credit');

  return (
    <>
      <div className="account-group-header" role="button" tabindex="0">
        <div className="fontWeight--bold padding--y--xs">
          <Row alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <GroupName>Favorites</GroupName>
            </Row.Item>
          </Row>
        </div>
      </div>
      <div className="account-rows">
        {favoriteAccounts.map((account) => (
          <AccountRow key={account.id} className="padding--y--m">
            <Row alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <span role="button" tabIndex="0">
                  {account.name} - {account.number.slice(-4)}
                </span>
              </Row.Item>
              <Row.Item shrink>
                <div className="balance-options">
                  <span role="button" tabindex="0">
                    <span class="margin--right--xxs fontColor--primary">
                      {account.balances.primary}
                    </span>
                  </span>
                </div>
              </Row.Item>
            </Row>
            {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
          </AccountRow>
        ))}
      </div>
      <div className="account-group-header" role="button" tabindex="0">
        <div className="fontWeight--bold padding--y--xs">
          <Row alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <GroupName>Deposit Accounts</GroupName>
            </Row.Item>
          </Row>
        </div>
      </div>
      <div className="account-rows">
        {depositAccounts.map((account) => (
          <AccountRow key={account.id} className="padding--y--m">
            <Row alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <span role="button" tabIndex="0">
                  {account.name} - {account.number.slice(-4)}
                </span>
              </Row.Item>
              <Row.Item shrink>
                <div className="balance-options">
                  <span role="button" tabindex="0">
                    <span class="margin--right--xxs fontColor--primary">
                      {account.balances.primary}
                    </span>
                  </span>
                </div>
              </Row.Item>
            </Row>
            {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
          </AccountRow>
        ))}
      </div>
      <div className="account-group-header" role="button" tabindex="0">
        <div className="fontWeight--bold padding--y--xs">
          <Row alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <GroupName>Credit Accounts</GroupName>
            </Row.Item>
          </Row>
        </div>
      </div>
      <div>
        {creditAccounts.map((account) => (
          <div key={account.id}>
            <div>{account.name}</div>
            {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
          </div>
        ))}
      </div>
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

// Styles
const AccountRow = styled.div`
  border-top: 1px solid rgba(var(--nds-lightest-grey));

  &:hover {
    background: RGBA(var(--theme-rgb-primary), var(--hover-opacity));
    cursor: pointer;
  }
`;

const GroupName = styled.div`
  color: RGBA(var(--primary-accessible-color));
  display: flex;
  flex-direction: row;
`;