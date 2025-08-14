// frontend/src/components/stage_timer/TimerUtils.js
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function generateControllerUrl(roomId) {
  // Mock API key and base URL; replace with actual StageTimer API in production
  const baseUrl = 'http://localhost:3000/Stage-Timer/control';
  const apiKey = 'mock-api-key-123'; // Placeholder
  return `${baseUrl}/${roomId}?apiKey=${apiKey}`;
}