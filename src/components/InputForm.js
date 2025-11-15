import React, { useState } from 'react';
import JobSelectorDropdown from './JobSelectorDropdown';
import './InputForm.css';

function InputForm({ onPredict }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedAge = parseInt(age);
    const parsedYearsOfExperience = parseFloat(yearsOfExperience); 
    if (parsedYearsOfExperience < 0) {
      alert("Years of Experience cannot be negative.");
      return;
    }

    if (parsedYearsOfExperience > parsedAge) {
      alert("Years of Experience cannot be greater than Age.");
      return;
    }


    const formData = {
      "Age": parsedAge,
      "Gender": gender,
      "Education Level": educationLevel,
      "Job Title": jobTitle,             
      "Years of Experience": parsedYearsOfExperience, 
    };
    onPredict(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="salary-form">
      {/* Input Age */}
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="18"
          placeholder="Enter your age"
        />
      </div>

      {/* Input Gender */}
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select gender...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
       </select>
      </div>

      {/* Input Education Level */}
      <div className="form-group">
        <label htmlFor="educationLevel">Education Level:</label>
        <select
          id="educationLevel"
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          required
        >
          <option value="">Select education level...</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      {/* Job Selector Dropdown */}
      <JobSelectorDropdown selectedJob={jobTitle} onJobChange={setJobTitle} />

      {/* Input Years of Experience */}
      <div className="form-group">
        <label htmlFor="yearsOfExperience">Years of Experience:</label>
        <input
          type="number"
          id="yearsOfExperience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          required
          min="0"
          step="0.1" 
          placeholder="Enter years of experience"
        />
      </div>

   

      {/* Predict Salary Button */}
      <button type="submit" className="predict-button">Predict Salary Per Year</button>
    </form>
  );
}

export default InputForm;