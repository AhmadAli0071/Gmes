import React, { useLayoutEffect, useRef, useState } from 'react';
import { GiftData } from '../../types';
import { GiftBoxReveal } from '../giftbox/GiftBoxReveal';
import { buildRevealGift } from '../giftbox/buildRevealGift';

interface GiftBoxInteractiveProps {
  gift: Partial<GiftData>;
  isOpened?: boolean;
  onOpen?: () => void;
  interactive?: boolean;
  mode?: 'preview' | 'full';
  /** Height of the preview frame - the reveal scales itself down to fit it. */
  heightClass?: string;
  /** Hide the reveal's own heading when the host already renders an H1. */
  showHeading?: boolean;
  className?: string;
}

const MIN_SCALE = 0.45;

/**
 * The gift box stage used by the creator preview and the home hero.
 *
 * The frame has a fixed height and the reveal's content is scaled to fit it,
 * so the box never spills out of the card and the card never needs an inner
 * scrollbar.
 */
export const GiftBoxInteractive: React.FC<GiftBoxInteractiveProps> = ({
  gift,
  isOpened = false,
  onOpen,
  interactive = true,
  mode = 'preview',
  heightClass = 'h-[clamp(430px,62vh,600px)]',
  showHeading = true,
  className = '',
}) => {
  const [openedInternal, setOpenedInternal] = useState(isOpened);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setOpenedInternal(isOpened);
  }, [isOpened]);

  // Scale `.gbr-main` down whenever it would overflow the fixed frame.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return undefined;
    const main = stage.querySelector<HTMLElement>('.gbr-main');
    if (!main) return undefined;

    const fit = () => {
      main.style.transform = 'none';
      const box = main.getBoundingClientRect();
      const naturalHeight = box.height;
      const naturalWidth = Math.max(main.scrollWidth, box.width);
      const availHeight = frame.clientHeight;
      const availWidth = frame.clientWidth;
      if (!naturalHeight || !availHeight) return;

      const next = Math.min(
        1,
        (availHeight - 16) / naturalHeight,
        availWidth / naturalWidth
      );
      const scale = Math.max(MIN_SCALE, Math.min(1, next));
      main.style.transform = scale < 0.999 ? `scale(${scale})` : 'none';
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  const opened = onOpen ? isOpened : openedInternal;

  const handleOpen = () => {
    if (!interactive) return;
    if (onOpen) onOpen();
    else setOpenedInternal(true);
  };

  const revealGift = buildRevealGift(gift);

  return (
    <div
      ref={frameRef}
      className={`relative w-full overflow-hidden rounded-[1.5rem] ${
        mode === 'preview' ? heightClass : 'min-h-[460px]'
      } ${className}`}
    >
      <div ref={stageRef} className="w-full h-full">
        <GiftBoxReveal
          variant="card"
          gift={revealGift}
          opened={opened}
          onOpen={handleOpen}
          onReset={handleOpen}
          showHeading={showHeading}
        />
      </div>
    </div>
  );
};
