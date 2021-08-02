import React from "react";
import { createContext, useReducer, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

export const todoContext = createContext();

export const TODO_QUERY = gql`
  query GetTodoByType(
    $isDone: Boolean
    $types: [TodoTypes!]
    $orderBy: Ordering
  ) {
    getTodoList(
      filters: { isDone: $isDone, types: $types }
      orderBy: $orderBy
    ) {
      title
      type
      id
      isDone
      createdAt
    }
  }
`;

const TodoProvider = ({ children }) => {
  const [isBusinessOnly, setIsBusinessOnly] = useState();

  const initialFilters = {
    date: undefined,
    type: undefined,
    statut: undefined,
  };
  const init = () => initialFilters;
  const reducer = (state, action) => {
    switch (action.filter) {
      case "Date":
        return {
          ...state,
          date: action.payload,
        };
      case "Type":
        return {
          ...state,
          type: action.payload,
        };
      case "Statut":
        return {
          ...state,
          statut: action.payload,
        };
      case "reset":
        return init(action.payload);
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialFilters, init);
  const parameters = useMemo(
    () =>
      isBusinessOnly
        ? { isDone: state?.statut, types: ["Marketing", "Communication"] }
        : { isDone: state?.statut, types: state?.type },
    [isBusinessOnly, state]
  );
  const { loading, error, data } = useQuery(TODO_QUERY, {
    variables: { ...parameters, orderBy: state?.date },
  });

  console.log(state);

  const contextValue = {
    dispatch,
    data,
    isBusinessOnly,
    setIsBusinessOnly,
    error,
    loading,
  };
  return (
    <todoContext.Provider value={contextValue}>{children}</todoContext.Provider>
  );
};

export default TodoProvider;
