import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { POST_MESSAGE_MUTATION } from '../../queries';

const MessageInput = props => {
  const [text, setText] = useState('');

  const onSubmit = postMutation => {
    if (!text) {
      alert('Your messsage is empty!');
      return;
    }

    postMutation();
    setText('');
  }

  return (
    <div className="form-wrapper">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter your message here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <Mutation mutation={POST_MESSAGE_MUTATION} variables={{ text }}>
        {postMutation => <button onClick={() => onSubmit(postMutation)}>Send</button>}
      </Mutation>
    </div>
  )
}

export default MessageInput;