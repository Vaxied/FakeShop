export async function postData(url, body) {
    console.log('url', url)
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        redirect: 'follow',
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('fetch response', result)
            return result
        })
        .catch((error) => console.log('error: ', error))
    return data
}

export function getData(url) {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => console.log(response.json()))
        .catch((error) => {
            throw new Error(error)
        })
}
