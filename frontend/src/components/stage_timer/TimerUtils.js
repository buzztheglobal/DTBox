// frontend/src/components/stage_timer/TimerUtils.js
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export async function generateControllerUrl(roomId) {
  try {
    const response = await fetch(`http://localhost:5000/api/urls/resolve/Stage-Timer`);
    if (!response.ok) {
      throw new Error('Failed to resolve URL');
    }
    const data = await response.json();
    return data.url; // e.g., http://localhost:3000/Stage-Timer/control/room1?apiKey=mock-api-key-123
  } catch (err) {
    console.error(err);
    // Fallback URL
    return `http://localhost:3000/Stage-Timer/control/${roomId}?apiKey=mock-api-key-123`;
  }
}
//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\stage_timer\TimerUtils.js