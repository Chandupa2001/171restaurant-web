import { useEffect, useState } from 'react';
import { HOURS } from '../content.js';

/* ---------- Open now / Closed now (Asia/Colombo) ---------- */
const pad = (n) => String(n).padStart(2, '0');
const fmt = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/** Minutes since midnight in Sri Lanka. For testing, add ?time=HH:MM to the URL. */
function colomboMinutes() {
  const test = new URLSearchParams(window.location.search).get('time');
  if (test && /^\d{1,2}:\d{2}$/.test(test)) {
    const [h, m] = test.split(':').map(Number);
    return h * 60 + m;
  }
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get('hour') * 60 + get('minute');
}

/** Returns { open, label, detail } for a given minute of the day. */
export function openingStatus(now) {
  const sessions = HOURS.map(([oh, om, ch, cm]) => [oh * 60 + om, ch * 60 + cm]);

  const current = sessions.find(([start, end]) => now >= start && now < end);
  if (current) return { open: true, label: 'Open now', detail: `until ${fmt(current[1])}` };

  const nextIndex = sessions.findIndex(([start]) => now < start);
  if (nextIndex === 0) return { open: false, label: 'Closed now', detail: `opens at ${fmt(sessions[0][0])}` };
  if (nextIndex > 0) return { open: false, label: 'Closed now', detail: `opens again at ${fmt(sessions[nextIndex][0])}` };
  return { open: false, label: 'Closed now', detail: `opens tomorrow at ${fmt(sessions[0][0])}` };
}

/** Current opening status, refreshed every 60 seconds. */
export default function useOpeningStatus() {
  const [status, setStatus] = useState(() => openingStatus(colomboMinutes()));

  useEffect(() => {
    const id = setInterval(() => setStatus(openingStatus(colomboMinutes())), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return status;
}
