const voteBtns = document.querySelectorAll(".voteBtn")

document.addEventListener("ready", function(){
    pollResults
    // ajaxCall("./php/poll.php?vote=")
    ajaxCall("https://savannahskinner.com/poll.php?vote=")
})

voteBtns.forEach(function(element){
    element.addEventListener("click", function(e){
        e.preventDefault();
        let voteResponse = document.querySelector('[name="vote_response"]')
        voteResponse.setAttribute("value", element.getAttribute("data-vote-response"));
        console.log(voteResponse)
    })
});

function ajaxCall(fetch_url, body = false, testing = true) {
	console.log("run ajax call")
    if (body === true) {
        fetch_url = fetch_url + "true"
        body = new FormData(document.querySelector("#pollForm"));
    } else {
        fetch_url = fetch_url + "false"
    }
    fetch(fetch_url, {
        method: 'POST',
        headers: {
            Access-Control-Allow-Origin: *
        },
        redirect: 'follow',
        body: body,
        // cors: "same-origin",
        credentials: 'include'
    }).then((response) => {
            if (response.status == 404) {
                console.error("dats no good, code 404")
                data = false;
            } else {
                if (!testing) {
                    data = response.json();
                } else {
                    data = response.text();
                    console.log("testing: " + data)
                }

            }
            return data;
        }).then((data) => {
                if (!data) {
                    return;
                }
                if (!testing) {
                    if (data['error']) {
                        updatePoll(data, data['error']);
                    } else {
                        updatePoll(data);
                    }
                }
            })
}

function updatePoll(data, errors = false) {
    if (errors) {
        console.error("Oh no: " + errors)
    } else {
        console.log("carry on")
    }
}