import * as React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

interface TextWithLabelFieldProps {
  source: string;
  label: string;
}

const TextWithLabelField: React.FC<TextWithLabelFieldProps> = ({ source, label, ...props}) => {
  const record = useRecordContext();
  const value = record ? record[source as keyof typeof record] : '';

  return (
    <>
      {label && <Typography component="label">{label}</Typography>}
      <Typography component="span" {...props}>
        {value}
      </Typography>
    </>
  )
}

export default TextWithLabelField;