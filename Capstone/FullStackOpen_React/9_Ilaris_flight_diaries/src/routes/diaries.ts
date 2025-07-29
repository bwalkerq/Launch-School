import express from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from "../types";
import { Response } from "express";
import { toNewDiaryEntry } from '../utils'
import {z} from "zod";

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

    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues});
        } else {
            res.status(400).send({ error: 'unknown error' })
        }
    }
})

export default router;