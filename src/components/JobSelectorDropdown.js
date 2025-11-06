import React, { useState, useRef, useEffect } from 'react';
import './JobSelectorDropdown.css';

// Danh sách job titles từ CSV (đã chuẩn hóa)
const availableJobs = [
  'Software Engineer', 'Data Scientist', 'Software Engineer Manager', 'Data Analyst',
  'Senior Project Engineer', 'Product Manager', 'Full Stack Engineer', 'Front End Developer',
  'Marketing Manager', 'Back End Developer', 'Senior Software Engineer', 'Marketing Coordinator',
  'Junior Sales Associate', 'Financial Manager', 'Marketing Analyst', 'Software Developer',
  'Operations Manager', 'Human Resources Manager', 'Director Of Marketing', 'Web Developer',
  'Product Designer', 'Research Director', 'Content Marketing Manager', 'Sales Associate',
  'Director Of Hr', 'Senior Product Marketing Manager', 'Research Scientist', 'Marketing Director',
  'Sales Director', 'Senior Data Scientist', 'Junior Hr Generalist', 'Junior Software Developer',
  'Receptionist', 'Director Of Data Science', 'Sales Manager', 'Digital Marketing Manager',
  'Junior Marketing Manager', 'Junior Software Engineer', 'Senior Research Scientist',
  'Human Resources Coordinator', 'Senior Human Resources Manager', 'Junior Web Developer',
  'Senior Hr Generalist', 'Junior Sales Representative', 'Financial Analyst', 'Sales Representative',
  'Sales Executive', 'Junior Hr Coordinator', 'Junior Data Analyst', 'Project Manager',
  'Graphic Designer', 'Digital Marketing Specialist', 'Social Media Manager', 'Director Of Operations',
  'Senior Business Analyst', 'Senior Marketing Analyst', 'Senior Marketing Manager',
  'Junior Business Analyst', 'Senior Financial Analyst', 'Junior Business Development Associate',
  'Senior Project Manager', 'Junior Financial Analyst', 'Customer Service Representative',
  'Junior Marketing Coordinator', 'Senior Product Manager', 'Senior Operations Manager',
  'Senior Project Coordinator', 'Junior Project Manager', 'Junior Operations Analyst',
  'Delivery Driver', 'Senior Financial Manager', 'Junior Marketing Specialist', 'Senior Product Designer',
  'Junior Product Manager', 'Senior Operations Coordinator', 'Senior Business Development Manager',
  'Senior Marketing Specialist', 'Senior Data Engineer', 'Junior Accountant', 'Senior Scientist',
  'Senior Marketing Coordinator', 'Junior Marketing Analyst', 'Senior Software Developer',
  'Juniour Hr Coordinator', 'Juniour Hr Generalist', 'Senior Ux Designer', 'Junior Operations Manager',
  'Senior Financial Advisor', 'Senior Data Analyst', 'Senior Hr Manager', 'Senior Sales Representative',
  'Senior Operations Analyst', 'Unknown', 'Junior Business Operations Analyst', 'Administrative Assistant',
  'Event Coordinator', 'Customer Service Manager', 'Hr Manager', 'Senior Manager', 'Senior Engineer',
  'Recruiter', 'Director Of Engineering', 'Senior Sales Manager', 'Director Of Finance',
  'Senior It Consultant', 'Business Analyst', 'Director Of Human Resources', 'Senior Accountant',
  'Hr Generalist', 'Junior Account Manager', 'Operations Director', 'Customer Success Rep',
  'Ux Designer', 'Vp Of Operations', 'It Support', 'Social Media Specialist', 'Software Manager',
  'Senior Consultant', 'Director', 'Customer Service Rep', 'Data Entry Clerk', 'Ceo',
  'Junior Developer', 'Accountant', 'Network Engineer', 'Copywriter', 'Strategy Consultant',
  'Account Manager', 'Help Desk Analyst', 'Business Development Manager', 'It Manager',
  'Vp Of Finance', 'Ux Researcher', 'Business Intelligence Analyst', 'Project Engineer',
  'Technical Writer', 'Marketing Specialist', 'Principal Engineer', 'Chief Data Officer',
  'Digital Content Producer', 'It Support Specialist', 'Chief Technology Officer',
  'Senior Training Specialist', 'Sales Operations Manager', 'Junior Web Designer',
  'Training Specialist', 'Supply Chain Manager', 'Principal Scientist', 'Junior Designer',
  'Financial Advisor', 'Creative Director', 'Operations Analyst', 'Public Relations Manager',
  'Product Marketing Manager', 'Senior Graphic Designer', 'Software Project Manager',
  'Supply Chain Analyst', 'Customer Success Manager', 'Technical Recruiter',
  'Human Resources Director', 'Technical Support Specialist', 'Junior Customer Support Specialist',
  'Senior It Support Specialist', 'Director Of Sales', 'Junior Recruiter', 'Office Manager',
  'Junior Ux Designer', 'Director Of Business Development', 'Junior Social Media Manager',
  'Senior Quality Assurance Analyst', 'Senior It Project Manager', 'Director Of Sales And Marketing',
  'Junior Copywriter', 'Senior Researcher', 'Senior Account Manager', 'Junior Data Scientist',
  'Senior Human Resources Coordinator', 'Director Of Product Management', 'Senior Marketing Director',
  'Director Of Human Capital', 'Junior Advertising Coordinator', 'Senior Human Resources Specialist',
  'Senior Account Executive', 'Senior Hr Specialist', 'Senior Software Architect',
  'Junior Financial Advisor', 'Junior Operations Coordinator', 'Junior Research Scientist',
  'Junior Social Media Specialist', 'Senior Product Development Manager', 'Developer',
  'Social M', 'Social Media Man'
];

