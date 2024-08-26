import { useState } from "react";
import "./App.css";

import Table from "./components/Table";
import BarChart from "./components/BarChart";
import Stat from "./components/Stat";

function App() {
  const [month, setMonth] = useState(3);


  return (
    <div>
      <select
        className="outline-none focus:outline-none p-2 bg-white rounded-3xl m-3"
        onChange={(e) => setMonth(e.target.value)}
        defaultValue={3}
      >
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
      </select>
      <Table month={month} />
      <Stat  month={month}/>
      <BarChart month={month}/>
    </div>
  );
}

export default App;
