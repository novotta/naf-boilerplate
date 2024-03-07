// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ContentCard, Tag } from '@narmi/design_system';

// Message Center
const MessageCenter = () => {
  const navigate = useNavigate()

  return (
    <ContentCard kind="elevated">
      <h3 className="fontFamily--body fontSize--l" style={{marginBottom: '8px'}}>Send a secure message</h3>
      <Button
        as="button"
        endIcon="arrow-right"
        kind="plain"
        label="Message center"
        onClick={() => navigate('/messages') }
        size="s"
        type="button"
      />
    </ContentCard>
  )
}

// Export
export default MessageCenter;