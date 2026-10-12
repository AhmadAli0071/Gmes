import React, { useState } from 'react';
import { floatEmoji } from '../fx';
import type { Reaction } from '../types';

const REACTIONS: Reaction[] = [
  { emoji: '\u2764\uFE0F', label: 'Love' },
  { emoji: '\u{1F602}', label: 'Laugh' },
  { emoji: '\u{1F972}', label: 'Cry' },
  { emoji: '\u{1F389}', label: 'Celebrate' },
];

interface FinalStepProps {
  sender: string;
  onReact?: (reaction: Reaction) => void;
}

/** Always the last card. Calls onReact({ emoji, label }). */
const FinalStep: React.FC<FinalStepProps> = ({ sender, onReact }) => {
  const [sent, setSent] = useState(false);
  return (
    <>
      <h2>That is everything.</h2>
      <p>How did it feel? Tell {sender} with one tap.</p>
      <div className="react">
        {REACTIONS.map((r, k) => (
          <button
            type="button"
            key={r.label}
            style={{ '--k': k } as React.CSSProperties}
            aria-label={r.label}
            onClick={(e) => {
              floatEmoji(e.currentTarget, r.emoji);
              setSent(true);
              onReact?.(r);
            }}
          >
            {r.emoji}
          </button>
        ))}
      </div>
      <p className="meta" role="status">
        {sent ? `Sent to ${sender}. Thank you for opening.` : ''}
      </p>
    </>
  );
};

export default FinalStep;
