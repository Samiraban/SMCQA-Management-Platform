function FacebookIcon({ size = 30 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="social-icon facebook-icon"
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M13.45 20v-7h2.35l.35-2.75h-2.7V8.5c0-.8.22-1.35 1.38-1.35h1.47V4.7c-.26-.04-1.16-.1-2.2-.1-2.18 0-3.67 1.33-3.67 3.78v1.87H8v2.75h2.43v7h3.02Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function InstagramIcon({ size = 30 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="social-icon instagram-icon"
    >
      <defs>
        <linearGradient
          id="instagramGradient"
          x1="2"
          y1="22"
          x2="22"
          y2="2"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="url(#instagramGradient)"
      />

      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="3.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="1.15"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function LinkedinIcon({ size = 30 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="social-icon linkedin-icon"
    >
      <rect
        width="24"
        height="24"
        rx="3"
        fill="#0A66C2"
      />

      <path
        d="M6.1 9.3H3.2V20h2.9V9.3ZM4.65 3.8a1.72 1.72 0 1 0 0 3.44 1.72 1.72 0 0 0 0-3.44ZM20.8 13.87c0-3.23-1.72-4.77-4.02-4.77-1.86 0-2.68 1.03-3.14 1.76V9.3h-2.9V20h2.9v-5.3c0-1.4.27-2.75 1.99-2.75 1.7 0 1.72 1.59 1.72 2.85V20h2.9v-6.13h.55Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
};