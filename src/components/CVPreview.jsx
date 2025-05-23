// components/CVPreview.jsx
import React, { useRef } from 'react'; // Import useRef
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF

const CVPreview = ({
  personal,
  experiences,
  educations,
  summary,
  skills = [],
  languages = [],
  certificates = [],
}) => {
  const cvRef = useRef(); // Create a ref for the CV content

  const handleDownload = async () => {
    if (!cvRef.current) return;

    const element = cvRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // Increase scale for better quality

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4'); // 'p' portrait, 'pt' points, 'a4' size

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate the ratio to fit the image within the PDF page
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center the image on the page (optional)
    const imgX = (pdfWidth - scaledWidth) / 2;
    const imgY = (pdfHeight - scaledHeight) / 2;

    // A simpler approach that scales to fit width, potentially exceeding page height (cut off)
    const aspectRatio = imgHeight / imgWidth;
    const newImgWidth = pdfWidth;
    const newImgHeight = newImgWidth * aspectRatio;
    let position = 0;

    // Handle multiple pages if needed (basic approach)
    // Note: This is a simplified multi-page handling. Complex layouts might need more work.
    while (position < newImgHeight) {
      pdf.addImage(imgData, 'PNG', 0, position, newImgWidth, newImgHeight);
      position -= pdfHeight; // Move up by page height for the next page
      if (position < newImgHeight) {
        pdf.addPage(); // Add a new page if there's more content
      }
    }

    pdf.save(
      `${personal.firstName || 'cv'}_${personal.lastName || 'preview'}.pdf`
    );
  };

  // Helper function to render list items from multiline text
  const renderListItems = (text) => {
    if (!text) return null;
    // Split by newline, filter out empty lines, and map to <li>
    return text
      .split('\n')
      .map((line, idx) => line.trim())
      .filter((line) => line.length > 0) // Ensure line is not just whitespace or empty
      .map((line, idx) => <li key={idx}>{line}</li>);
  };

  return (
    <div className="card p-4">
      {/* Wrap the content to be captured in the ref div */}
      <div ref={cvRef}>
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
                <FaMapMarkerAlt className="me-2" /> {personal.city}
                {personal.city && personal.country ? ', ' : ''}
                {personal.country}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mt-4">
            <h5 className="mb-2">Summary</h5>
            {/* Using <p> for summary, not a list */}
            <p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
              {summary}
            </p>{' '}
            {/* Added pre-wrap to respect line breaks in summary */}
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <>
            {/* Add hr before section */}
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
                {/* Use the helper function for accomplishments */}
                {exp.accomplishments && (
                  // Removed ps-3 to rely on default ul padding/margin which usually includes space for bullets
                  <ul className="small">
                    {renderListItems(exp.accomplishments)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <>
            {/* Add hr before section */}
            <hr className="my-4" />
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
                {/* Use the helper function for achievements */}
                {edu.achievements && (
                  // Removed ps-3
                  <ul className="small">{renderListItems(edu.achievements)}</ul>
                )}
              </div>
            ))}
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            {/* Add hr before section */}
            <hr className="my-4" />
            <h5 className="mt-4 mb-3">Skills</h5>
            {/* Skills list should already have bullets */}
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
        {/* This section's rendering logic is correct; it should appear if 'languages' prop is a non-empty array */}
        {languages.length > 0 && (
          <>
            {/* Add hr before section */}
            <hr className="my-4" />
            <h5 className="mt-4 mb-3">Languages</h5>
            {/* Languages list should already have bullets */}
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
            {/* Add hr before section */}
            <hr className="my-4" />
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
                {/* Description is not a list */}
                {c.description && (
                  <div className="small mt-1">{c.description}</div>
                )}
              </div>
            ))}
          </>
        )}
      </div>{' '}
      {/* End ref div */}
      {/* Download Button - outside the ref div so it's not included in the PDF */}
      <div className="mt-4 text-center">
        {/* Add a Bootstrap button */}
        <button className="btn btn-primary" onClick={handleDownload}>
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default CVPreview;
