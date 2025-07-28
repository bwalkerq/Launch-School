import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diaryService.getNonsensitiveEntries());
})

router.post('/', (_req, res) => {
    res.send('creating a new diary');
})

export default router;