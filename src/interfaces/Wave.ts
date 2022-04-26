import Joi from 'joi';
import { genAlphaNumeric, genLattitude, genLongitude } from '../utils/Gen';
import { getEncodeDecodePair } from '../utils/Joi';

export interface Wave{
    name: string
    longitude: string
    lattitude: string
}

export const genWave = ():Wave => ({
    name: genAlphaNumeric(),
    longitude: genLongitude(),
    lattitude: genLattitude()
})

export const WaveSchema = Joi.object({
    name: Joi.string().required(),
    longitude: Joi.string().required(),
    lattitude: Joi.string().required()
})

export const { decoder: decodeWave, encoder: encodeWave } =
  getEncodeDecodePair<Wave>(WaveSchema);