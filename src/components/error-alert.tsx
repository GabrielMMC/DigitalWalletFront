import React from 'react';

interface ErrorAlertProps {
  children: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ children }) => {
  return (
    <span className="text-sm font-semibold text-red-400" style={{ maxWidth: 150 }}>
      {children}
    </span>
  );
};

export default ErrorAlert;