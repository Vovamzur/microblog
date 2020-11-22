import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { Input, Button } from "semantic-ui-react";

import { POST_MESSAGE_MUTATION } from "../../queries";

const MessageInput = () => {
  const [text, setText] = useState("");

  const onSubmit = (postMutation) => {
    if (!text) {
      alert("Your messsage is empty!");
      return;
    }

    postMutation();
    setText("");
  };

  return (
    <div className="form-wrapper">
      <div className="input-wrapper">
        <Input
          className="msg-input"
          size="large"
          type="text"
          placeholder="Enter your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Mutation mutation={POST_MESSAGE_MUTATION} variables={{ text }}>
        {(postMutation) => (
          <Button onClick={() => onSubmit(postMutation)}>Send</Button>
        )}
      </Mutation>
    </div>
  );
};

export default MessageInput;
