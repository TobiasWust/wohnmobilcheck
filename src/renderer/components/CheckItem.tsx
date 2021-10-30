import { Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Rating from './Rating';

interface IValue {
  id: string;
  value: boolean | number | null;
  note: string;
}

interface ICheckItem {
  id: string;
  label: string;
  type: 'checkbox' | 'rating';
  onChange: (value: IValue) => void;
}

const CheckItem = ({ id, label, type, onChange: handleChange }: ICheckItem) => {
  const [value, setValue] = useState<IValue>({
    id,
    value: type === 'checkbox' ? false : 0,
    note: '',
  });

  useEffect(() => {
    handleChange(value);
  }, [value, handleChange]);

  return (
    <div style={{ display: 'grid' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{label}</span>
        {type === 'checkbox' && (
          <Checkbox
            checked={value.value as boolean}
            inputProps={{ 'aria-label': label }}
            defaultChecked
            sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
            onChange={(_e, v) => setValue({ ...value, value: v })}
          />
        )}
        {type === 'rating' && (
          <Rating
            value={value.value as number}
            onChange={(_e, v) => setValue({ ...value, value: v })}
          />
        )}
      </div>
      <TextField
        size="small"
        // onChange={(e) => handleInput(e, useCheck)}
        label="Anmerkung"
        onChange={(e) => setValue({ ...value, note: e.target.value })}
      />
    </div>
  );
};

export default CheckItem;
