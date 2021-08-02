import React, { useMemo, useContext } from "react";
import { css } from "@emotion/css";
import TodoItem from "../Components/TodoItem";
import _ from "lodash";
import FilterBar from "../Components/FilterBar";
import { todoContext } from "../Providers/TodoProvider";

const TodoList = () => {
  const { data, loading, error } = useContext(todoContext);
  const todoList = useMemo(
    () =>
      _.map(data?.getTodoList, (t) => (
        <li>
          <TodoItem
            title={t?.title}
            id={t?.id}
            date={t?.createdAt}
            type={t?.type}
            checked={t?.isDone}
          />
        </li>
      )),
    [data]
  );

  if (loading) return "Chargement...";
  if (error) return `Erreur! ${error.message}`;

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        list-style: none;
      `}
    >
      <h1>Ma TODO liste</h1>
      <FilterBar />
      <ul
        className={css`
          list-style: none;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        `}
      >
        {_.isEmpty(data) ? <p>Vous n'avez pas encore de TODO</p> : todoList}
      </ul>
    </div>
  );
};

export default TodoList;
