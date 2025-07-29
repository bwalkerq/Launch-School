import express from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from "../types";
import { Response } from "express";
import toNewDiaryEntry from '../utils'

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonsensitiveEntries());
})

router.post('/', (_req, res) => {
    res.send('creating a new diary');
})

router.get('/:id', (_req, res) => {
    res.send('getting a diary');
})

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);

        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error) {
        let errorMessage = 'Error:';
        if (error instanceof Error) {
            errorMessage += error.message;
        } else {
            errorMessage += error;
        }
        res.status(400).send(errorMessage);
    }

    const { date, weather, visibility, comment } = req.body;
    const addedEntry = diaryService.addDiary({
        date,
        weather,
        visibility,
        comment
    })
    res.json(addedEntry);
})

export default router;