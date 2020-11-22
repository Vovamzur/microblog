import React from 'react';
import { Mutation } from 'react-apollo';
import { POST_REPLY_LIKE_MUTATION, POST_REPLY_DISLIKE_MUTATION } from './../../queries';
import like from '../../img/like.png';
import dislike from '../../img/dislike.png';

const ReplyItem = ({ id, text, likes, dislikes }) => (
  <div className="reply-item">
    <div className="message-wrapper">
      <div className="title">
        <p>{text}</p>
        <p>{id.slice(-4)}</p>
      </div>
      <div className="rating">
        <div>
          <Mutation mutation={POST_REPLY_LIKE_MUTATION} variables={{ replyId: id }}>
            {postMutation => <img src={like} alt="like" onClick={postMutation} />}
          </Mutation>
          <span>{likes}</span>
        </div>
        <div>
          <Mutation mutation={POST_REPLY_DISLIKE_MUTATION} variables={{ replyId: id }}>
            {postMutation => <img src={dislike} alt="dislike" onClick={postMutation} />}
          </Mutation>
          <span>{dislikes}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ReplyItem;
