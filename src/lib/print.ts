/** Print-CV date format: "Sep 2021", or "Present" when a role is ongoing. */
export const formatPrintDate = (date: string | null | undefined) =>
  date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      })
    : 'Present';

/** Full names for the two-letter language codes cv.json uses. */
export const LANG_NAMES: Record<string, string> = {
  EN: 'English',
  ES: 'Spanish',
  RU: 'Russian',
};
