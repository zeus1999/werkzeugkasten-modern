window.onload = function(){

    let abbr = document.getElementById("abbr");
    let abbr_result = document.getElementById("abbr_result");
    let abbr_result_parent = abbr_result.parentElement;
    abbr.addEventListener("keypress", function(e){
        if(e.key === "Enter"){

            let request = new Request("http://localhost:6/abbr", { method: "POST", body: '{"abbr": "' + abbr.value + '"}', headers: {
                'Content-Type':'application/json'
            }});

            fetch(request).then(response => {
                if (response.status === 200){                    
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).then(response => {
                
                abbr_result.innerHTML = "";

                
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                td1.innerHTML = "abbr";
                let td2 = document.createElement("td");
                td2.innerHTML = "meaning";
                let td3 = document.createElement("td");
                td3.innerHTML = "data source";
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);

                abbr_result.appendChild(tr);

                for(let i = 0; i < response.length; i++){

                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    let td3 = document.createElement("td");

                    td1.innerHTML = response[i].abbr;
                    td2.innerHTML = response[i].meaning;
                    td3.innerHTML = response[i].type;

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);

                    abbr_result.appendChild(tr);

                }

                abbr_result_parent.style.display = "inherit";
                
            }).catch(error => {
                console.error(error);
            });


        }
    });
}