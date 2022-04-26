import Joi from 'joi';
import { isNil } from 'lodash';

function decodeJson<A>(message: unknown, schema: Joi.Schema): A {
    if (isNil(message)) {
      throw new Error('Cannot decode an empty payload');
    }
  
    const { error, value } = schema.validate(message, { stripUnknown: true });
    if (error) {
      throw error
    }
    return value as A;
  }
  
  function encodeJson<A>(obj: A, schema: Joi.Schema): A {
    if (isNil(obj)) {
      throw new Error('Cannot encode an empty payload');
    }
  
    const { error, value } = schema.validate(obj, { stripUnknown: true });
    if (error) {
        throw error
    }
    return value;
  }
  
  function getEncodeDecodePair<A>(schema: Joi.Schema): {
    encoder: (mes: A) => A;
    decoder: (mes: unknown) => A;
  } {
    const encoder = (mes: A): A => encodeJson(mes, schema);
    const decoder = (mes: unknown): A => decodeJson(mes, schema);
    return { encoder, decoder };
  }
  export { Joi, decodeJson, encodeJson, getEncodeDecodePair };