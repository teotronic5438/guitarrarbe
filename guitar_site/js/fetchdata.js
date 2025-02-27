// fetchdata.js

function fetchData(url, method, callback, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.log("Ocurrió un error: " + error));
}