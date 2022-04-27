import Joi from 'joi';
import { genAlphaNumeric, genLattitude, genLongitude } from '../utils/Gen';
import { getEncodeDecodePair } from '../utils/Joi';

export interface Wave{
    id: string,
    name: string
    longitude: string
    lattitude: string
}

export const genWave = ():Wave => ({
    id: genAlphaNumeric(),
    name: genAlphaNumeric(),
    longitude: genLongitude(),
    lattitude: genLattitude()
})

export const WaveSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    longitude: Joi.string().required(),
    lattitude: Joi.string().required()
})

export const { decoder: decodeWave, encoder: encodeWave } =
  getEncodeDecodePair<Wave>(WaveSchema);