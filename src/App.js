import InputForm from './components/InputForm';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (formData) => {
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch('https://backend-lab01-ml.onrender.com/predict_salary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong with the prediction.');
      }

      const data = await response.json();
      setPrediction(data.predicted_salary);
    } catch (err) {
      console.error("Error during prediction:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Salary Prediction App</h1>
      </header>
      <main>
        <InputForm onPredict={handlePredict} />

        {loading && <p className="message">Predicting salary...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {prediction !== null && (
          <div className="prediction-result">
            <h2>You may earn about:</h2>
            <p>${prediction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/year</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;