export const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export const StatusCode = {
  NotFound: 404,
  Forbidden: 403,
  BadRequest: 400,
  UpgradeRequired: 426,
  ManyRequest: 429,
  ServerError: 500,
  UnAuthorized: 401,
  ExpressErrors: 422,
  Success: 200,
  Created: 201,
  Error: "error",
  NetworkError: "Network Error",
};

export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
