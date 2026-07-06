const SETTINGS_KEY = 'eventsphere_settings';

const defaultSettings = {
  emailNotifications: true,
  bookingReminders: true,
  eventUpdates: false,
  marketingEmails: false,
};

export const getSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings) => {
  const updated = { ...getSettings(), ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
};
