import { RouteHandle } from '@/declarations/route';
import Joi from 'joi';
import { ErrorBuilder } from '@exceptions/http.exception';

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAMS = 'params'
}

export const ValidationMiddleware = function (
  schema: Joi.Schema,
  source: ValidationSource = ValidationSource.BODY
): RouteHandle<void> {
  return async (req, res, next) => {
    let data;
    switch (source) {
      case 'body':
        data = req[source];
        break;
      case 'query':
        data = req[source];
        break;
      case 'params':
        data = req[source];
        break;
      case 'headers':
        data = req[source];
        break;
      default:
        break;
    }

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      errors: {
        wrap: {
          label: ''
        }
      }
    });

    if (!error) {
      req[source] = value;
      return next();
    }

    next(ErrorBuilder.BadRequest(error));
  };
};
