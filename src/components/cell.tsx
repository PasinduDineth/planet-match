import React, { FC } from 'react';

interface CellProps {
  value: number | null;
}

const Cell: FC<CellProps> = ({ value }) => {
  
  // Adding background colors alongside with images as a Fail-safe. Incase Image loding get delayed.
  const getBackgroundColor = () => {
    if (value === 1) {
      return 'bg-[#653054]';
    } else if (value === 2) {
      return 'bg-yellow-400';
    } else {
      return 'bg-white';
    }
  };

  const getDynamicStyles = () => {
    const sizeClass = 'w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16';
    return `${sizeClass} ${getBackgroundColor()} rounded-full m-1`;
  };
  
  return (
    <div className={getDynamicStyles()}>
    {value !== null && (
      <div
        style={{
          backgroundImage: `url(${value === 1 ? '../../src/assets/redDisk.png' : '../../src/assets/yellowDisk.png'})`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
        }}
      ></div>
    )}
  </div>
  );
};

export default Cell;
