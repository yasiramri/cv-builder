import React, { useRef, useState } from 'react';
import ResumeFormSections from '../components/ResumeFormSections';
import CVPreview from '../components/CVPreview';
import { useReactToPrint } from 'react-to-print'; // ✅ GUNAKAN HOOK

const CVBuilderPage = () => {
  const [personal, setPersonal] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [summary, setSummary] = useState('');

  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `${personal.firstName || 'My'}_CV`,
  });

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>CV Builder</h3>
        <button className="btn btn-primary" onClick={handlePrint}>
          Download PDF
        </button>
      </div>

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
          <div ref={previewRef}>
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
    </div>
  );
};

export default CVBuilderPage;
