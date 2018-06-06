# gc-ec => Google Calendar Event Counter

## About
This simple web app was build with ```create-react-app``` for practice with Google Calendar API, lerning React and to help counting total time spent on projects in previus month.
For now it will cycle through all calendars that you have at least ```writer``` permission.

---

Assumptions:
- Days off are marked as full day events
- Events that overlaps with other events should have it color changed - and won't be counted. Partial overlap is curently not supported.

---
### To Do

- ~~Auth based routing~~
- ~~Display list of calendars with basic informations~~
- ~~Add configuration to calendars~~
- ~~Display list of events for selected calendar~~
- Add option to show events form selected dates range
- Add sorting/filtering for events