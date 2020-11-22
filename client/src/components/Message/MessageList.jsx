import React, { useState } from "react";
import { Query } from "react-apollo";

import MessageItem from "./MessageItem";
import { PaginationCustom, MESSAGES_PER_PAGE } from "./Pagination";
import {
  MESSAGE_QUERY,
  NEW_MESSAGES_SUBSCRIPTION,
  UPDATED_MESSAGE_SUBSCRIPTION,
  UPDATED_REPLY_SUBSCRIPTION,
} from "./../../queries";

const MessageList = ({ orderBy, filter }) => {
  const [currentMessageCount, setCurrentMessageCount] = useState(0);

  const _subscribeToNewMessages = (subscribeToMore) => {
    subscribeToMore({
      document: NEW_MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { newMessage } = subscriptionData.data;
        const exists = prev.messages.messageList.find(
          ({ id }) => id === newMessage.id
        );

        if (exists) {
          return prev;
        }

        return {
          ...prev,
          messages: {
            messageList: [newMessage, ...prev.messages.messageList],
            count: prev.messages.messageList.length + 1,
            __typename: prev.messages.__typename,
          },
        };
      },
    });
  };

  const _subscribeToUpdatedMessage = (subscribeToMore) => {
    subscribeToMore({
      document: UPDATED_MESSAGE_SUBSCRIPTION,
    });
  };

  const _subscribeToUpdatedReply = (subscribeToMore) => {
    subscribeToMore({
      document: UPDATED_REPLY_SUBSCRIPTION,
    });
  };

  return (
    <Query
      query={MESSAGE_QUERY}
      variables={{
        orderBy,
        filter,
        skip: currentMessageCount,
        first: MESSAGES_PER_PAGE,
      }}
    >
      {({ loading, error, data, refetch, subscribeToMore }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Fetch error</div>;
        }
        _subscribeToNewMessages(subscribeToMore);
        _subscribeToUpdatedMessage(subscribeToMore);
        _subscribeToUpdatedReply(subscribeToMore);

        const {
          messages: { messageList, count },
        } = data;

        return (
          <div>
            <div className="message-list">
              {messageList.map((item) => {
                return (
                  <MessageItem
                    key={item.id}
                    {...item}
                    variables={{
                      orderBy,
                      filter,
                      skip: currentMessageCount,
                      first: MESSAGES_PER_PAGE,
                    }}
                  />
                );
              })}
            </div>
            <PaginationCustom
              count={count}
              refetch={refetch}
              currentMessageCount={currentMessageCount}
              setCurrentMessageCount={setCurrentMessageCount}
            />
          </div>
        );
      }}
    </Query>
  );
};

export default MessageList;
