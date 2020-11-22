import React from "react";
import { Mutation } from "react-apollo";
import {
  POST_REPLY_LIKE_MUTATION,
  POST_REPLY_DISLIKE_MUTATION,
} from "./../../queries";
import { Card } from "semantic-ui-react";

import like from "../../img/like.png";
import dislike from "../../img/dislike.png";

export default ({ id, text, likes, dislikes }) => (
  <Card className="reply-item">
    <Card.Content>
      <Card.Header className="reply-text">{text}</Card.Header>
      <Card.Description className="rating">
        <div>
          <Mutation
            mutation={POST_REPLY_LIKE_MUTATION}
            variables={{ replyId: id }}
          >
            {(postMutation) => (
              <img
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
            mutation={POST_REPLY_DISLIKE_MUTATION}
            variables={{ replyId: id }}
          >
            {(postMutation) => (
              <img
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
  </Card>
);

// const ReplyItem = ({ id, text, likes, dislikes }) => (
//   <div className="reply-item">
//     <div className="message-wrapper">
//       <div className="title">
//         <p>{text}</p>
//         <p>{id.slice(-4)}</p>
//       </div>
//       <div className="rating">
//         <div>
//           <Mutation mutation={POST_REPLY_LIKE_MUTATION} variables={{ replyId: id }}>
//             {postMutation => <img src={like} alt="like" onClick={postMutation} />}
//           </Mutation>
//           <span>{likes}</span>
//         </div>
//         <div>
//           <Mutation mutation={POST_REPLY_DISLIKE_MUTATION} variables={{ replyId: id }}>
//             {postMutation => <img src={dislike} alt="dislike" onClick={postMutation} />}
//           </Mutation>
//           <span>{dislikes}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default ReplyItem;
