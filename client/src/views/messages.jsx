// Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Actions
import {
  getThreads
} from '../actions/threads';

// Components
import { ContentCard, Row } from '@narmi/design_system';

// Messages
const Messages = (props) => {
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    props.getThreads();
  }, []);

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  if (props.threads.data !== null) {
    return (
      <NarmiContainer>
        <Row alignItems="center" justifyContent="start" gapSize="l">
          <Row.Item>
            <MessageTitle className="fontWeight--bold">Message Center</MessageTitle>
            <Link to="/">Back to Overview</Link>
          </Row.Item>
          <Row.Item>
            <button>Add Message</button>
          </Row.Item>
        </Row>
        <ContentCard kind="elevated" paddingSize="none">
          <PageLayout>
            <LeftLayout>
              {props.threads.data.map((thread) => (
                <Row key={thread.id} alignItems="center" justifyContent="start" gapSize="l">
                  <Row.Item>
                    {/* if selectedThread.id === thread.id, add class "selected" */}
                    <ThreadItem
                      className={selectedThread && selectedThread.id === thread.id ? 'selected' : ''}
                      onClick={() => handleThreadClick(thread)}
                    >
                      <div className="fontWeight--bold">{thread.subject}</div>
                      <div>{thread.updated_at}</div>
                    </ThreadItem>
                  </Row.Item>
                </Row>
              ))}
            </LeftLayout>
            <RightLayout>
              <h1>Selected Message:</h1>
              {selectedThread ? (
                <div>
                  <p>Name: {selectedThread.subject}</p>
                  <p>Attribute: {selectedThread.updated_at}</p>
                  {selectedThread.messages.map((message) => (
                    <div key={message.id}>
                      <p>{message.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No item selected</p>
              )}
            </RightLayout>
          </PageLayout>
        </ContentCard>
      </NarmiContainer>
    )
  }
}

// Map State to Props
const mapStateToProps = (state) => {
  const {
    threads
  } = state;
  return {
    threads
  };
};

// Map Dispatch to Props
const mapDispatchToProps = {
  getThreads
};

// Export
export default connect(mapStateToProps, mapDispatchToProps)(Messages);

// Styles
const NarmiContainer = styled.div`
  width: 1300px;
`;

const MessageTitle = styled.h1`
  color: RGBA(var(--primary-accessible-color));
  line-height: 1.2;
  margin: 24px 0;
`;

const PageLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const LeftLayout = styled.div`
  border-right: 1px solid #F1F3F6;
  order: 1;
  padding: 24px;
  width: 400px;
`;

const RightLayout = styled.div`
  flex-grow: 1;
  order: 2;
  padding: 24px;
`;

const ThreadItem = styled.div`
  border-radius: 8px;
  cursor: pointer;
  padding: 16px;

  &.selected {
    background-color: #F1F3F6;
  }
`;