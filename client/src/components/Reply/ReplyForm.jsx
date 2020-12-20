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

  const onSubmit = (postMutation) => {
    if (!text) {
      alert("Your reply is empty!");
      return;
    }

    postMutation();
    setText("");
  };

  return (
    <div className="form-wrapper">
      <div className="input-wrapper">
        <TextArea
          id="reply-input"
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your message here..."
          autoFocus
          maxLength="500"
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
        {(postMutation) => <Button id="add-reply-button" onClick={() => onSubmit(postMutation)}>Send</Button>}
      </Mutation>
    </div>
  );
};

export default ReplyForm;
