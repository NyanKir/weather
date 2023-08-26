import { NextFunction, Request, Response } from 'express';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ErrorBuilder } from '@exceptions/http.exception';

describe('Authorization middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let next: Partial<NextFunction> = jest.fn();
  const middleware = AuthMiddleware();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
  });

  it('Without headers', async () => {
    await middleware(
      mockRequest as Request,
      mockResponse as Response,
      next as NextFunction
    );
    expect(next).toBeCalledWith(ErrorBuilder.Forbidden());
  });
  it('Without authorization header', () => {});
  it('With authorization header', () => {});
});
