import React from 'react';

type LabelProps = {
  name: string;
  description: string;
  hello?: string;
};

export const Label = ({ name, description }: LabelProps) => {
  return (
    <label>
      {name}: {description}
    </label>
  );
};
