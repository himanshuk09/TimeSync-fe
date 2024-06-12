import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }, {
    "_id": "65fd6c673cf7d26e5a7924c8",
    "allDay": true,
    "title": "namaste",
    "start": "2024-03-07",
    "end": "2024-03-08",
    "id": "10",
    "__v": 0
  },
  { id: createEventId(), title: 'Meeting', start: new Date(), _id: "abcdef" },
  { id: createEventId(), title: 'event 1', date: '2024-03-13' },
  { id: createEventId(), title: 'event 2', date: '2024-03-14' },
  { id: createEventId(), title: 'event 2', date: '2024-03-15' },
  { id: createEventId(), title: 'event 2', date: '2024-03-16' },
  { id: createEventId(), title: 'event 2', date: '2024-03-17' },
  { id: createEventId(), title: 'event 2', date: '2024-03-18' },
  { id: createEventId(), title: 'event 2', date: '2024-03-19' }
]

export function createEventId() {
  return String(eventGuid++)
}
