import * as React from 'react';
import { useRecordContext, FieldProps } from 'react-admin';
import { Typography } from '@mui/material';

interface TruncatedFieldProps extends FieldProps {
  maxChars?: string | number;
}

const TruncatedField: React.FC<TruncatedFieldProps> = ({ source, maxChars = 20, ...props}) => {
  const record = useRecordContext();
  const value = record ? record[source as keyof typeof record] : '';
  const maxCharsAsNumber = typeof maxChars === 'string' ? parseInt(maxChars, 10) : maxChars;
  const truncatedValue = value.length > maxCharsAsNumber ? value.substring(0, maxCharsAsNumber) + '...' : value;

  return (
    <Typography component="span" {...props}>
      {truncatedValue}
    </Typography>
  );
}

export default TruncatedField;