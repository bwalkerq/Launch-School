import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry,} from '../types'

import diaries from "../../data/entries"

const getEntries = (): DiaryEntry[] => {
  return diaries
}

const getNonsensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({id, date, weather, visibility}) =>
    ({id, date, weather, visibility}))
}

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry,
  }

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
}

export default {
  getEntries,
  addDiary,
  getNonsensitiveEntries,
  findById
}