// Dependencies
import React from "react";
import styled from 'styled-components';

// Components
import { formatNumber, Popover, Row } from '@narmi/design_system';
import Menu from './menu';

// Account
const Account = (props) => {

  const { account } = props;

  return (
    <AccountRow key={account.id} className="padding--y--m">
      <Row alignItems="center" justifyContent="start" gapSize="l">
        <Row.Item>
          <span role="button" tabIndex="0">
            {account.name} - {account.number.slice(-4)}
          </span>
        </Row.Item>
        <Row.Item shrink>
          <BalanceOptions>
            <span role="button" tabIndex="0">
              <span className="margin--right--xxs fontColor--primary">
                {formatNumber(account.balances.primary / 100, "currency")}
              </span>
            </span>
            <div className="options" style={{width: 'auto', position: 'relative'}}>
              <Popover
                alignment="end"
                closeOnContentClick
                content={<Menu account={account} editAccountModal={props.editAccountModal} editFavorited={props.editFavorited} />}
                onUserDismiss={function noRefCheck() {}}
                side="bottom"
                wrapperDisplay="inline-flex"
              >
                <Options>
                  <span className="clickable narmi-icon-more-vertical"></span>
                </Options>
              </Popover>
            </div>
          </BalanceOptions>
        </Row.Item>
      </Row>
    </AccountRow>
  );
};

// Export
export default Account;

// Styles
const AccountRow = styled.div`
  border-top: 1px solid rgba(var(--nds-lightest-grey));

  &:hover {
    background: RGBA(var(--theme-rgb-primary), var(--hover-opacity));
  }
`;

const BalanceOptions = styled.div`
  display: flex;
  flex-direction: row;

  * {
    align-items: center;
    color: var(--color-grey);
    display: flex;
    justify-content: center;
  }
`;

const Options = styled.div`
  cursor: pointer;
  padding: 0 4px;
`;