// Tự động phân loại jobs
const categorizeJobs = (jobs) => {
  const categories = {
    'Engineering & Tech': [],
    'Data & Analytics': [],
    'Management': [],
    'Marketing & Sales': [],
    'Human Resources': [],
    'Design & Creative': [],
    'Operations & Support': [],
    'Finance & Accounting': [],
    'Project Management': [],
    'Research': [],
    'Business Development': [],
    'Other': []
  };

  jobs.forEach(job => {
    const jobLower = job.toLowerCase();
    
    // Engineering & Tech
    if (jobLower.includes('software') || jobLower.includes('engineer') || 
        jobLower.includes('developer') || jobLower.includes('it ') || 
        jobLower.includes('technical') || jobLower.includes('technology') ||
        jobLower.includes('network') || jobLower.includes('web ')) {
      categories['Engineering & Tech'].push(job);
    }
    // Data & Analytics
    else if (jobLower.includes('data') || jobLower.includes('analyst') ||
             jobLower.includes('intelligence')) {
      categories['Data & Analytics'].push(job);
    }
    // Human Resources
    else if (jobLower.includes('hr') || jobLower.includes('human resources') ||
             jobLower.includes('recruiter')) {
      categories['Human Resources'].push(job);
    }
    // Marketing & Sales
    else if (jobLower.includes('marketing') || jobLower.includes('sales') ||
             jobLower.includes('social media') || jobLower.includes('advertising') ||
             jobLower.includes('account')) {
      categories['Marketing & Sales'].push(job);
    }
    // Design & Creative
    else if (jobLower.includes('designer') || jobLower.includes('ux') ||
             jobLower.includes('graphic') || jobLower.includes('creative') ||
             jobLower.includes('copywriter') || jobLower.includes('content')) {
      categories['Design & Creative'].push(job);
    }
    // Finance & Accounting
    else if (jobLower.includes('financial') || jobLower.includes('accountant') ||
             jobLower.includes('finance')) {
      categories['Finance & Accounting'].push(job);
    }
    // Project Management
    else if (jobLower.includes('project') && jobLower.includes('manager')) {
      categories['Project Management'].push(job);
    }
    // Research
    else if (jobLower.includes('research') || jobLower.includes('scientist')) {
      categories['Research'].push(job);
    }
    // Business Development
    else if (jobLower.includes('business development')) {
      categories['Business Development'].push(job);
    }
    // Operations & Support
    else if (jobLower.includes('operations') || jobLower.includes('support') ||
             jobLower.includes('customer service') || jobLower.includes('receptionist') ||
             jobLower.includes('administrative') || jobLower.includes('delivery') ||
             jobLower.includes('supply chain') || jobLower.includes('help desk')) {
      categories['Operations & Support'].push(job);
    }
    // Management (general)
    else if (jobLower.includes('manager') || jobLower.includes('director') ||
             jobLower.includes('vp ') || jobLower.includes('ceo') ||
             jobLower.includes('chief') || jobLower.includes('officer')) {
      categories['Management'].push(job);
    }
    // Other
    else {
      categories['Other'].push(job);
    }
  });

  // Sắp xếp alphabetically trong mỗi category
  Object.keys(categories).forEach(cat => {
    categories[cat].sort();
  });

  // Xóa categories trống
  Object.keys(categories).forEach(cat => {
    if (categories[cat].length === 0) {
      delete categories[cat];
    }
  });

  return categories;
};

const jobCategories = categorizeJobs(availableJobs);

function JobSelectorDropdown({ selectedJob, onJobChange }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setOpenCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCategoryHover = (category) => {
    setOpenCategory(category);
    
    const categoryElement = categoryRefs.current[category];
    if (categoryElement) {
      const rect = categoryElement.getBoundingClientRect();
      setFlyoutPosition({
        top: rect.top,
        left: rect.right + 5
      });
    }
  };

  const handleJobSelect = (job) => {
    onJobChange(job);
    setIsDropdownOpen(false);
    setOpenCategory(null);
  };

  return (
    <div className="form-group">
      <label htmlFor="jobTitle">Job Title:</label>
      <div className="job-selector-container" ref={dropdownRef}>
        <div
          className="selected-job-display"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsDropdownOpen(!isDropdownOpen);
            }
          }}
        >
          {selectedJob || 'Select a job title...'}
        </div>

        {isDropdownOpen && (
          <div className="job-dropdown-menu-horizontal">
            <ul className="category-list">
              {Object.entries(jobCategories).map(([category, jobs]) => (
                <li
                  key={category}
                  ref={(el) => categoryRefs.current[category] = el}
                  className={`category-item-horizontal ${openCategory === category ? 'active' : ''}`}
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <div className="category-header-horizontal">
                    {category}
                    <span className="category-count">({jobs.length})</span>
                    <span className="category-arrow-horizontal">›</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isDropdownOpen && openCategory && (
          <ul 
            className="job-list-flyout"
            style={{
              top: `${flyoutPosition.top}px`,
              left: `${flyoutPosition.left}px`
            }}
            onMouseLeave={() => setOpenCategory(null)}
          >
            {jobCategories[openCategory].map((job) => (
              <li
                key={job}
                onClick={() => handleJobSelect(job)}
                className={selectedJob === job ? 'selected' : ''}
              >
                {job}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobSelectorDropdown;