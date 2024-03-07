// Dependencies
import React from 'react';
import { Button, ContentCard, Tag } from '@narmi/design_system';
import styled from 'styled-components';

// Novotta
const Novotta = () => {
  return (
    <ContentCard kind="elevated">
      <img src="https://uploads-ssl.webflow.com/63af1628cee58c58f81bc648/648c8e187f40f5721105c0e2_logomark-novotta.png" alt="Novotta" height="40" />
      <p>Novotta is a technology partner for financial institutions and fintech.</p>
      <Button
        as="a"
        kind="secondary"
        label="View Website"
        onClick={() => {
          window.open('https://www.novotta.com/', '_blank');
        }}
        size="s"
        type="button"
      />
      <Divider />
      <Tag
        kind="subdued"
        label={localStorage.getItem('code')}
        onDismiss={function noRefCheck(){}}
      />
    </ContentCard>
  )
}

// Export
export default Novotta;

// Styles
const Divider = styled.div`
  background: #F1F3F6;
  height: 1px;
  margin: 16px 0;
`;