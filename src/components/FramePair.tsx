import React from 'react';
import './FramePair.css';

interface FramePairProps {
  src: string;
  swap?: string;
  alt: string;
  width: number;
  height: number;
  /** `tile` 은 윤곽 없이 부모 칸에 맞춘다. 기본은 도감 갤러리의 흰 칸이다. */
  variant?: 'plate' | 'bare';
  /** 한 바퀴 시간(초). */
  seconds?: number;
}

/**
 * 같은 박스로 자른 두 프레임을 번갈아 보여 준다. 움직임 줄이기 설정이면 멈추고
 * 두 프레임을 나란히 둔다.
 */
export const FramePair: React.FC<FramePairProps> = ({ src, swap, alt, width, height, variant = 'plate', seconds = 2.6 }) => {
  if (!swap) {
    return (
      <span className={`frame-pair frame-pair-single frame-pair-${variant}`} style={{ aspectRatio: `${width} / ${height}` }}>
        <img alt={alt} decoding="async" height={height} loading="lazy" src={src} width={width} />
      </span>
    );
  }
  return (
    <span
      className={`frame-pair frame-pair-${variant}`}
      style={{ aspectRatio: `${width} / ${height}`, ['--frame-pair-seconds' as string]: `${seconds}s` }}
    >
      <img className="frame-pair-a" alt={alt} decoding="async" height={height} loading="lazy" src={src} width={width} />
      <img className="frame-pair-b" alt="" aria-hidden="true" decoding="async" height={height} loading="lazy" src={swap} width={width} />
    </span>
  );
};
