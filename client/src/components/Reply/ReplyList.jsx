import React, { useState } from "react";
import { ReplyItem } from "./ReplyItem";
import ReplyForm from "./ReplyForm";

const ReplyList = ({ messageId, replies, orderBy, filter, variables }) => {
  const [showReplyForm, toggleForm] = useState(false);

  return (
    <div className="reply-list">
      <button
        className="reply-button"
        onClick={() => toggleForm(!showReplyForm)}
      >
        {showReplyForm ? "X" : "Reply"}
      </button>
      <div className="replies">
        {replies.map((item) => (
          <ReplyItem key={item.id} {...item} />
        ))}
      </div>
      {showReplyForm && (
        <ReplyForm
          messageId={messageId}
          toggleForm={toggleForm}
          variables={variables}
        />
      )}
    </div>
  );
};

export default ReplyList;
