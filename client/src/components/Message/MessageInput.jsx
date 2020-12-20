import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { Input, Button } from "semantic-ui-react";

import { POST_MESSAGE_MUTATION } from "../../queries";

const MessageInput = () => {
  const [text, setText] = useState("");

  const onSubmit = (postMutation) => {
    if (!text) {
      alert("Your post is empty!");
      return;
    }

    postMutation();
    setText("");
  };

  return (
    <div className="form-wrapper">
      <div className="input-wrapper">
        <Input
          id="msg-input"
          className="msg-input"
          size="large"
          type="text"
          maxLength="500"
          placeholder="Enter your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Mutation
        mutation={POST_MESSAGE_MUTATION}
        variables={{ text, createdAt: new Date() }}
      >
        {(postMutation) => (
          <Button
            id="add-msg-button"
            onClick={() => onSubmit(postMutation)}
          >
            Send
          </Button>
        )}
      </Mutation>
    </div>
  );
};

export default MessageInput;
