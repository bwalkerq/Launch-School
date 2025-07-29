import diaries from "../../data/entries"
import { NonSensitiveDiaryEntry } from '../types/types'

import { DiaryEntry } from '../types/types'

const getEntries = (): DiaryEntry[] => {
    return diaries
}

const getNonsensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) =>
        ({ id, date, weather, visibility }))
}

const addDiary = () => {
    return null
}

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonsensitiveEntries,
    findById }