import React from 'react';

export const ErrorText: React.FC<{ error: string }> = ({ error }) => {
  return (
    <p>
      <span style={{ color: 'red' }}>Ошибка:</span> {error}
    </p>
  );
};
