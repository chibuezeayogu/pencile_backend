import { StatusCodes } from "http-status-codes";

const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR, CREATED } = StatusCodes;

const statusCodes = { NOT_FOUND, OK, CREATED, INTERNAL_SERVER_ERROR };

/**
 * Returns a json response with status code 200 and a response body
 *
 * @param {any} res
 * @param {number} statusCode
 * @param {any} body
 *
 * @return Response
 */
export const ok = (res, statusCode, body = {}) =>
  res.status(statusCodes[statusCode]).json({ success: true, ...body });

/**
 * Returns a json response with a status code and a response body
 *
 * @param {any} res
 * @param {number} statusCode
 * @param {string} message
 *
 * @return Response
 */
export const erorrHandler = (res, statusCode, message) =>
  res.status(statusCodes[statusCode]).json({ success: false, message });
