import { useReducer } from 'react'
import Table from "./components/Table";
import { Reducer, initialTable } from "./Reducer/Reducer";
import tableContext from "./Context/Context"

function App() {
  const [state, dispatch] = useReducer(Reducer, initialTable)
  return (

    <tableContext.Provider value={{ state, dispatch }}>

      <Table />

    </tableContext.Provider>

  );
}

export default App;
