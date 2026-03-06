/**
 * EGG EXPRESSIONS - MINIMAL
 *
 * Very subtle expressions for the hot spring egg.
 * Japanese onsen aesthetic - calm and minimal.
 * Just tiny eyes and slight changes.
 */

// Idle - relaxed tiny eyes
export const IdleExpression = ({ tokens }) => (
  <g>
    {/* Tiny dot eyes */}
    <circle cx="43" cy="48" r="2.5" fill={tokens.egg?.eyes || '#3A3A3A'} />
    <circle cx="57" cy="48" r="2.5" fill={tokens.egg?.eyes || '#3A3A3A'} />
  </g>
);

// Nervous - slightly wider eyes
export const NervousExpression = ({ tokens }) => (
  <g>
    {/* Slightly larger eyes */}
    <circle cx="43" cy="48" r="3" fill={tokens.egg?.eyes || '#3A3A3A'} />
    <circle cx="57" cy="48" r="3" fill={tokens.egg?.eyes || '#3A3A3A'} />
  </g>
);

// Excited - eyes with tiny sparkle
export const ExcitedExpression = ({ tokens }) => (
  <g>
    {/* Eyes */}
    <circle cx="43" cy="48" r="3" fill={tokens.egg?.eyes || '#3A3A3A'} />
    <circle cx="57" cy="48" r="3" fill={tokens.egg?.eyes || '#3A3A3A'} />
    {/* Tiny sparkle highlights */}
    <circle cx="44" cy="47" r="1" fill="rgba(255,255,255,0.8)" />
    <circle cx="58" cy="47" r="1" fill="rgba(255,255,255,0.8)" />
  </g>
);

// Relaxed - closed happy eyes (bathing)
export const BoilingExpression = ({ tokens }) => (
  <g>
    {/* Closed relaxed eyes - small arcs */}
    <path
      d="M 40 48 Q 43 46, 46 48"
      fill="none"
      stroke={tokens.egg?.eyes || '#3A3A3A'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M 54 48 Q 57 46, 60 48"
      fill="none"
      stroke={tokens.egg?.eyes || '#3A3A3A'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Subtle rosy cheeks */}
    <circle cx="36" cy="52" r="4" fill={tokens.egg?.cheek || 'rgba(255, 180, 180, 0.4)'} />
    <circle cx="64" cy="52" r="4" fill={tokens.egg?.cheek || 'rgba(255, 180, 180, 0.4)'} />
  </g>
);

// Happy - same as relaxed but with cheeks
export const HappyExpression = ({ tokens }) => (
  <g>
    {/* Happy closed eyes - arcs */}
    <path
      d="M 40 48 Q 43 44, 46 48"
      fill="none"
      stroke={tokens.egg?.eyes || '#3A3A3A'}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M 54 48 Q 57 44, 60 48"
      fill="none"
      stroke={tokens.egg?.eyes || '#3A3A3A'}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Rosy cheeks */}
    <circle cx="36" cy="52" r="5" fill={tokens.egg?.cheek || 'rgba(255, 180, 180, 0.4)'} />
    <circle cx="64" cy="52" r="5" fill={tokens.egg?.cheek || 'rgba(255, 180, 180, 0.4)'} />
  </g>
);

// Expression map
export const expressions = {
  idle: IdleExpression,
  nervous: NervousExpression,
  excited: ExcitedExpression,
  boiling: BoilingExpression,
  relaxed: BoilingExpression,
  happy: HappyExpression,
};

export default expressions;
