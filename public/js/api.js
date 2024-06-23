function getMessages() {

}

function sendRequest(message) {
    const xhttp = new XMLHttpRequest();

    let response = null;

    xhttp.open("GET", `/question?message=${message}`, true);

    xhttp.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }

    xhttp.send();
}
