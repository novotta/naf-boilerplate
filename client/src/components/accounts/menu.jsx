// Dependencies
import React from 'react';
import styled from 'styled-components';

// Menu
const Menu = (props) => {
  if (props.account.favorited) {
    return (
      <MenuList>
        <MenuItem onClick={() => { props.editFavorited(props.account, false); }}>
          Unfavorite
        </MenuItem>
        <MenuItem
          onClick={() => { props.editAccountModal(props.account); }}>
            Edit
        </MenuItem>
      </MenuList>
    )
  } else {
    return (
      <MenuList>
        <MenuItem onClick={() => { props.editFavorited(props.account, true); }}>
          Favorite
        </MenuItem>
        <MenuItem
          onClick={() => { props.editAccountModal(props.account); }}>
            Edit
        </MenuItem>
      </MenuList>
    )
  }
}

// Export
export default Menu;

// Styles
const MenuList = styled.div`
  padding: 8px;
`;

const MenuItem = styled.div`
  border-radius: 4px;
  cursor: pointer;
  line-height: 32px;
  padding: 0 8px;
  text-align: left;

  &:hover {
    background: RGBA(var(--theme-rgb-primary), var(--hover-opacity));
  }
`;