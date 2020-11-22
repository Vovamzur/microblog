import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { TextArea, Button } from "semantic-ui-react";

import { MESSAGE_QUERY, POST_REPLY_MUTATION } from "../../queries";

const ReplyForm = ({ messageId, toggleForm, variables }) => {
  const [text, setText] = useState("");

  const _updateStoreAfterAddingReply = (store, newReply, messageId) => {
    const data = store.readQuery({
      query: MESSAGE_QUERY,
      variables,
    });
    const repliedMessage = data.messages.messageList.find(
      (item) => item.id === messageId
    );
    repliedMessage.replies.push(newReply);
    store.writeQuery({ query: MESSAGE_QUERY, data });
    toggleForm(false);
  };

  return (
    <div className="form-wrapper">
      <div className="input-wrapper">
        <TextArea
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your message here..."
          autoFocus
          value={text}
          cols="25"
        />
      </div>
      <Mutation
        mutation={POST_REPLY_MUTATION}
        variables={{ messageId, text }}
        update={(store, { data: { postReply } }) => {
          _updateStoreAfterAddingReply(store, postReply, messageId);
        }}
      >
        {(postMutation) => <Button onClick={postMutation}>Send</Button>}
      </Mutation>
    </div>
  );
};

export default ReplyForm;
