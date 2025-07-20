// File: src/components/date_calculator/utils.js

import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  parseISO,
  isValid,
  differenceInCalendarDays,
} from 'date-fns';

// 🔹 Calculate the difference in years, months, days
export function calculateDateDifference(dateStr1, dateStr2) {
  const d1 = parseISO(dateStr1);
  const d2 = parseISO(dateStr2);

  if (!isValid(d1) || !isValid(d2)) {
    throw new Error('Please enter valid dates.');
  }

  const [start, end] = d1 < d2 ? [d1, d2] : [d2, d1];

  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, start) % 12;
  const days = differenceInDays(end, start) % 30;

  return { years, months, days };
}

// 🔹 Zodiac sign calculator
export function getZodiacSign(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  return 'Sagittarius';
}

// 🔹 Countdown to next birthday
export function getNextBirthdayCountdown(birthDateStr) {
  const today = new Date();
  const birthDate = parseISO(birthDateStr);
  if (!isValid(birthDate)) return null;

  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const nextBirthday =
    thisYearBirthday >= today
      ? thisYearBirthday
      : new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());

  return differenceInCalendarDays(nextBirthday, today);
}
