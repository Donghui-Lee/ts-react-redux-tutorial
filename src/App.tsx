import React from "react";
import CounterContainer from "./containers/CounterContainer";
import TodoApp from "./containers/TodoApp";
import GithubProfileLoader from "./containers/GithubPorfileLoader";

function App() {
  return (
    <>
      <CounterContainer />
      <hr />
      <TodoApp />
      <tr />
      <GithubProfileLoader />
    </>
  );
}

export default App;
