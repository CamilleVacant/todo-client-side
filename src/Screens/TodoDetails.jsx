import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import dayjs from "dayjs";

export const TODO_BY_ID = gql`
  query GetTodoByID($id: ID!) {
    getTodoById(id: $id) {
      createdAt
      type
      isDone
      text
      title
    }
  }
`;

const TodoDetails = (props) => {
  const pageTitle = "Détails de la TODO";
  const { id } = props.location.state;
  const { loading, error, data } = useQuery(TODO_BY_ID, {
    variables: { id: id },
  });
  const cdate = dayjs(data?.getTodoById?.date).format("DD/MM/YYYY");

  if (loading) return <p>Chargement...</p>;
  if (error) {
    console.log(error);
    return <p>Une erreur est survenue</p>;
  }
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h1>{pageTitle}</h1>
      <div
        className={css`
          padding: 32px;
          margin: 32px;
          border: solid 1px lightgrey;
          background-color: #fffafa;
          border-radius: 4px;
          display: flex;
          align-self: center;
          text-align: left;
          flex-direction: column;
        `}
      >
        <h2>{data?.getTodoById?.title}</h2>
        <p>Description : {data?.getTodoById?.text}</p>
        <p>Date de création : {cdate}</p>
        <p>Statut : {data?.getTodoById?.isDone ? "Réalisé" : "En cours"}</p>
        <p>Type : {data?.getTodoById?.type}</p>
        <Link to="/">
          <p
            className={css`
              text-align: right;
            `}
          >
            Revenir à la liste...
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TodoDetails;
