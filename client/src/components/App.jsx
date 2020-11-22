import React, { useState } from 'react';
import MessageInput from './Message/MessageInput';
import MessageList from './Message/MessageList';

const App = () => {
  const [orderBy, setOrder] = useState('createdAt_DESC');
  const [filter, setFilter] = useState('');

  return (
    <div className="container">
      <div className="content">

        <select value={orderBy} onChange={e => setOrder(e.target.value)}>
          <option value="createdAt_ASC">createdAt_ASC</option>
          <option value="createdAt_DESC">createdAt_DESC</option>
          <option value="likes_ASC">likes_ASC</option>
          <option value="likes_DESC">likes_DESC</option>
          <option value="dislikes_ASC">dislikes_ASC</option>
          <option value="dislikes_DESC">dislikes_DESC</option>
        </select>

        <input type="text" onChange={e => setFilter(e.target.value) }/>

        <MessageList orderBy={orderBy} filter={filter}/>
        <MessageInput />
      </div>
    </div>
  );
}

export default App;
