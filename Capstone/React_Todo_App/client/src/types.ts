export default interface Todo {
  'id': number,
  'title': string,
  'day'?: string,
  'month'?: string,
  'year'?: string,
  'completed': boolean,
  'description'?: string
}

// I can't figure this out right now, so I'm just copying this to the places that I need
// too many errors about must be imported using type-only...