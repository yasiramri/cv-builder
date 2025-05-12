// components/CVForm.jsx
import React from 'react';
import { useState } from 'react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = Array.from({ length: 51 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

const CVForm = ({
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
  section = 'all',
}) => {
  const [bulletActive, setBulletActive] = useState([]);
  const [eduBulletActive, setEduBulletActive] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newProficiency, setNewProficiency] = useState('');

  const handlePersonalChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPersonal((prev) => ({
        ...prev,
        image: URL.createObjectURL(files[0]),
      }));
    } else {
      setPersonal((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEducationChange = (i, e) => {
    const { name, value, type, checked } = e.target;
    const list = [...educations];
    list[i][name] = type === 'checkbox' ? checked : value;
    setEducations(list);
  };

  const handleEducationKeyDown = (i, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const list = [...educations];
      const current = list[i].achievements || '';
      const lines = current.split('\n');
      const lastLine = lines[lines.length - 1];
      const addBullet = lastLine.trim().startsWith('•');
      list[i].achievements = current + (addBullet ? '\n• ' : '\n');
      setEducations(list);
    }
  };

  const addBulletToEducation = (i) => {
    const list = [...educations];
    const current = list[i].achievements || '';
    const lines = current.split('\n');
    const lastLine = lines[lines.length - 1];
    const bullet = lastLine.trim().startsWith('•');

    const activeState = [...eduBulletActive];
    activeState[i] = bullet || current === '';
    setEduBulletActive(activeState);

    if (!bullet) {
      list[i].achievements =
        current + (current.endsWith('\n') || current === '' ? '• ' : '\n• ');
      setEducations(list);
    }
  };

  const handleExperienceChange = (i, e) => {
    const { name, value, type, checked } = e.target;
    const list = [...experiences];
    list[i][name] = type === 'checkbox' ? checked : value;
    setExperiences(list);
  };

  const handleAccomplishmentKeyDown = (i, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const list = [...experiences];
      const current = list[i].accomplishments || '';
      const lines = current.split('\n');
      const lastLine = lines[lines.length - 1];
      const addBullet = lastLine.trim().startsWith('•');
      list[i].accomplishments = current + (addBullet ? '\n• ' : '\n');
      setExperiences(list);
    }
  };

  const addBulletToAccomplishments = (i) => {
    const list = [...experiences];
    const current = list[i].accomplishments || '';
    const lines = current.split('\n');
    const lastLine = lines[lines.length - 1];
    const bullet = lastLine.trim().startsWith('•');

    const activeState = [...bulletActive];
    activeState[i] = bullet || current === '';
    setBulletActive(activeState);

    if (!bullet) {
      list[i].accomplishments =
        current + (current.endsWith('\n') || current === '' ? '• ' : '\n• ');
      setExperiences(list);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([
        ...skills,
        { name: newSkill.trim(), proficiency: newProficiency },
      ]);
      setNewSkill('');
      setNewProficiency('');
    }
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        institution: '',
        degree: '',
        field: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        present: false,
        achievements: '',
      },
    ]);
    setEduBulletActive([...eduBulletActive, false]);
  };

  const deleteEducation = (i) => {
    const updated = [...educations];
    const updatedBullets = [...eduBulletActive];
    updated.splice(i, 1);
    updatedBullets.splice(i, 1);
    setEducations(updated);
    setEduBulletActive(updatedBullets);
  };

  const deleteExperience = (i) => {
    const updated = [...experiences];
    const updatedBullets = [...bulletActive];
    updated.splice(i, 1);
    updatedBullets.splice(i, 1);
    setExperiences(updated);
    setBulletActive(updatedBullets);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: '',
        company: '',
        website: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        present: false,
        accomplishments: '',
      },
    ]);
    setBulletActive([...bulletActive, false]);
  };

  const handleCertificateChange = (i, e) => {
    const { name, value, type, checked } = e.target;
    const list = [...certificates];
    list[i][name] = type === 'checkbox' ? checked : value;
    setCertificates(list);
  };

  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        name: '',
        url: '',
        organization: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        noExpiry: false,
        description: '',
      },
    ]);
  };

  const deleteCertificate = (i) => {
    const updated = [...certificates];
    updated.splice(i, 1);
    setCertificates(updated);
  };

  const handleLanguageChange = (i, e) => {
    const { name, value } = e.target;
    const list = [...languages];
    list[i][name] = value;
    setLanguages(list);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: '', level: '' }]);
  };

  const deleteLanguage = (i) => {
    const list = [...languages];
    list.splice(i, 1);
    setLanguages(list);
  };

  return (
    <div className="card p-4">
      {(section === 'personal' || section === 'all') && (
        <div>
          <h5 className="card-title">Personal Details</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-4 d-flex flex-column align-items-center">
              <div
                className="border rounded w-100 text-center p-4"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                {personal.image ? (
                  <img
                    src={personal.image}
                    alt="Profile"
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: '150px' }}
                  />
                ) : (
                  <>
                    <div style={{ fontSize: '2rem' }}>📷</div>
                    <div className="small text-muted">
                      Upload your profile image
                      <br />
                      up to 5MB in size.
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handlePersonalChange}
                  className="form-control mt-2"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={personal.firstName || ''}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={personal.lastName || ''}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Job Title"
                    value={personal.title || ''}
                    onChange={handlePersonalChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="text-uppercase text-muted mb-2">Contact Details</h6>
            <input
              type="text"
              name="phone"
              className="form-control mb-2"
              placeholder="Phone Number"
              value={personal.phone}
              onChange={handlePersonalChange}
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              placeholder="Email Address"
              value={personal.email}
              onChange={handlePersonalChange}
            />
            <input
              type="text"
              name="website"
              className="form-control"
              placeholder="Personal Website (Optional)"
              value={personal.website || ''}
              onChange={handlePersonalChange}
            />
          </div>

          <div className="mb-4">
            <h6 className="text-uppercase text-muted mb-2">Location</h6>
            <div className="row g-2">
              <div className="col-md-6">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={personal.city || ''}
                  onChange={handlePersonalChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="State or Country"
                  value={personal.country || ''}
                  onChange={handlePersonalChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience */}
      {(section === 'experience' || section === 'all') && (
        <div>
          <h5 className="card-title">Experience</h5>
          {experiences.map((exp, i) => (
            <div key={i} className="position-relative border rounded p-4 mb-4">
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute top-0 end-0 text-danger"
                onClick={() => deleteExperience(i)}
              >
                Delete <i className="bi bi-trash" />
              </button>

              <input
                type="text"
                name="title"
                className="form-control mb-2"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(i, e)}
              />
              <input
                type="text"
                name="company"
                className="form-control mb-2"
                placeholder="Company or Project Name"
                value={exp.company}
                onChange={(e) => handleExperienceChange(i, e)}
              />
              <input
                type="text"
                name="website"
                className="form-control mb-3"
                placeholder="Company Website Link (Optional)"
                value={exp.website}
                onChange={(e) => handleExperienceChange(i, e)}
              />

              <label className="form-label">Start Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="startMonth"
                    className="form-select"
                    value={exp.startMonth}
                    onChange={(e) => handleExperienceChange(i, e)}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="startYear"
                    className="form-select"
                    value={exp.startYear}
                    onChange={(e) => handleExperienceChange(i, e)}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="form-label">End Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="endMonth"
                    className="form-select"
                    value={exp.endMonth}
                    onChange={(e) => handleExperienceChange(i, e)}
                    disabled={exp.present}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="endYear"
                    className="form-select"
                    value={exp.endYear}
                    onChange={(e) => handleExperienceChange(i, e)}
                    disabled={exp.present}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="present"
                  id={`present-${i}`}
                  checked={exp.present}
                  onChange={(e) => handleExperienceChange(i, e)}
                />
                <label className="form-check-label" htmlFor={`present-${i}`}>
                  Present
                </label>
              </div>

              <div className="mb-2">
                <label className="form-label">Accomplishments</label>
                <textarea
                  name="accomplishments"
                  className="form-control"
                  rows="4"
                  placeholder="Accomplishments"
                  value={exp.accomplishments}
                  onChange={(e) => handleExperienceChange(i, e)}
                  onKeyDown={(e) => handleAccomplishmentKeyDown(i, e)}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => addBulletToAccomplishments(i)}
              >
                • Add Bullet
              </button>
            </div>
          ))}
          <button onClick={addExperience} className="btn btn-link p-0 mb-4">
            + Add More Experience
          </button>
        </div>
      )}

      {/* Education */}
      {(section === 'education' || section === 'all') && (
        <div>
          <h5 className="card-title">Education</h5>
          {educations.map((edu, i) => (
            <div key={i} className="position-relative border rounded p-4 mb-4">
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute top-0 end-0 text-danger"
                onClick={() => deleteEducation(i)}
              >
                Delete <i className="bi bi-trash" />
              </button>

              <input
                type="text"
                name="institution"
                className="form-control mb-2"
                placeholder="University/School"
                value={edu.institution}
                onChange={(e) => handleEducationChange(i, e)}
              />
              <input
                type="text"
                name="degree"
                className="form-control mb-2"
                placeholder="Degree (e.g. Bachelor's degree, etc.)"
                value={edu.degree}
                onChange={(e) => handleEducationChange(i, e)}
              />
              <input
                type="text"
                name="field"
                className="form-control mb-3"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => handleEducationChange(i, e)}
              />

              <label className="form-label">Start Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="startMonth"
                    className="form-select"
                    value={edu.startMonth}
                    onChange={(e) => handleEducationChange(i, e)}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="startYear"
                    className="form-select"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(i, e)}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="form-label">End Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="endMonth"
                    className="form-select"
                    value={edu.endMonth}
                    onChange={(e) => handleEducationChange(i, e)}
                    disabled={edu.present}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="endYear"
                    className="form-select"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(i, e)}
                    disabled={edu.present}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="present"
                  id={`edu-present-${i}`}
                  checked={edu.present}
                  onChange={(e) => handleEducationChange(i, e)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`edu-present-${i}`}
                >
                  Present
                </label>
              </div>

              <div className="mb-2">
                <label className="form-label">Achievements</label>
                <textarea
                  name="achievements"
                  className="form-control"
                  rows="4"
                  placeholder="Achievements"
                  value={edu.achievements}
                  onChange={(e) => handleEducationChange(i, e)}
                  onKeyDown={(e) => handleEducationKeyDown(i, e)}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => addBulletToEducation(i)}
              >
                • Add Bullet
              </button>
            </div>
          ))}
          <button onClick={addEducation} className="btn btn-link p-0 mb-4">
            + Add More Education
          </button>
        </div>
      )}

      {/* Skills Section */}
      {(section === 'skills' || section === 'all') && (
        <div>
          <h5 className="card-title">Skills</h5>
          <div className="d-flex gap-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Skill Name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <select
              className="form-select"
              value={newProficiency}
              onChange={(e) => setNewProficiency(e.target.value)}
            >
              <option value="">- No rating -</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleAddSkill}
            >
              + Add
            </button>
          </div>

          <ul className="list-group">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {skill.name}
                <span className="badge bg-secondary">{skill.proficiency}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(section === 'languages' || section === 'all') && (
        <div>
          <h5 className="card-title">Languages</h5>
          {languages.map((lang, i) => (
            <div key={i} className="border rounded p-3 mb-3 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0"
                aria-label="Close"
                onClick={() => deleteLanguage(i)}
              ></button>
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="language"
                    className="form-control"
                    placeholder="Language"
                    value={lang.language}
                    onChange={(e) => handleLanguageChange(i, e)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    name="level"
                    className="form-select"
                    value={lang.level}
                    onChange={(e) => handleLanguageChange(i, e)}
                  >
                    <option value="">- No rating -</option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={addLanguage}
          >
            + Add Language
          </button>
        </div>
      )}

      {section === 'certificates' && (
        <div>
          <h5 className="card-title">Certificates</h5>
          {certificates.map((cert, i) => (
            <div key={i} className="position-relative border rounded p-4 mb-4">
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute top-0 end-0 text-danger"
                onClick={() => deleteCertificate(i)}
              >
                Delete <i className="bi bi-trash" />
              </button>

              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => handleCertificateChange(i, e)}
              />
              <input
                type="text"
                name="url"
                className="form-control mb-2"
                placeholder="Credential URL (Optional)"
                value={cert.url}
                onChange={(e) => handleCertificateChange(i, e)}
              />
              <input
                type="text"
                name="organization"
                className="form-control mb-3"
                placeholder="Issuing Organization (Optional)"
                value={cert.organization}
                onChange={(e) => handleCertificateChange(i, e)}
              />

              <label className="form-label">Start Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="startMonth"
                    className="form-select"
                    value={cert.startMonth}
                    onChange={(e) => handleCertificateChange(i, e)}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="startYear"
                    className="form-select"
                    value={cert.startYear}
                    onChange={(e) => handleCertificateChange(i, e)}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="form-label">End Date</label>
              <div className="row g-2 mb-2">
                <div className="col">
                  <select
                    name="endMonth"
                    className="form-select"
                    value={cert.endMonth}
                    onChange={(e) => handleCertificateChange(i, e)}
                    disabled={cert.noExpiry}
                  >
                    <option>Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select
                    name="endYear"
                    className="form-select"
                    value={cert.endYear}
                    onChange={(e) => handleCertificateChange(i, e)}
                    disabled={cert.noExpiry}
                  >
                    <option>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="noExpiry"
                  id={`cert-expiry-${i}`}
                  checked={cert.noExpiry}
                  onChange={(e) => handleCertificateChange(i, e)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`cert-expiry-${i}`}
                >
                  Does not expire
                </label>
              </div>

              <div className="mb-2">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  value={cert.description}
                  onChange={(e) => handleCertificateChange(i, e)}
                ></textarea>
              </div>
            </div>
          ))}
          <button onClick={addCertificate} className="btn btn-link p-0 mb-4">
            + Add More Certificate
          </button>
        </div>
      )}

      {(section === 'summary' || section === 'all') && (
        <div>
          <h5 className="card-title">Professional Summary</h5>
          <div className="position-relative mb-4">
            <textarea
              className="form-control"
              placeholder="Your Professional Summary"
              rows="6"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVForm;
