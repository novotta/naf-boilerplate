// Dependencies
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, TextInput } from '@narmi/design_system';
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
import { ContentCard, Dialog, formatDate } from '@narmi/design_system';
import ThreadModal from '../components/threads/modal';
import MessageTitle from '../components/threads/message-title';

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

  const createThread = () => {
    props.setThreadError(null);
    props.setThreadTouched(false);
    props.createThread({ thread });
    setIsDialogOpen(false);
  };

  const setThreadValue = (e) => {
    props.setThreadTouched(true);
    props.setThreadSaved(false);
    if (e != null && e.target != null) {
      const { name, value } = e.target;
      setThread((thread) => ({
        ...thread,
        [name]: value,
      }));
    }
  };

  if (props.threads.data !== null) {
    return (
      <NarmiContainer>
        <MessageTitle setIsDialogOpen={setIsDialogOpen} />
        <ContentCard kind="elevated" paddingSize="none">
          <PageLayout>
            <LeftLayout>
              {props.threads.data.map((thread) => (
                <ThreadItem
                  key={thread.id}
                  className={(selectedThread && selectedThread.id === thread.id ? 'selected' : '')}
                  onClick={() => handleThreadClick(thread)}
                >
                  <div className="fontWeight--bold">{thread.subject}</div>
                  <div>{formatDate(new Date(thread.updated_at), 'long')}</div>
                </ThreadItem>
              ))}
            </LeftLayout>
            <RightLayout>
              {selectedThread ? (
                <div>
                  <ThreadSubject>{selectedThread.subject}</ThreadSubject>
                  <MessageWrapper>
                    {selectedThread.messages.map((message) => (
                      <MessageItem key={message.id}>
                        <div>{message.body}</div>
                        <span>{formatDate(new Date(message.created_at), 'long')}</span>
                      </MessageItem>
                    ))}
                  </MessageWrapper>
                  <MessageForm onSubmit={handleSubmit}>
                    <TextInput
                      multiline
                      label="Message"
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                      as="button"
                      kind="primary"
                      label="Send"
                      type="submit"
                      style={{ alignSelf: 'flex-end'}}
                    />
                  </MessageForm>
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

const ThreadSubject = styled.h3`
  border-bottom: 1px solid #F1F3F6;
  padding-bottom: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

const MessageWrapper = styled.div`
  height: 400px;
  overflow-y: scroll;
`;

const MessageItem = styled.div`
  background-color: #F1F3F6;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 12px;

  span {
    font-size: 12px;
    line-height: 20px;
  }
`;

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;