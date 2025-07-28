export type Weather = 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'stormy';

export type visibility = 'great' | 'good' | 'ok'| 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: visibility;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>