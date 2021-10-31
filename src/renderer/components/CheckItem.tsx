import { Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Rating from './Rating';

export interface IValue {
  id: string;
  value: boolean | number | null;
  note: string;
}

interface ICheckItem {
  id: string;
  label: string;
  type: 'checkbox' | 'rating';
  onChange: (value: IValue) => void;
  value: IValue;
}

const CheckItem = ({
  id,
  label,
  type,
  onChange: handleChange,
  value: defaultValue,
}: ICheckItem) => {
  const [value, setValue] = useState<IValue>(
    defaultValue || {
      id,
      value: type === 'checkbox' ? false : 0,
      note: '',
    }
  );

  useEffect(() => {
    handleChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
        value={value.note}
        onChange={(e) => setValue({ ...value, note: e.target.value })}
      />
    </div>
  );
};

export default CheckItem;
