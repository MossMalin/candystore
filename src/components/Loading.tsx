import React from 'react';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading">
      <div>Loading...</div>
      <div className="spinner" />
    </div>
  );
};

export default Loading;
