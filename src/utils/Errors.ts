import { NextFunction, Request, Response } from "express";
import { constants } from 'http2';

export class RequestError extends Error{
    constructor(message: string, readonly status: number){
        super(message)
    }
}

export const BAD_REQUEST_ERROR = () => new RequestError("Bad Request",constants.HTTP_STATUS_BAD_REQUEST);

export const errorMiddleWare = (
    err: Error, req: Request, res: Response, _next: NextFunction
  ) => {
    if(!(err instanceof RequestError)){
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: err.message});
        return
    }
    res.status(err.status).send({message: err.message});
  };
