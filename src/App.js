import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm'; // Không cần import JobSelector ở đây nữa
import PredictionDisplay from './components/PredictionDisplay';

function App() {
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handlePredict = (formData) => {
    console.log("Form Data Submitted:", formData);
    setPredictedSalary(5000); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Salary Predictor</h1> 
      </header>
      <main>
        <InputForm onPredict={handlePredict} />
        <PredictionDisplay salary={predictedSalary} />
      </main>
    </div>
  );
}

export default App;