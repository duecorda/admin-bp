import * as React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

interface TextFieldCardProps {
  source: string;
  label: string;
}

const TextFieldCard: React.FC<TextFieldCardProps> = ({ source, label, ...props}) => {
  const record = useRecordContext();
  const value = record ? record[source as keyof typeof record] : '';

  return (
    <div className="text-field-card" {...props}>
      <div className="text-field-card-content">
        <Typography component="label">{label}</Typography>
        <Typography component="span">{value || "-"}</Typography>
      </div>
    </div>
  )
}

export default TextFieldCard;