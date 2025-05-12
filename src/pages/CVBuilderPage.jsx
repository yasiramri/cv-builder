// pages/CVBuilderPage.jsx
import React, { useState } from 'react';
import ResumeFormSections from '../components/ResumeFormSections';
import CVPreview from '../components/CVPreview';

const CVBuilderPage = () => {
  const [personal, setPersonal] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  // ✅ Tambahkan state berikut
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [summary, setSummary] = useState('');

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <ResumeFormSections
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
        <div className="col-md-6">
          <CVPreview
            personal={personal}
            experiences={experiences}
            educations={educations}
            skills={skills}
            languages={languages}
            certificates={certificates}
            summary={summary}
          />
        </div>
      </div>
    </div>
  );
};

export default CVBuilderPage;
