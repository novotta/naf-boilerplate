// Dependencies
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Actions
import {
  getThreads
} from '../actions/threads';

// Components
import { Row } from '@narmi/design_system';

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
        <div>
          <h1>Messages</h1>
          {props.threads.data.map((thread) => (
            <Row key={thread.id} alignItems="center" justifyContent="start" gapSize="l">
              <Row.Item>
                <div onClick={() => handleThreadClick(thread)}>
                  <div>{thread.subject}</div>
                  <div>{thread.updated_at}</div>
                </div>
              </Row.Item>
            </Row>
          ))}
        </div>
        <div>
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
        </div>
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
