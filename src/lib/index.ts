import { NextFunction, Request, Response } from 'express';
import HTTP from 'http-status-codes';
import schema from '../schema';

export function codedError(code: number, message: string): { code: number; message: string; } {
  return { code, message };
}

// eslint-disable-next-line
export function validation(schemaId: string) {
  // eslint-disable-next-line
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req.query;
    try {
      validate(schemaId, payload);
    } catch (err) /* istanbul ignore next */ {
      return res.status(err.code || HTTP.INTERNAL_SERVER_ERROR).send(err);
    }
    return next();
  };
}

function validate(schemaId: string, target: unknown): void {
  const fullSchemaURI = `schema://${schemaId}.json`;

  const validator = schema.getSchema(fullSchemaURI);

  if (!validator) /* istanbul ignore next */ { // edge case
    throw codedError(HTTP.INTERNAL_SERVER_ERROR, 'Unable to validate input');
  }

  validator(target);

  if (validator.errors) {
    const errors = validator.errors.map((err) => (err.keyword === 'enum' || err.keyword === 'additionalProperties'
      ? `${err.dataPath.slice(1)} ${err.message} '${Object.values(err.params)[0]}'`
      : `${err.dataPath.slice(1)} ${err.message}`),
    );
    throw codedError(HTTP.BAD_REQUEST, `${schemaId}:${errors.toString()}`);
  }
  return;
}
