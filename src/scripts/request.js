async function request(url = '', method = 'POST', data = undefined) {
    const response = await fetch(
        url, {
            method: method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: data == undefined ? undefined : JSON.stringify(data)
        }
    );
    
    return {status : response.status, body: await response.json()};
}

module.exports = request;