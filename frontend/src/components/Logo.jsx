function Logo({ size = 51 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer black circle */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#111111"
      />

      {/* Gold inner circle */}
      <circle
        cx="50"
        cy="50"
        r="43"
        fill="#C4932D"
      />

      {/* Inner black ring */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="#111111"
      />

      {/* Gold inner field */}
      <circle
        cx="50"
        cy="50"
        r="33"
        fill="#C4932D"
      />

      {/* Star */}
      <path
        d="
          M50 17
          L57.7 38.2
          L80.3 39
          L62.5 52.7
          L68.7 74.5
          L50 62
          L31.3 74.5
          L37.5 52.7
          L19.7 39
          L42.3 38.2
          Z
        "
        fill="#111111"
      />

      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="5"
        fill="#C4932D"
      />

      {/* Small center point */}
      <circle
        cx="50"
        cy="50"
        r="2"
        fill="#111111"
      />
    </svg>
  );
}

export default Logo;