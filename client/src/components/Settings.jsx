import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
  });

  const handleToggle = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        {/* Theme Setting */}
        <div>
          <label className="block font-medium">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleToggle}
            className="p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Notifications Toggle */}
        <div>
          <label className="block font-medium">Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleToggle}
            className="ml-2"
          />
          <span className="ml-2">
            {settings.notifications ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
