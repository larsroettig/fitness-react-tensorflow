import React from "react";

import { RunTrainingButton } from "./components/RunTrainingButton";

function App() {
  return (
    <div className="App">
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <RunTrainingButton />
        </div>
      </div>
    </div>
  );
}

export default App;
