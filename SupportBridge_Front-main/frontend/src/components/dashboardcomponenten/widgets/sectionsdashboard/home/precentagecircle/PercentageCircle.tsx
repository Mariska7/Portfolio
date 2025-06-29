import React, { useEffect, useState } from 'react';
import './PercentageCircle.css';

interface PercentageCircleProps {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  circleColor?: string;
  textColor?: string;
  useGradient?: boolean;
}

const PercentageCircle: React.FC<PercentageCircleProps> = ({
  percentage,
  radius = 50,
  strokeWidth = 10,
  circleColor,
  textColor,
  useGradient = false,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Trigger animation on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercentage(Math.max(0, Math.min(percentage, 100)));
    }, 100); // short delay to trigger transition

    return () => clearTimeout(timeout);
  }, [percentage]);

  const safePercentage = Math.max(0, Math.min(animatedPercentage, 100));
  const center = radius;
  const circleRadius = radius - strokeWidth / 2;

  if (circleRadius <= 0) {
    console.warn("strokeWidth is too large for the given radius.");
    return null;
  }

  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (safePercentage / 100) * circumference;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const svgSize = radius * 2;

  return (
    <div className="percentage-circle-container">
      <svg
        className="percentage-circle-svg"
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
      >
        {useGradient && (
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(109, 30, 247, 1)" />
              <stop offset="58%" stopColor="rgba(142, 69, 173, 1)" />
              <stop offset="100%" stopColor="rgba(161, 43, 122, 1)" />
            </linearGradient>
          </defs>
        )}

        {/* Background Circle */}
        <circle
          className="percentage-circle-bg"
          stroke={circleColor || '#eee'}
          fill="none"
          cx={center}
          cy={center}
          r={circleRadius}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <circle
          className="percentage-circle-progress"
          stroke={useGradient ? `url(#${gradientId})` : '#6d1ef7'}
          fill="none"
          cx={center}
          cy={center}
          r={circleRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

        {/* Text */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="percentage-circle-text"
          fill={textColor || '#000'}
        >
          {`${safePercentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default PercentageCircle;
