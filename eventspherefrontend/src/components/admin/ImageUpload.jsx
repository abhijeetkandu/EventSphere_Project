import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024;

export const ImageUpload = ({ value, preview, onChange, onClear, error }) => {
  const inputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const displayPreview = localPreview || preview;

  const handleFile = (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onChange?.(null, 'Only JPEG, PNG, WebP, and GIF images are allowed');
      return;
    }

    if (file.size > MAX_SIZE) {
      onChange?.(null, 'Image must be smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setLocalPreview(e.target.result);
    reader.readAsDataURL(file);
    onChange?.(file, null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleClear = () => {
    setLocalPreview(null);
    onClear?.();
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Box>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {displayPreview ? (
        <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
          <Box
            component="img"
            src={displayPreview}
            alt="Banner preview"
            sx={{ width: '100%', height: 180, objectFit: 'cover' }}
          />
          <Button
            size="small"
            onClick={handleClear}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 0,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
            }}
          >
            <X size={16} />
          </Button>
        </Box>
      ) : (
        <Box
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderColor: error ? 'error.main' : dragOver ? 'primary.main' : 'divider',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            bgcolor: dragOver ? 'primary.main' + '08' : 'action.hover',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main' + '08' },
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              mx: 'auto',
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              color: 'primary.main',
            }}
          >
            {value ? <ImageIcon size={24} /> : <Upload size={24} />}
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Drop banner image here or click to upload
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG, WebP up to 5MB
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
