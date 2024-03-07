// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row } from '@narmi/design_system';
import styled from 'styled-components';

// Message Title
const MessageTitle = (props) => {
  const navigate = useNavigate();

  return (
    <Row alignItems="center" justifyContent="start" gapSize="l">
      <Row.Item>
        <PageTitle className="fontWeight--bold">Message Center</PageTitle>
        <Button
          as="button"
          startIcon="arrow-left"
          kind="plain"
          label="Back to overview"
          onClick={() => navigate('/') }
          size="s"
          type="button"
          style={{marginBottom: '24px'}}
        />
      </Row.Item>
      <Row.Item shrink>
        <Button
          as="button"
          endIcon=""
          kind="primary"
          label="New Message"
          onClick={() => props.setIsDialogOpen(true)}
          size="m"
          startIcon="plus"
          type="button"
        />
      </Row.Item>
    </Row>
  )
}

// Export
export default MessageTitle;

// Styles
const PageTitle = styled.h1`
  color: RGBA(var(--primary-accessible-color));
  line-height: 1.2;
  margin: 24px 0 8px;
`;