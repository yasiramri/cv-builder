// components/CVPreview.jsx
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const CVPreview = ({
  personal,
  experiences,
  educations,
  summary,
  skills = [],
  languages = [],
  certificates = [],
}) => {
  return (
    <div className="card p-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-4 mb-4">
        {personal.image && (
          <img
            src={personal.image}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
        )}
        <div className="flex-grow-1">
          <h2 className="fw-bold mb-0">
            {personal.firstName} {personal.lastName}
          </h2>
          <div className="text-muted small">{personal.title}</div>
        </div>
        <div className="text-end small">
          {personal.phone && (
            <div className="mb-1">
              <FaPhone className="me-2" /> {personal.phone}
            </div>
          )}
          {personal.email && (
            <div className="mb-1">
              <FaEnvelope className="me-2" /> {personal.email}
            </div>
          )}
          {personal.website && (
            <div className="mb-1">
              <FaGlobe className="me-2" /> {personal.website}
            </div>
          )}
          {(personal.city || personal.country) && (
            <div>
              <FaMapMarkerAlt className="me-2" /> {personal.city},{' '}
              {personal.country}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-4">
          <h5 className="mb-2">Summary</h5>
          <p className="text-muted">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <>
          <hr className="my-4" />
          <h5 className="mb-3">Experience</h5>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{exp.title}</div>
                  <div className="text-muted small">{exp.company}</div>
                </div>
                <div className="text-secondary small text-nowrap">
                  {exp.startMonth && exp.startYear
                    ? `${exp.startMonth} ${exp.startYear}`
                    : ''}
                  {exp.present
                    ? ' - Present'
                    : exp.endMonth && exp.endYear
                    ? ` - ${exp.endMonth} ${exp.endYear}`
                    : ''}
                </div>
              </div>
              {exp.accomplishments && (
                <ul className="small mt-2 ps-3">
                  {exp.accomplishments
                    .split('\n')
                    .map(
                      (line, idx) => line.trim() && <li key={idx}>{line}</li>
                    )}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Education</h5>
          {educations.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{edu.degree}</div>
                  <div className="text-muted small">{edu.institution}</div>
                </div>
                <div className="text-secondary small text-nowrap">
                  {edu.startMonth && edu.startYear
                    ? `${edu.startMonth} ${edu.startYear}`
                    : ''}
                  {edu.present
                    ? ' - Present'
                    : edu.endMonth && edu.endYear
                    ? ` - ${edu.endMonth} ${edu.endYear}`
                    : ''}
                </div>
              </div>
              {edu.achievements && (
                <ul className="small mt-2 ps-3">
                  {edu.achievements
                    .split('\n')
                    .map(
                      (line, idx) => line.trim() && <li key={idx}>{line}</li>
                    )}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Skills</h5>
          <ul className="small">
            {skills.map((s, i) => (
              <li key={i}>
                {s.name} {s.level ? `- ${s.level}` : ''}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Languages</h5>
          <ul className="small">
            {languages.map((l, i) => (
              <li key={i}>
                {l.name} {l.level ? `- ${l.level}` : ''}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <>
          <h5 className="mt-4 mb-3">Certificates</h5>
          {certificates.map((c, i) => (
            <div key={i} className="mb-3">
              <div className="fw-semibold">{c.name}</div>
              <div className="text-muted small">{c.organization}</div>
              <div className="text-secondary small text-nowrap">
                {c.startMonth && c.startYear
                  ? `${c.startMonth} ${c.startYear}`
                  : ''}
                {c.present
                  ? ' - Present'
                  : c.endMonth && c.endYear
                  ? ` - ${c.endMonth} ${c.endYear}`
                  : ''}
              </div>
              {c.description && (
                <div className="small mt-1">{c.description}</div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CVPreview;
