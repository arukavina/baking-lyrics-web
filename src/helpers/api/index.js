// Standardize API response format across the app
// Decouple from implementation (here using axios)
const parseResponse = (response) => {
  if (!response.ok) {
    return response.json().then((json) => { if (json.error) throw new Error(JSON.stringify(json)) })
  }
  return response.text().then((text) => {
    try {
      return {
        statusCode: response.status,
        data: JSON.parse(text)
      }
    } catch (e) {
      return {
        statusCode: response.status,
        data: { text }
      }
    }
  })
}

// function to mock api calls
export default (
  data,
  delay = 500,
) => new Promise(resolve => setTimeout(() => resolve(parseResponse({
  status: 200,
  statusText: 'Success',
  data,
  text: () => Promise.resolve(JSON.stringify(data)),
  url: '',
  ok: true,
  json: () => Promise.resolve(data),
  headers: {},
})), delay))

export const get = endpoint => fetch(endpoint)
  .then(result => Promise.resolve(parseResponse(result)))
  .catch(err => Promise.reject(JSON.parse(err.message)))

export const post = (
  endpoint,
  data
) => {
  const body = JSON.stringify(data)
  return (
    fetch(endpoint, { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
      .then(result => Promise.resolve(parseResponse(result)))
      .catch(err => Promise.reject(JSON.parse(err.message)))
  )
}

export const patch = (
  endpoint,
  data = {},
  opts?
) => fetch(endpoint, { method: 'PATCH', body: data, ...opts })
  .then(result => parseResponse(result))
  .catch(err => Promise.reject(JSON.parse(err.message)))

export const put = (
  endpoint,
  data = {},
) => fetch(endpoint, { method: 'PUT', body: data, headers: { 'Content-Type': 'application/json' } })
  .then(result => parseResponse(result))
  .catch(err => Promise.reject(JSON.parse(err.message)))

export const del = (
  endpoint,
  opts?
) => fetch(endpoint, { method: 'DELETE', ...opts })
  .then(result => parseResponse(result))
  .catch(err => Promise.reject(JSON.parse(err.message)))