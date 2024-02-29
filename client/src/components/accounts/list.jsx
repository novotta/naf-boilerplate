// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import { formatNumber, Row } from '@narmi/design_system';

// Accounts
const Accounts = ({ accounts, accountType }) => {
  const favoriteAccounts = accounts.filter(account => account.favorited);
  const listAccounts = accounts.filter(account => account.type === accountType);
  const printedAccounts = accountType === 'favorite' ? favoriteAccounts : listAccounts;

  return (
    <>
      <AccountGroupHeader role="button" tabIndex="0">
        <div className="fontWeight--bold padding--y--xs">
          <Row alignItems="center" justifyContent="start" gapSize="l">
            <Row.Item>
              <GroupName>{accountType} Accounts</GroupName>
            </Row.Item>
          </Row>
        </div>
      </AccountGroupHeader>
      <div className="account-rows">
        {printedAccounts.map((account) => (
          <AccountRow key={account.id} className="padding--y--m">
            <Row alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <span role="button" tabIndex="0">
                  {account.name} - {account.number.slice(-4)}
                </span>
              </Row.Item>
              <Row.Item shrink>
                <div className="balance-options">
                  <span role="button" tabIndex="0">
                    <span className="margin--right--xxs fontColor--primary">
                      {formatNumber((account.balances.primary / 100), 'currency')}
                    </span>
                  </span>
                </div>
              </Row.Item>
            </Row>
            {/* {name, nickname, id, number, type, product, updated_at, users, features, routing, loan_details, source, state, favorited, hidden, out_of_date, updated_from_source_at, check_micr, metadata, balances, fi_name, created_at, verified, fi_svg} */}
          </AccountRow>
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
const AccountGroupHeader = styled.div`
  &:not(:first-of-type) {
    padding-top: 16px !important;
  }
`;

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
  text-transform: capitalize;
`;