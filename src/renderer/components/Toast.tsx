import { Snackbar } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useState } from 'react';

const Toast = ({ type, message }: { type: AlertColor; message: string }) => {
  const [open, setOpen] = useState(true);
  const handleClose = (_event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
