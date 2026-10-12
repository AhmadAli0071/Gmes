import React from 'react';
import type { RevealStep } from '../types';

interface NoteStepProps {
  step: Extract<RevealStep, { type: 'note' }>;
  sender: string;
}

/** step: { type: 'note', title?, text, signature? } */
const NoteStep: React.FC<NoteStepProps> = ({ step, sender }) => {
  const words = (step.text || '').split(' ');
  return (
    <>
      <h2>{step.title || `A note from ${sender}`}</h2>
      <div className="env">
        <div className="letter">
          <p>
            {words.map((w, k) => (
              <span key={`${k}-${w}`} className="w" style={{ animationDelay: `${1.6 + k * 0.09}s` }}>
                {w}&nbsp;
              </span>
            ))}
          </p>
          {step.signature && <span className="sig">{step.signature}</span>}
        </div>
        <div className="flap" />
        <div className="pocket" />
      </div>
    </>
  );
};

export default NoteStep;
