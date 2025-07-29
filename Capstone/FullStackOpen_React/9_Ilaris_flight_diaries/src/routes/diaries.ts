import express from 'express';
import diaryService from '../services/diaryService';
import {NonSensitiveDiaryEntry} from "../types/types";
import {Response} from "express";

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

export default router;