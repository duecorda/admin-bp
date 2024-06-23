import React, { useState } from 'react';
import { useUpdate, useNotify, useRecordContext } from 'react-admin';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

const choices = [
  { id: 'ACTIVE', name: '활성 상태' },
  { id: 'WITHDRAWAL_SUSPENDED', name: '출금 정지' },
  { id: 'ACCOUNT_SUSPENDED', name: '계정 일시 정지' },
  { id: 'ACCOUNT_DELETED', name: '계정 삭제' },
];

interface UserStatusDropdownProps {
  userId: number;
  source: string;
}

const UserStatusDropdown: React.FC<UserStatusDropdownProps> = ({ userId, source }) => {
  const record = useRecordContext();
  const value = record ? record[source as keyof typeof record] : '';

  const [status, setStatus] = useState<string | null>(null);
  const [update, { error }] = useUpdate();
  const notify = useNotify();

  const handleChange = (event: SelectChangeEvent<string>) => {
    update('users', { id: userId, data: { status: event.target.value }, previousData: { status } });
    if (error) { notify('update_failed'); }
    setStatus(event.target.value);
  };

  return (
    <FormControl>
      <Select
        value={value}
        onChange={handleChange}
      >
        {choices.map((choice) => (
          <MenuItem key={choice.id} value={choice.id}>
            {choice.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserStatusDropdown;