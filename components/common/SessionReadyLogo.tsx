interface SessionReadyLogoProps {
  size?: number;
  className?: string;
}

const SessionReadyLogo = ({ size = 28, className = "" }: SessionReadyLogoProps) => {
  return (
    <img 
      src="/session-ready-logo.svg"
      alt="Session Ready Logo"
      width={size} 
      height={size}
      className={className}
      loading="lazy"
    />
  );
};

export default SessionReadyLogo; 