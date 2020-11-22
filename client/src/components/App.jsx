import React, { useState } from "react";
import MessageInput from "./Message/MessageInput";
import MessageList from "./Message/MessageList";
import { Filter } from "./Filter";

const App = () => {
  const [filter, setFilter] = useState("");
  const [filterMsgText, setFilterMsgText] = useState("");

  return (
    <div className="container">
      <div className="content">
        <Filter setFilter={setFilter} />

        <div className="msg-filter">
          <h3 className="filter-label">Search by message text</h3>
          <input
            className="msg-filter__input"
            type="text"
            onChange={(e) => setFilterMsgText(e.target.value)}
          />
        </div>

        <MessageList orderBy={filter} filter={filterMsgText} />
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
