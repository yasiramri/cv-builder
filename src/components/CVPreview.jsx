// components/CVPreview.jsx
import React, { useRef, useState } from 'react'; // Import useState for loading state
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import './CVPreview.css'; // Optional: Add custom CSS file for preview styling

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
  const [isDownloading, setIsDownloading] = useState(false); // State to track download status

  const handleDownload = async () => {
    if (!cvRef.current) return;

    setIsDownloading(true); // Set loading state

    // Use setTimeout with 0 delay to allow the UI to update and prevent the unresponsive script alert
    setTimeout(async () => {
      const element = cvRef.current;

      try {
        // Capture the HTML element as a canvas image
        const canvas = await html2canvas(element, {
          scale: 2, // Increase scale for better resolution in PDF
          logging: false, // Disable logs
          useCORS: true, // Important if loading images from other origins
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4'); // 'p' portrait, 'pt' points (standard unit), 'a4' size

        // Calculate dimensions to fit the image within the PDF page width while maintaining aspect ratio
        const pdfWidth = 595; // A4 width in points (approx)
        const pageHeight = 842; // A4 height in points (approx)
        const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Calculated height based on scaling to PDF width

        let heightLeft = imgHeight;
        let position = 0; // Y position on the PDF page

        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight; // Reduce the remaining height by one page

        // Add subsequent pages if content is longer than one page
        while (heightLeft > 0) {
          position = heightLeft - imgHeight; // Calculate the new Y position (negative, moving the image up)
          pdf.addPage(); // Add a new blank page
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight); // Add the remaining part of the image
          heightLeft -= pageHeight; // Reduce the remaining height by another page
        }

        // Generate filename
        const filename = `${personal.firstName || 'cv'}_${
          personal.lastName || 'preview'
        }.pdf`;

        pdf.save(filename);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please check the console for details.');
      } finally {
        setIsDownloading(false); // Reset loading state
      }
    }, 0); // The magic number 0 lets the browser render before starting the heavy task
  };

  // Helper function to render list items from multiline text
  // Splits by newline, trims whitespace, filters out empty lines, and maps to <li>
  const renderListItems = (text) => {
    if (!text) return null;
    return text
      .split('\n')
      .map((line, idx) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, idx) => <li key={idx}>{line}</li>);
  };

  return (
    <div className="card p-4">
      {/* Wrap the content to be captured in the ref div */}
      {/* Added padding here to ensure content isn't right at the edge in PDF */}
      {/* You might need to adjust this padding based on your desired PDF margins */}
      <div ref={cvRef} style={{ padding: '30px' }}>
        {' '}
        {/* Increased padding */}
        {/* Header */}
        {/* Check if basic personal info exists before rendering header */}
        {(personal.firstName ||
          personal.lastName ||
          personal.title ||
          personal.image ||
          personal.phone ||
          personal.email ||
          personal.website ||
          personal.city ||
          personal.country) && (
          <div className="d-flex align-items-center gap-4 mb-4">
            {personal.image && (
              <img
                src={personal.image}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }} // Added flexShrink to prevent shrinking
              />
            )}
            <div className="flex-grow-1">
              {/* Render name if at least one part exists */}
              {(personal.firstName || personal.lastName) && (
                <h2 className="fw-bold mb-0">
                  {personal.firstName} {personal.lastName}
                </h2>
              )}
              {personal.title && (
                <div className="text-muted small">{personal.title}</div>
              )}
            </div>
            <div className="text-end small" style={{ flexShrink: 0 }}>
              {' '}
              {/* Added flexShrink to prevent shrinking contact info */}
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
                  <FaMapMarkerAlt className="me-2" />
                  {/* Added conditional rendering for comma */}
                  {personal.city}
                  {personal.city && personal.country ? ', ' : ''}
                  {personal.country}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Summary */}
        {summary && summary.trim() && (
          // Check if summary is not just whitespace
          <div className="mt-4">
            <h5 className="mb-2">Summary</h5>
            {/* Using <p> for summary, added pre-wrap to respect line breaks from textarea */}
            {/* Added mb-0 for tighter spacing */}
            <p
              className="text-muted small mb-0"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {summary}
            </p>
          </div>
        )}
        {/* Experience */}
        {experiences.length > 0 && (
          <>
            {/* Add hr before section, check if previous section was summary or header */}
            {(summary && summary.trim()) ||
            personal.firstName ||
            personal.lastName ||
            personal.title ||
            personal.image ||
            personal.phone ||
            personal.email ||
            personal.website ||
            personal.city ||
            personal.country ? (
              <hr className="my-4" />
            ) : null}
            <h5 className="mb-3">Experience</h5>
            {experiences.map(
              (exp, i) =>
                // Check if title or company exists before rendering experience block
                exp.title || exp.company ? (
                  <div key={i} className="mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      {' '}
                      {/* align-items-start for date positioning */}
                      <div>
                        {exp.title && (
                          <div className="fw-semibold">{exp.title}</div>
                        )}
                        {exp.company && (
                          <div className="text-muted small">{exp.company}</div>
                        )}
                      </div>
                      <div className="text-secondary small text-nowrap ms-3">
                        {' '}
                        {/* Added ms-3 for separation */}
                        {/* Date formatting logic */}
                        {exp.startMonth && exp.startYear
                          ? `${exp.startMonth} ${exp.startYear}`
                          : ''}
                        {exp.startMonth &&
                        exp.startYear &&
                        (exp.present || (exp.endMonth && exp.endYear))
                          ? ' - '
                          : ''}{' '}
                        {/* Add dash only if start date and end indicator exist */}
                        {exp.present
                          ? 'Present'
                          : exp.endMonth && exp.endYear
                          ? `${exp.endMonth} ${exp.endYear}`
                          : ''}
                      </div>
                    </div>
                    {/* Use the helper function for accomplishments */}
                    {exp.accomplishments && exp.accomplishments.trim() && (
                      <ul className="small mb-0 mt-1">
                        {renderListItems(exp.accomplishments)}
                      </ul>
                    )}
                  </div>
                ) : null // Don't render if no title or company
            )}
          </>
        )}
        {/* Education */}
        {educations.length > 0 && (
          <>
            {/* Add hr before section */}
            <hr className="my-4" />
            <h5 className="mt-4 mb-3">Education</h5>
            {educations.map(
              (edu, i) =>
                // Check if degree or institution exists before rendering education block
                edu.degree || edu.institution ? (
                  <div key={i} className="mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      {' '}
                      {/* align-items-start for date positioning */}
                      <div>
                        {edu.degree && (
                          <div className="fw-semibold">{edu.degree}</div>
                        )}
                        {edu.institution && (
                          <div className="text-muted small">
                            {edu.institution}
                          </div>
                        )}
                      </div>
                      <div className="text-secondary small text-nowrap ms-3">
                        {' '}
                        {/* Added ms-3 for separation */}
                        {/* Date formatting logic */}
                        {edu.startMonth && edu.startYear
                          ? `${edu.startMonth} ${edu.startYear}`
                          : ''}
                        {edu.startMonth &&
                        edu.startYear &&
                        (edu.present || (edu.endMonth && edu.endYear))
                          ? ' - '
                          : ''}{' '}
                        {/* Add dash only if start date and end indicator exist */}
                        {edu.present
                          ? 'Present'
                          : edu.endMonth && edu.endYear
                          ? `${edu.endMonth} ${edu.endYear}`
                          : ''}
                      </div>
                    </div>

                    {edu.achievements && edu.achievements.trim() && (
                      <ul className="small mb-0 mt-1">
                        {renderListItems(edu.achievements)}
                      </ul>
                    )}
                  </div>
                ) : null // Don't render if no degree or institution
            )}
          </>
        )}
        {/* Skills */}
        {skills.length > 0 && skills.some((s) => s.name && s.name.trim()) && (
          <>
            {/* Add hr before section */}
            <hr className="my-4" />
            <h5 className="mt-4 mb-3">Skills</h5>
            <ul className="small mb-0">
              {' '}
              {/* mb-0 */}
              {/* Filter out skills with empty names */}
              {skills
                .filter((s) => s.name && s.name.trim())
                .map((s, i) => (
                  <li key={i}>
                    {s.name} {s.level ? `- ${s.level}` : ''}
                  </li>
                ))}
            </ul>
          </>
        )}
        {/* Languages */}
        {/* This section's rendering logic is correct; it should appear if 'languages' prop is a non-empty array */}
        {languages.length > 0 &&
          languages.some((l) => l.name && l.name.trim()) && (
            <>
              {/* Add hr before section */}
              <hr className="my-4" />
              <h5 className="mt-4 mb-3">Languages</h5>
              <ul className="small mb-0">
                {' '}
                {/* mb-0 */}
                {/* Filter out languages with empty names */}
                {languages
                  .filter((l) => l.name && l.name.trim())
                  .map((l, i) => (
                    <li key={i}>
                      {l.name} {l.level ? `- ${l.level}` : ''}
                    </li>
                  ))}
              </ul>
            </>
          )}
        {/* Certificates */}
        {certificates.length > 0 &&
          certificates.some((c) => c.name && c.name.trim()) && ( // Check if there is at least one certificate with a non-empty name
            <>
              {/* Add hr before section */}
              <hr className="my-4" />
              <h5 className="mt-4 mb-3">Certificates</h5>
              {/* Filter out certificates with empty names */}
              {certificates
                .filter((c) => c.name && c.name.trim())
                .map((c, i) => (
                  <div key={i} className="mb-3">
                    {c.name && <div className="fw-semibold">{c.name}</div>}
                    {c.organization && (
                      <div className="text-muted small">{c.organization}</div>
                    )}
                    {/* Render date/present only if some date info exists */}
                    {(c.startMonth ||
                      c.startYear ||
                      c.endMonth ||
                      c.endYear ||
                      c.present) && (
                      <div className="text-secondary small text-nowrap">
                        {c.startMonth && c.startYear
                          ? `${c.startMonth} ${c.startYear}`
                          : ''}
                        {c.startMonth &&
                        c.startYear &&
                        (c.present || (c.endMonth && c.endYear))
                          ? ' - '
                          : ''}{' '}
                        {/* Add dash only if start date and end indicator exist */}
                        {c.present
                          ? 'Present'
                          : c.endMonth && c.endYear
                          ? `${c.endMonth} ${c.endYear}`
                          : ''}
                      </div>
                    )}
                    {c.description && c.description.trim() && (
                      <div className="small mt-1">{c.description}</div>
                    )}
                  </div>
                ))}
            </>
          )}
      </div>

      {/* Download Button - outside the ref div so it's not included in the PDF */}
      <div className="mt-4 text-center">
        <button
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isDownloading} // Disable button while downloading
        >
          {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
        {isDownloading && (
          <div className="small text-muted mt-2">
            Generating PDF, this may take a moment...
          </div>
        )}
        <div className="small text-warning mt-2">
          Note: This PDF is generated as an image and may not be fully
          compatible with all ATS systems.
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
