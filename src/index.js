const theatreId = 3;
const theatreUrl = "https://evening-plateau-54365.herokuapp.com/theatres/"

//elements
const showingContainer = document.getElementById("showing-container")

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(response=>response.json())
  .then(json=>obtainShowingData(json));


function obtainShowingData(json){

    json["showings"].forEach(function(individualShowing){
      let showingId = individualShowing.id;
      let showingFilmObj = individualShowing.film;
      let showingFilmTitle = individualShowing.film["title"]
      let showingFilmRuntime = individualShowing.film["runtime"]
      let showingCapacity = individualShowing.capacity;
      let showingShowtime = individualShowing.showtime;
      let showingTicketsSold = individualShowing.tickets_sold;

      let showingTicketsRemaining = (showingCapacity - showingTicketsSold);

      generateShowingHTML()

      let titleElement = document.getElementById("film-title");
      let runtimeElement = document.getElementById("film-runtime");
      let showtimeElement = document.getElementById("film-showtime");
      let remainingTicketsElement = document.getElementById("film-remaining-tickets");
      let buyButton = document.getElementById("buy-button")

      titleElement.className = showingId;
      titleElement.id = `film-title-${showingId}`
      runtimeElement.id = `film-runtime-${showingId}`
      showtimeElement.id = `film-showtime-${showingId}`
      remainingTicketsElement.id = `film-remaining-tickets-${showingId}`

      titleElement.innerText = showingFilmTitle
      runtimeElement.innerText = showingFilmRuntime + " minutes"
      showtimeElement.innerText = showingShowtime



      if (showingTicketsRemaining === 0){
        remainingTicketsElement.innerText = showingTicketsRemaining + " tickets available"
        buyButton.innerText = "SOLD OUT"
        buyButton.disabled = true;
      } else {
        remainingTicketsElement.innerText = showingTicketsRemaining + " tickets available"
      }



    })
}

showingContainer.addEventListener("click", function(e){
  e.preventDefault();
   if (e.target.className == "ui blue button"){

      let currentShowingId = e.target.parentElement.parentElement.getElementsByTagName("DIV")[1].className
      updateTicketBackend(currentShowingId);
      showingContainer.innerHTML = ""
      refreshFrontend();
      // if (e.target.parentElement.parentElement.getElementsByTagName("span")[1].innerText === "0 tickets available"){
      //   debugger;
      //   e.target.innerText = "SOLD OUT"
      //   e.target.disabled = true;
      // }

      // let currentlyRemaining = document.getElementById("film-remaning-tickets");
      // let buyButton = document.getElementById("")
      // debugger;
      // e.target.innerText = "SOLD OUT"
      // .then(response=>response.json())
      // .then(json=>obtainShowingData(json));
      //add to promise chain here to reduce tickets or display sold out.
      //fetch all and rerun showing data to refresh whole page
   }
})

function generateShowingHTML(){

  let showingHTML = `<div class="card">
                        <div class="content">
                          <div id="film-title" class="header">
                            (Film Title)
                          </div>
                          <div id="film-runtime" class="meta">
                            (Runtime) minutes
                          </div>
                          <div class="description">
                            <span id="film-showtime" class="ui label">
                              (Showtime)
                            </span>
                            <span id="film-remaining-tickets"(Num Tickets) remaining tickets</span>
                          </div>
                        </div>
                        <div class="extra content">
                          <div id="buy-button" class="ui blue button">Buy Ticket</div>
                        </div>
                      </div>`
  showingContainer.innerHTML += (showingHTML); //append not working
}

function updateTicketBackend(showingId){

  let url = "https://evening-plateau-54365.herokuapp.com/tickets"
  let body = {
    "showing_id": showingId
  }

  function updateTicket(url,body) {
     const postConfig = {
       Accept: "application/json",
       method: "POST",
       headers: {
         'Content-Type': 'application/json',
         Accepts: 'application/json'
       },
       body: JSON.stringify(body)
     };
     return fetch(url, postConfig)
   }
 updateTicket(url, body);
}

function refreshFrontend(){
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
    .then(response=>response.json())
    .then(json=>obtainShowingData(json));
}
