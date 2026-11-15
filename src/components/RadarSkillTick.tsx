import React from 'react';

export interface RadarTickProps {
  payload?: { value?: string };
  x?: number | string;
  y?: number | string;
  textAnchor?: string;
  fontSize?: number;
  fill?: string;
  className?: string;
  maxLineLen?: number;
}

/**
 * Custom tick for Recharts PolarAngleAxis that wraps long skill names
 * across multiple lines instead of truncating or clipping at the SVG edge.
 */
export const RadarSkillTick: React.FC<RadarTickProps> = ({
  payload,
  x = 0,
  y = 0,
  textAnchor = 'middle',
  fontSize = 11,
  fill = '#475569',
  className,
  maxLineLen = 16,
}) => {
  const value = (payload?.value ?? '').replace(/\s+/g, ' ').trim();
  const words = value.split(' ').filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const w of words) {
    if (current && (current + ' ' + w).length > maxLineLen) {
      lines.push(current);
      current = w;
    } else {
      current = current ? `${current} ${w}` : w;
    }
  }
  if (current) lines.push(current);

  // Cap at 3 lines so extreme names stay compact
  const displayLines =
    lines.length > 3 ? [lines[0], lines[1], `${lines.slice(2).join(' ').slice(0, maxLineLen - 1)}…`] : lines;

  const nx = Number(x) || 0;
  const ny = Number(y) || 0;
  const anchor = (textAnchor as 'start' | 'middle' | 'end' | 'inherit') || 'middle';
  const lineHeight = fontSize + 2;
  const initialDy = displayLines.length > 1 ? -((displayLines.length - 1) * lineHeight) / 2 : 0;

  return (
    <text
      x={nx}
      y={ny}
      textAnchor={anchor}
      fill={className ? undefined : fill}
      className={className}
      fontSize={fontSize}
      fontWeight={600}
    >
      {displayLines.map((line, i) => (
        <tspan key={i} x={nx} dy={i === 0 ? initialDy : lineHeight} xmlSpace="preserve">
          {i < displayLines.length - 1 ? `${line} ` : line}
        </tspan>
      ))}
    </text>
  );
};

