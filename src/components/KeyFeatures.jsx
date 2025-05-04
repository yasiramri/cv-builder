import React from 'react';
import { FaMagic, FaSearch, FaDownload } from 'react-icons/fa';

const features = [
  {
    icon: <FaMagic size={32} className="text-primary mb-3" />,
    title: 'AI-Powered Templates',
    description:
      'Choose from dozens of professional templates optimized for ATS',
  },
  {
    icon: <FaSearch size={32} className="text-primary mb-3" />,
    title: 'Real-time Analysis',
    description: 'Get instant feedback on your CV content and formatting',
  },
  {
    icon: <FaDownload size={32} className="text-primary mb-3" />,
    title: 'Easy Export',
    description: 'Download your CV in multiple formats (PDF, DOCX, TXT)',
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-5 bg-light text-center">
      <h2 className="mb-4 fw-bold">Key Features</h2>
      <div className="container">
        <div className="row justify-content-center g-4">
          {features.map((feature, index) => (
            <div className="col-12 col-md-4" key={index}>
              <div className="p-4 bg-white rounded shadow-sm h-100">
                {feature.icon}
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
