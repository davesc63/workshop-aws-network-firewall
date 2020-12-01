// Counter Script - <body id="page-top" onload="updateCounter()">
function updateCounter() {
    fetch("https://rxxhiaphyj.execute-api.ap-southeast-2.amazonaws.com/prod/anfw", {
        method: "GET",
    })
        .then((response) => {
            if (
                // check if response's status is 200
                response.ok
            ) {
                return response.json();
            } else {
                throw new Error("something went wrong");
            }
        })
        .then(console.log("Counter incremented successfully!"));
}
