import React, { useState, useEffect } from "react";
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
  return (order && field) ? [field, order].join("_") : 'empty';
};

const Filter = ({ setFilter }) => {
  const [filterField, setFilterField] = useState("");
  const [orderBy, setOrder] = useState("");

  useEffect(() => {
    const filter = buildFilter({ order: orderBy, field: filterField });
    setFilter(filter);
  }, [orderBy, filterField, setFilter]);

  return (
    <div className="filters">
      <h3 className="filters__title filter-label"> Filters </h3>
      <Dropdown
        className="filters__item"
        fluid
        selection
        value={filterField}
        onChange={(_, data) => setFilterField(data.value)}
        options={fieldFilterOptions}
      />

      <Dropdown
        className="filters__item"
        fluid
        selection
        value={orderBy}
        onChange={(_, data) => setOrder(data.value)}
        options={orderFilterOptions}
      />
    </div>
  );
};

export { Filter };
