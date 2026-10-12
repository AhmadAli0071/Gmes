import React, { useState } from 'react';
import PlayIcon from '../PlayIcon';
import type { RevealStep } from '../types';

interface VideosStepProps {
  step: Extract<RevealStep, { type: 'videos' }>;
}

/** step: { type: 'videos', title?, videos: [{ title, src?, poster? }] } */
const VideosStep: React.FC<VideosStepProps> = ({ step }) => {
  const videos = step.videos || [];
  const [cur, setCur] = useState(0);
  const [touched, setTouched] = useState(false);
  const v = videos[cur] || ({} as (typeof videos)[number]);

  return (
    <>
      <h2>{step.title || (videos.length > 1 ? 'Videos, just for you' : 'One more thing')}</h2>
      <div className={'vid' + (touched ? ' flash' : '')} key={cur}>
        {v.src ? (
          <video src={v.src} poster={v.poster} controls playsInline preload="metadata" />
        ) : (
          <button type="button" className="play" aria-label="Play video">
            <PlayIcon />
          </button>
        )}
        <span className="vt">{v.title}</span>
      </div>
      {videos.length > 1 && (
        <div className="thumbs">
          {videos.map((x, k) => (
            <button
              type="button"
              key={x.title + k}
              className={'th' + (k === cur ? ' a' : '')}
              style={
                { '--k': k, '--hue': 280 + k * 35 } as React.CSSProperties
              }
              aria-label={`Video ${k + 1}: ${x.title}`}
              aria-pressed={k === cur}
              onClick={() => {
                setTouched(true);
                setCur(k);
              }}
            >
              &#9654;
            </button>
          ))}
        </div>
      )}
      <span className="meta">{videos.length > 1 ? `${videos.length} videos. Pick one below` : ''}</span>
    </>
  );
};

export default VideosStep;
