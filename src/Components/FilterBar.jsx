import React from "react";
import { css } from "@emotion/css";
import Filter from "./Filter";
import { useCallback, useContext } from "react";
import { todoContext } from "../Providers/TodoProvider";
import _ from "lodash";
import { options, filtersList } from "./Constant";

const FilterBar = () => {
  const { dispatch, isBusinessOnly, setIsBusinessOnly } =
    useContext(todoContext);
  const onClick = useCallback(() => {
    setIsBusinessOnly(false);
    dispatch({ filter: "reset" });
  }, [dispatch, setIsBusinessOnly]);
  const onCheckBoxClick = useCallback(
    () => setIsBusinessOnly(!isBusinessOnly),
    [isBusinessOnly, setIsBusinessOnly]
  );
console.log(options[filtersList[0]]);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        className={css`
          padding: 0px 8px 0px 8px;
          margin: 8px;
          background-color: #dbdbf5;
          display: flex;
          flex-wrap: wrap;
          align-self: center;
          font-size: 12px;
        `}
      >
        <p>Filtrer par : </p>
        {_.map(filtersList, (f) => (
          <Filter
            disabled={f === "Type" && isBusinessOnly}
            label={f}
            options={options?.[f]}
          />
        ))}
        <input
          type="checkbox"
          id="onlyBusiness"
          name="onlyBusiness"
          checked={isBusinessOnly}
          onClick={onCheckBoxClick}
        />
        <label
          className={css`
            margin-left: 8px;
            display: flex;
            align-self: center;
          `}
        >
          Uniquement les todo business
        </label>
      </div>
      <button {...{ onClick }}>Réinitialiser</button>
    </div>
  );
};

export default FilterBar;
