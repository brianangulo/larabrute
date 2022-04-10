const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const FETCH_METHODS = {
  GET: 'GET',
  POST: 'POST',
};

/**
 * General purpose hook meant for data fetching
 * @param {string} method The method for the request i.e. POST or GET
 * @param {string} endpoint The endpoint the request is going to
 * @param {Object} payload An object with the payload for POST requests
 * @param {Object} optionalHeaders Add this if you would like to override the default headers
 * @returns {Promise<Response>} A fetch promise response
 */
export const useFetch = (
  method,
  endpoint,
  payload,
  optionalHeaders = DEFAULT_HEADERS
) => {
  if (!method) throw new Error('Method must be specified');
  if (!endpoint) throw new Error('Endpoint must be specified');
  if (FETCH_METHODS[method] === undefined)
    throw new Error('Invalid method provided');
  if (method === FETCH_METHODS.POST && !payload)
    throw new Error('Missing Payload on POST method');

  const requestInit = {
    method: method,
    cache: 'no-cache',
    headers: optionalHeaders,
  };
  if (payload) requestInit.body = JSON.stringify(payload);

  return fetch(endpoint, requestInit);
};
