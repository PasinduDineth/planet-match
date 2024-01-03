import React from 'react';
import Cell from './cell';

interface ColumnProps {
  columnIndex: number;
  values: (number | null)[];
}

const Column: React.FC<ColumnProps> = ({ values }) => {
  return (
    <div className="flex flex-col">
      {values.map((value, rowIndex) => (
        <Cell key={rowIndex} value={value} />
      ))}
    </div>
  );
};

export default Column;
