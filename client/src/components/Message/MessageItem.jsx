import React from 'react';
import { Mutation } from 'react-apollo';
import { POST_LIKE_MUTATION, POST_DISLIKE_MUTATION } from './../../queries';
import ReplyList from '../Reply/ReplyList';
import like from '../../img/like.png';
import dislike from '../../img/dislike.png';

const MessageItem = ({ id, text, likes, dislikes, replies, variables }) => (
  <div className="message-item">
    <div className="message-wrapper">
      <div className="title">
        <p>{text}</p>
        <p>{id.slice(-4)}</p>
      </div>
      <div className="rating">
        <div>
          <Mutation mutation={POST_LIKE_MUTATION} variables={{ messageId: id }}>
            {postMutation => <img src={like} alt="like" onClick={postMutation} />}
          </Mutation>
          <span>{likes}</span>
        </div>
        <div>
          <Mutation mutation={POST_DISLIKE_MUTATION} variables={{ messageId: id }}>
            {postMutation => <img src={dislike} alt="dislike" onClick={postMutation} />}
          </Mutation>
          <span>{dislikes}</span>
        </div>
      </div>
    </div>
    <ReplyList messageId={id} replies={replies} variables={variables}/>
  </div>
);

export default MessageItem;