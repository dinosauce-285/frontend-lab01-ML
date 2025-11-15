function PredictionDisplay({ salary }) {
  return (
    <div className="prediction-display">
      {salary !== null ? (
        <h2>Salary Predicted: ${salary}</h2>
      ) : (
        <p>Input info and click the button to show result

        </p>
      )}
    </div>
  );
}

export default PredictionDisplay;