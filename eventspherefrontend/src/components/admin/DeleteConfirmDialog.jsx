import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AlertTriangle } from 'lucide-react';

export const DeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message,
  itemName,
  isLoading,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'error.main',
          color: 'white',
        }}
      >
        <AlertTriangle size={20} />
      </Box>
      {title}
    </DialogTitle>
    <DialogContent>
      <Typography variant="body1">
        {message || (
          <>
            Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
          </>
        )}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={onConfirm}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </DialogActions>
  </Dialog>
);
