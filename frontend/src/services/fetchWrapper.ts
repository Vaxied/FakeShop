export async function getData(url: string) {
    const headers = formatRequestHeader()
    const data = await fetch(url, {
        method: 'GET',
        headers,
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('GET: fetch end result (JSON)', result)
            return result
        })
        .catch((error) => {
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
        .then((response) => {
            console.log('response headers', ...response.headers)
            return response.json()
        })
        .then((result) => {
            console.log('POST: fetch end result (JSON)', result)
            return result
        })
        .catch((error) => console.log('error: ', error))
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
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            console.log('PATCH: fetch end result (JSON)', result)
            return result
        })
        .catch((error) => console.log('error: ', error))
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
        .then((response) => {
            console.log('DELETE: fetch end result (JSON)', response.status)
            return response.status
        })
        .catch((error) => console.log('error: ', error))
    return data
}

function getAccessToken() {
    return localStorage.getItem('accessToken')
}

function formatRequestHeader() {
    const accessToken = getAccessToken()
    let headers = {
        'Content-Type': 'application/json',
        Authorization: '',
    }

    if (accessToken) headers.Authorization = accessToken
    return headers
}
