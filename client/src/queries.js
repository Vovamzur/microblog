import gql from "graphql-tag";

export const MESSAGE_QUERY = gql`
  query messageQuery(
    $orderBy: MessageOrderByInput
    $filter: String
    $skip: Int
    $first: Int
  ) {
    messages(orderBy: $orderBy, filter: $filter, skip: $skip, first: $first) {
      count
      messageList {
        id
        text
        likes
        dislikes
        createdAt
        replies {
          id
          text
          likes
          dislikes
        }
      }
    }
  }
`;

export const POST_MESSAGE_MUTATION = gql`
  mutation MessageMutation($text: String!) {
    postMessage(text: $text) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const POST_REPLY_MUTATION = gql`
  mutation MessageMutation($messageId: ID!, $text: String!) {
    postReply(messageId: $messageId, text: $text) {
      id
      text
      likes
      dislikes
    }
  }
`;

export const POST_LIKE_MUTATION = gql`
  mutation MessageMutation($messageId: ID!) {
    addLikeToMessage(messageId: $messageId) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const POST_DISLIKE_MUTATION = gql`
  mutation MessageMutation($messageId: ID!) {
    addDislikeToMessage(messageId: $messageId) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const POST_REPLY_LIKE_MUTATION = gql`
  mutation ReplyMutation($replyId: ID!) {
    addLikeToReply(replyId: $replyId) {
      id
      text
      likes
      dislikes
    }
  }
`;

export const POST_REPLY_DISLIKE_MUTATION = gql`
  mutation ReplyMutation($replyId: ID!) {
    addDislikeToReply(replyId: $replyId) {
      id
      text
      likes
      dislikes
    }
  }
`;

export const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      text
      likes
      dislikes
      createdAt
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const UPDATED_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    updatedMessage {
      id
      text
      likes
      dislikes
      createdAt
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const UPDATED_REPLY_SUBSCRIPTION = gql`
  subscription {
    updatedReply {
      id
      text
      likes
      dislikes
    }
  }
`;
