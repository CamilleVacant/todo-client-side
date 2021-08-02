import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import TypeItem from "./TypeItem";
import { gql, useMutation } from "@apollo/client";
import { TODO_QUERY } from "../Providers/TodoProvider";
import { TODO_BY_ID } from "../Screens/TodoDetails"

const UPDATE_TODO = gql`
  mutation updateTodoStatus($id: ID!, $isDone: Boolean!) {
    updateTodoStatusById(id: $id, isDone: $isDone) {
      isDone
    }
  }
`;

const TodoItem = ({ id, title, type, date, checked }) => {
  const cdate = dayjs(date).format("DD/MM/YYYY");
  const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO, {refetchQueries: [TODO_QUERY, TODO_BY_ID]});

  if (loading) return "Chargement...";
  if (error) return `Erreur! ${error.message}`;

  return (
    <div
      className={css`
        padding: 32px;
        margin: 32px;
        border: solid 1px lightgrey;
        background-color: #fffafa;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <input
          type="checkbox"
          id="scales"
          name="scales"
          onClick={() => updateTodo({
            variables: {
              id: id,
              isDone: !checked,
            },
          })}
          {...{ checked }}
        ></input>
        <h4
          className={css`
            margin-left: 16px;
          `}
        >
          {title}
        </h4>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <TypeItem {...{ type }} />
        <h5>{cdate}</h5>
      </div>
      <Link to={{ pathname: "/details", state: { id } }}>
        <p
          className={css`
            display: flex;
            justify-self: right;
          `}
        >
          Détails...
        </p>
      </Link>
    </div>
  );
};

export default TodoItem;
