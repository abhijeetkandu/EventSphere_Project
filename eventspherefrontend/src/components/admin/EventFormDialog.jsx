import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { ImageUpload } from './ImageUpload';
import { eventService } from '../../services/eventService';
import { validateEvent } from '../../utils/validation';
import { getErrorMessage } from '../../utils/errorHandler';
import { EVENT_CATEGORIES } from '../../utils/constants';

const emptyForm = {
  title: '',
  description: '',
  category: 'Music',
  location: '',
  date: '',
  startTime: '',
  endTime: '',
  price: '',
  capacity: '',
  featured: false,
  status: 'ACTIVE',
};

const categories = EVENT_CATEGORIES.filter((c) => c.id !== 'all');

export const EventFormDialog = ({ open, onClose, event, onSaved }) => {
  const isEdit = Boolean(event?.id);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (event) {
        setForm({
          title: event.title || '',
          description: event.description || '',
          category: event.category || 'Music',
          location: event.location || '',
          date: event.date ? event.date.split('T')[0] : '',
          startTime: event.startTime || '',
          endTime: event.endTime || '',
          price: event.price ?? '',
          capacity: event.capacity ?? '',
          featured: Boolean(event.featured),
          status: event.status || 'ACTIVE',
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
      setImageFile(null);
      setImageError('');
    }
  }, [open, event]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const formErrors = validateEvent(form);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      let payload = { ...form };
      if (imageFile) {
        payload.imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      let saved;
      if (isEdit) {
        saved = await eventService.updateEvent(event.id, payload);
        toast.success('Event updated successfully');
      } else {
        saved = await eventService.createEvent(payload);
        toast.success('Event created successfully');
      }
      onSaved?.(saved);
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error, `Failed to ${isEdit ? 'update' : 'create'} event`));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEdit ? 'Edit Event' : 'Create New Event'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ImageUpload
              preview={event?.bannerImage}
              value={imageFile}
              onChange={(file, err) => { setImageFile(file); setImageError(err || ''); }}
              onClear={() => setImageFile(null)}
              error={imageError}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Title"
              value={form.title}
              onChange={handleChange('title')}
              error={Boolean(errors.title)}
              helperText={errors.title}
              placeholder="Summer Music Festival 2026"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={form.description}
              onChange={handleChange('description')}
              error={Boolean(errors.description)}
              helperText={errors.description}
              multiline
              rows={4}
              placeholder="Describe your event..."
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={form.category}
              onChange={handleChange('category')}
              error={Boolean(errors.category)}
              helperText={errors.category}
            >
              {categories.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={form.location}
              onChange={handleChange('location')}
              error={Boolean(errors.location)}
              helperText={errors.location}
              placeholder="New York, NY"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Event Date"
              value={form.date}
              onChange={handleChange('date')}
              error={Boolean(errors.date)}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              type="time"
              label="Start Time"
              value={form.startTime}
              onChange={handleChange('startTime')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              type="time"
              label="End Time"
              value={form.endTime}
              onChange={handleChange('endTime')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Ticket Price ($)"
              value={form.price}
              onChange={handleChange('price')}
              error={Boolean(errors.price)}
              helperText={errors.price}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Capacity"
              value={form.capacity}
              onChange={handleChange('capacity')}
              error={Boolean(errors.capacity)}
              helperText={errors.capacity}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Status"
              value={form.status}
              onChange={handleChange('status')}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={form.featured} onChange={handleChange('featured')} />}
              label="Feature this event on the homepage"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
