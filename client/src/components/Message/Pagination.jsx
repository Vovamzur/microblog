import React, { useEffect } from "react";
import { Pagination } from "semantic-ui-react";

const MESSAGES_PER_PAGE = 2;

const PaginationCustom = ({
  count,
  refetch,
  currentMessageCount,
  setCurrentMessageCount,
}) => {
  useEffect(() => {
    refetch({ skip: currentMessageCount });
  }, [currentMessageCount, refetch]);

  const onPageChange = (_, data) => {
    setCurrentMessageCount(MESSAGES_PER_PAGE * (data.activePage - 1));
  };

  return (
    <div className="msg-pagination">
      <Pagination
        className="pagination"
        activePage={Math.ceil(currentMessageCount / MESSAGES_PER_PAGE + 1)}
        totalPages={Math.ceil(count / MESSAGES_PER_PAGE)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export { PaginationCustom, MESSAGES_PER_PAGE };
