const CATEGORY_PLACEHOLDERS = {
  Music: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  Technology: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  Business: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  Arts: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  Food: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  Education: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
};

export const DEFAULT_EVENT_PLACEHOLDER =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80';

export const getEventPlaceholder = (category) =>
  CATEGORY_PLACEHOLDERS[category] || DEFAULT_EVENT_PLACEHOLDER;
