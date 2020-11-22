import React from 'react';
import { Query } from 'react-apollo';
import MessageItem from './MessageItem';
import { 
  MESSAGE_QUERY, NEW_MESSAGES_SUBSCRIPTION, 
  UPDATED_MESSAGE_SUBSCRIPTION, UPDATED_REPLY_SUBSCRIPTION 
} from './../../queries';

const MESSAGES_PER_PAGE = 2;

const MessageList = ({ orderBy, filter }) => {
  let currentMessageCount = 0;
  const _subscribeToNewMessages = subscribeToMore => {
    subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } = subscriptionData.data;
        const exists = prev.messages.messageList.find(({ id }) => id === newMessage.id);
        if (exists) return prev;

        return {
          ...prev,
          messages: {
            messageList: [newMessage, ...prev.messages.messageList],
            count: prev.messages.messageList.length + 1,
            __typename: prev.messages.__typename
          }
        }
      }
    })
  };

  const _subscribeToUpdatedMessage = subscribeToMore => {
    subscribeToMore({
      document: UPDATED_MESSAGE_SUBSCRIPTION
    })
  };

  const _subscribeToUpdatedReply = subscribeToMore => {
    subscribeToMore({
      document: UPDATED_REPLY_SUBSCRIPTION
    })
  };

  const prevPage = (count, refetch) => {
    if (currentMessageCount > MESSAGES_PER_PAGE) {
      currentMessageCount -= MESSAGES_PER_PAGE;
    } else if (count - currentMessageCount > 0) {
      currentMessageCount = 0;
    }
    refetch({ skip: currentMessageCount });
  };

  const toFirstPage = (refetch) => {
    currentMessageCount = 0;
    refetch({ skip: 0 });
  };

  const nextPage = (count, refetch) => {
    if (currentMessageCount < count - MESSAGES_PER_PAGE) {
      currentMessageCount += MESSAGES_PER_PAGE;
    }
    refetch({ skip: currentMessageCount })
  };

  return (
    <Query query={MESSAGE_QUERY} variables={{ orderBy, filter, skip: currentMessageCount, first: MESSAGES_PER_PAGE }}>
      {({ loading, error, data, refetch, subscribeToMore }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Fetch error</div>;
        _subscribeToNewMessages(subscribeToMore);
        _subscribeToUpdatedMessage(subscribeToMore);
        _subscribeToUpdatedReply(subscribeToMore);

        const { messages: { messageList, count } } = data;

        return (
          <div>
            <div className="message-list">
              {messageList.map(item => {
                return <MessageItem key={item.id} {...item} variables={{ orderBy, filter, skip: currentMessageCount, first: MESSAGES_PER_PAGE }} />;
              })}
            </div>
            {count > MESSAGES_PER_PAGE ?
              <div>
                <button onClick={() => prevPage(count, refetch)}>previous page</button>
                <button onClick={() => toFirstPage(refetch)}>to first page</button>
                <button onClick={() => nextPage(count, refetch)}>next page</button>
              </div> : null}
          </div>
        )
      }}
    </Query>
  )
}

export default MessageList;