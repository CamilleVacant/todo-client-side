import './App.css';
import TodoList from "./Screens/TodoList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoDetails from "./Screens/TodoDetails";
import TodoProvider from './Providers/TodoProvider';

function App() {
  return (
    <div className="App">
      <TodoProvider>
      <Router>
            <Route path="/" exact component={TodoList}/>
            <Route path="/details" exact component={TodoDetails}/>
        </Router>
      </TodoProvider>
    </div>
  );
}

export default App;
