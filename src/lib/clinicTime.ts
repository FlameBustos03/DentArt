/** Dent Art schedules in Poza Rica / Villahermosa. Mexico City has no DST (UTC−6). */
export const CLINIC_TIME_ZONE = "America/Mexico_City";

export type ClinicCalendar = {
  year: number;
  month: number;
  day: number;
  hour: number;
};

export function clinicCalendar(now: Date = new Date()): ClinicCalendar {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CLINIC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  let hour = Number(value("hour"));
  if (hour === 24) {
    hour = 0;
  }

  return {
    year: Number(value("year")),
    month: Number(value("month")),
    day: Number(value("day")),
    hour,
  };
}

export function clinicYear(now: Date = new Date()): number {
  return clinicCalendar(now).year;
}

export function addCalendarDays(year: number, month: number, day: number, days: number) {
  const utc = new Date(Date.UTC(year, month - 1, day + days));
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  };
}

/** 0 = Sunday … 6 = Saturday, for the calendar date itself. */
export function calendarWeekdayIndex(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

/** Noon in the clinic timezone, so labels stay on that calendar date. */
export function clinicNoon(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 18, 0, 0));
}

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}
