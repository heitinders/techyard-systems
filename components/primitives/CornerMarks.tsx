type Props = { color?: string; length?: number; inset?: number }

// Four L-shaped marks in the corners of a container. Used on dark editorial
// bands (featured case study, stat band) for a registered, in-print feel.
// The parent must be `position: relative`.
export function CornerMarks({
  color = 'rgba(241,237,228,0.28)',
  length = 22,
  inset = 22,
}: Props) {
  const style = { stroke: color }
  const path = `M 0 0 L ${length} 0 M 0 0 L 0 ${length}`
  return (
    <>
      <svg
        aria-hidden="true"
        width={length}
        height={length}
        className="absolute"
        style={{ top: inset, left: inset }}
      >
        <path d={path} strokeWidth="1" fill="none" style={style} />
      </svg>
      <svg
        aria-hidden="true"
        width={length}
        height={length}
        className="absolute"
        style={{ top: inset, right: inset, transform: 'scaleX(-1)' }}
      >
        <path d={path} strokeWidth="1" fill="none" style={style} />
      </svg>
      <svg
        aria-hidden="true"
        width={length}
        height={length}
        className="absolute"
        style={{ bottom: inset, left: inset, transform: 'scaleY(-1)' }}
      >
        <path d={path} strokeWidth="1" fill="none" style={style} />
      </svg>
      <svg
        aria-hidden="true"
        width={length}
        height={length}
        className="absolute"
        style={{ bottom: inset, right: inset, transform: 'scale(-1,-1)' }}
      >
        <path d={path} strokeWidth="1" fill="none" style={style} />
      </svg>
    </>
  )
}
