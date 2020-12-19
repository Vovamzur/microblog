import React from "react";
import { Mutation } from "react-apollo";
import { Card } from "semantic-ui-react";

import { POST_LIKE_MUTATION, POST_DISLIKE_MUTATION } from "./../../queries";
import ReplyList from "../Reply/ReplyList";
import like from "../../img/like.png";
import dislike from "../../img/dislike.png";

const MessageItem = ({ id, text, likes, dislikes, replies, variables, createdAt }) => (
  <Card className="message-item">
    <Card.Content>
      <Card.Header className="message-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{text}</div>
        <div style={{ fontSize: '12px', fontWeight: '200' }}>{createdAt.substring(0, 10)}</div>
      </Card.Header>
      <Card.Description className="rating">
        <div>
          <Mutation mutation={POST_LIKE_MUTATION} variables={{ messageId: id }}>
            {(postMutation) => (
              <img
                id="like-btn"
                className="rating-icon"
                src={like}
                alt="like"
                onClick={postMutation}
              />
            )}
          </Mutation>
          <span>{likes}</span>
        </div>
        <div>
          <Mutation
            mutation={POST_DISLIKE_MUTATION}
            variables={{ messageId: id }}
          >
            {(postMutation) => (
              <img
                id="dislike-btn"
                className="rating-icon"
                src={dislike}
                alt="dislike"
                onClick={postMutation}
              />
            )}
          </Mutation>
          <span>{dislikes}</span>
        </div>
      </Card.Description>
    </Card.Content>
    <Card.Content>
      <ReplyList messageId={id} replies={replies} variables={variables} />
    </Card.Content>
  </Card>
);

export default MessageItem;
