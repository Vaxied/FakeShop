export async function getData(
    url: string,
    responseType?: 'json' | 'text',
    headerOpts = { 'Content-type': 'application/json' },
) {
    const headers = formatRequestHeader(headerOpts)
    const data = await fetch(url, {
        method: 'GET',
        headers,
    })
        .then(response =>
            responseType === 'text' ? response.text() : response.json(),
        )
        .then(result => {
            // console.log('GET: fetch end result', result)
            return result
        })
        .catch(error => {
            throw error
        })
    return data
}

export async function postData(url: string, body: object) {
    const headers = formatRequestHeader()
    // console.log(headers)

    const data = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        redirect: 'follow',
    })
        .then(response => {
            console.log('response headers', ...response.headers)
            return response.json()
        })
        .then(result => {
            console.log('POST: fetch end result (JSON)', result)
            return result
        })
        .catch(error => console.log('error: ', error))
    return data
}

export async function updateData(url: string, body: object) {
    const headers = formatRequestHeader()
    const data = await fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
        redirect: 'follow',
    })
        .then(response => {
            return response.json()
        })
        .then(result => {
            console.log('PATCH: fetch end result (JSON)', result)
            return result
        })
        .catch(error => console.log('error: ', error))
    return data
}

export async function deleteData(url: string, body: object) {
    const headers = formatRequestHeader()

    const data = await fetch(url, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
        redirect: 'follow',
    })
        .then(response => {
            console.log('DELETE: fetch end result (JSON)', response.status)
            return response.status
        })
        .catch(error => console.log('error: ', error))
    return data
}

export function getAccessToken() {
    return localStorage.getItem('accessToken')
}

function formatRequestHeader(
    headerOpts = { 'Content-type': 'application/json' },
) {
    const accessToken = getAccessToken()
    let headers = {
        // 'Content-Type': 'application/json',
        ...headerOpts,
        Authorization: '',
    }
    if (accessToken) {
        if (isTokenExpired(accessToken)) {
            console.log('⚠️  Expired token')
        } else {
            console.log('✅  Valid token')
        }
    }

    if (accessToken) headers.Authorization = accessToken
    return headers
}
const parseJwt = (token: string) => {
    try {
        // Check part of payload
        const base64Payload = token.split('.')[1]
        // Decodifice to Base64 to JSON
        const payload = JSON.parse(atob(base64Payload))
        return payload
    } catch (error) {
        console.error('Error decoding JWT token: ', error)
        return null
    }
}

export const isTokenExpired = (token: string): boolean => {
    const decoded = parseJwt(token)

    if (!decoded || typeof decoded.exp !== 'number') {
        console.error('Token has no "exp" field')
        return true
    }

    // Get current time stamp
    const now = Math.floor(Date.now() / 1000)
    return decoded.exp < now
}
