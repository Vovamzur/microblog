import React, { useState, useMemo } from "react";
import MessageInput from "./Message/MessageInput";
import MessageList from "./Message/MessageList";
import { Dropdown } from "semantic-ui-react";

const fieldFilterOptions = [
  {
    key: "createdAt",
    text: "createdAt",
    value: "createdAt",
  },
  {
    key: "likes",
    text: "likes",
    value: "likes",
  },
  {
    key: "dislikes",
    text: "dislikes",
    value: "dislikes",
  },
];

const orderFilterOptions = [
  {
    key: "ASC",
    text: "ASC",
    value: "ASC",
  },
  {
    key: "DESC",
    text: "DESC",
    value: "DESC",
  },
];

const buildFilter = ({ order, field }) => {
  return order && field
    ? [field, order].join("_")
    : [fieldFilterOptions[0], orderFilterOptions[0]]
        .map((v) => v.value)
        .join("_");
};

const App = () => {
  const [filterField, setFilterField] = useState(fieldFilterOptions[0].value);
  const [orderBy, setOrder] = useState(orderFilterOptions[0].value);
  const [filterMsgText, setFilterMsgText] = useState("");

  const filter = useMemo(() => {
    return buildFilter({ order: orderBy, field: filterField });
  }, [orderBy, filterField]);

  return (
    <div className="container">
      <div className="content">
        <Dropdown
          fluid
          selection
          value={filterField}
          onChange={(_, data) => setFilterField(data.value)}
          options={fieldFilterOptions}
        />

        <Dropdown
          fluid
          selection
          value={orderBy}
          onChange={(_, data) => setOrder(data.value)}
          options={orderFilterOptions}
        />

        <input type="text" onChange={(e) => setFilterMsgText(e.target.value)} />

        <MessageList orderBy={filter} filter={filterMsgText} />
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
