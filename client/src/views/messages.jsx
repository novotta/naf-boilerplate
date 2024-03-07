// Dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Actions
import {
  createThread,
  getThreads,
  setThreadError,
  setThreadSaved,
  setThreadTouched,
  addMessage
} from '../actions/threads';

// Components
import { ContentCard, Dialog, formatDate, Row } from '@narmi/design_system';
import ThreadModal from '../components/threads/modal';

// Initial State
const initialState = {
  thread: {
    subject: '',
    body: ''
  }
};

// Messages
const Messages = (props) => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [thread, setThread] = useState(initialState.thread);

  const state = {
    thread
  };

  useEffect(() => {
    props.getThreads();
  }, []);

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedThread) {
      await props.addMessage(selectedThread, newMessage);
      setNewMessage('');
      props.getThreads();
    }
  };

  // const createThreadModal = (data) => {
  //   window.scrollTo(0, 0);
  //   setThread({
  //     id: data.id,
  //     subject: data.subject,
  //     body: data.body
  //   });
  //   setIsDialogOpen(true);
  // };

  const createThread = () => {
    props.setThreadError(null);
    const { subject, body } = thread;
    props.setThreadTouched(false);
    props.createThread({ thread });
  };

  const setThreadValue = (e) => {
    console.log("SET THREAD VALUE");
    console.log(e.target);
    props.setThreadTouched(true);
    props.setThreadSaved(false);
    if (e != null && e.target != null) {
      const { subject, value } = e.target;
      console.log(thread);
      setThread((thread) => ({
        ...thread,
        [subject]: value,
      }));
    }
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
            <button onClick={() => setIsDialogOpen(true)} >Add Message</button>
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
                      className={(selectedThread && selectedThread.id === thread.id ? 'selected' : '')}
                      onClick={() => handleThreadClick(thread)}
                    >
                      <div className="fontWeight--bold">{thread.subject}</div>
                      <div>{formatDate(new Date(thread.updated_at), 'long')}</div>
                    </ThreadItem>
                  </Row.Item>
                </Row>
              ))}
            </LeftLayout>
            <RightLayout>
              {selectedThread ? (
                <div>
                  <h3>{selectedThread.subject}</h3>
                  {selectedThread.messages.map((message) => (
                    <div key={message.id}>
                      <div>{message.body}</div>
                      <div>{formatDate(new Date(message.created_at), 'long')}</div>
                    </div>
                  ))}
                  <form onSubmit={handleSubmit}>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button type="submit">Add Message</button>
          </form>
                </div>
              ) : (
                <p>No message selected.</p>
              )}
            </RightLayout>
          </PageLayout>
        </ContentCard>
        <Dialog isOpen={isDialogOpen} title={`Create Message`} onUserDismiss={() => { setIsDialogOpen(false); }}>
          <ThreadModal
            setValue={setThreadValue}
            state={state}
            thread={state.thread}
            createThread={createThread}
            setThreadTouched={props.setThreadTouched}
          />
        </Dialog>
      </NarmiContainer>
    )
  }
}

// Map State to Props
const mapStateToProps = (state) => {
  const {
    thread,
    threads,
    addMessage
  } = state;
  return {
    thread,
    threads,
    addMessage
  };
};

// Map Dispatch to Props
const mapDispatchToProps = {
  getThreads,
  createThread,
  setThreadError,
  setThreadSaved,
  setThreadTouched,
  addMessage
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