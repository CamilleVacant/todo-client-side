import React from "react";
import { css } from "@emotion/css";
import _ from "lodash";
import { useCallback, useContext, useState } from "react";
import { todoContext } from "../Providers/TodoProvider";

const Filter = ({ label, options, disabled }) => {
  const { dispatch } = useContext(todoContext);
  const [selectedLabel, setSelectedLabel] = useState(label)
    const onChange = useCallback(
    (e) => {
      const currentLabel = _.filter(options, {value: e.target.value})[0]?.label
      setSelectedLabel(currentLabel)
      dispatch({
        filter: label,
        payload:
          e.target.value === "true"
            ? true
            : e.target.value === "false"
            ? false
            : e.target.value,
      });
    },
    [dispatch, label, options]
  );

  return (
    <div
      className={css`
        display: flex;
        font-size: 12px;
        padding: 8px;
      `}
    >
      <select value={selectedLabel} {...{ onChange, disabled }}>
        {_.map(options, (o) => (
          <option value={o?.value}>{o?.label}</option>
          )
        )}
      </select>
    </div>
  );
};

export default Filter;
