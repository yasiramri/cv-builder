// components/ResumeFormSections.jsx
import React, { useState } from 'react';
import CVForm from './CVForm';

const ResumeFormSections = ({
  personal,
  setPersonal,
  experiences,
  setExperiences,
  educations,
  setEducations,
  skills,
  setSkills,
  languages,
  setLanguages,
  certificates,
  setCertificates,
  summary,
  setSummary,
}) => {
  const [activeSection, setActiveSection] = useState('personal');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Resume</h3>

      <div className="list-group mb-3">
        {[
          'personal',
          'experience',
          'education',
          'skills',
          'languages',
          'certificates',
          'summary',
        ].map((section) => (
          <button
            key={section}
            onClick={() => toggleSection(section)}
            className="list-group-item list-group-item-action d-flex justify-content-between"
          >
            <span>
              <i
                className={`bi bi-$
                  {
                    section === 'personal'
                      ? 'person-circle'
                      : section === 'experience'
                      ? 'briefcase'
                      : section === 'education'
                      ? 'mortarboard'
                      : section === 'skills'
                      ? 'lightning'
                      : section === 'languages'
                      ? 'translate'
                      : section === 'certificates'
                      ? 'award'
                      : 'justify-left'
                  } me-2`}
              ></i>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            <i
              className={`bi ${
                activeSection === section ? 'bi-eye' : 'bi-chevron-right'
              }`}
            ></i>
          </button>
        ))}
      </div>

      <div>
        {activeSection && (
          <div className="card p-4 mb-4">
            <CVForm
              section={activeSection}
              personal={personal}
              setPersonal={setPersonal}
              experiences={experiences}
              setExperiences={setExperiences}
              educations={educations}
              setEducations={setEducations}
              skills={skills}
              setSkills={setSkills}
              languages={languages}
              setLanguages={setLanguages}
              certificates={certificates}
              setCertificates={setCertificates}
              summary={summary}
              setSummary={setSummary}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeFormSections;
