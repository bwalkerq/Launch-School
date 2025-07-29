import express, {Request, Response, NextFunction} from 'express';
import diaryService from '../services/diaryService';
import {newEntrySchema} from '../utils'

import {z} from "zod";
import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonsensitiveEntries());
})

router.get('/:id', (_req, res) => {
  res.send('getting a diary');
})

const newDiaryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error)
  }
}

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
})

router.use(errorMiddleware)

export default router;