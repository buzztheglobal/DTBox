-- Creating the timer_messages table in the public schema
CREATE TABLE IF NOT EXISTS public.timer_messages (
  id SERIAL PRIMARY KEY,
  room_id VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from public.timer_messages