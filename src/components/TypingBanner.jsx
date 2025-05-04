import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingBanner = () => {
  return (
    <div className="text-center mt-5 banner-custom">
      <TypeAnimation
        sequence={[
          'Create Professional CV & Get Instant Feedback',
          2000,
          '',
          1000,
        ]}
        wrapper="h2"
        cursor={true}
        repeat={Infinity}
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#000',
        }}
      />

      <p className="mt-3 text-muted" style={{ fontSize: '1rem' }}>
        Build your perfect CV and get AI-powered suggestions to improve it
      </p>
    </div>
  );
};

export default TypingBanner;
