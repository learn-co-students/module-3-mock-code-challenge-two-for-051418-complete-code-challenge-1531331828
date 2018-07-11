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

      titleElement.className = showingId;
      titleElement.id = `film-title-${showingId}`
      runtimeElement.id = `film-runtime-${showingId}`
      showtimeElement.id = `film-showtime-${showingId}`
      remainingTicketsElement.id = `film-remaining-tickets-${showingId}`

      titleElement.innerText = showingFilmTitle
      runtimeElement.innerText = showingFilmRuntime + " minutes"
      showtimeElement.innerText = showingShowtime
      remainingTicketsElement.innerText = showingTicketsRemaining + " tickets available"
    })
}

showingContainer.addEventListener("click", function(e){
   if (e.target.className == "ui blue button"){
      let currentShowingId = e.target.parentElement.parentElement.getElementsByTagName("DIV")[1].className
      updateTicketBackend(currentShowingId);
      //add to promise chain here to reduce tickets or display sold out.
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
                          <div class="ui blue button">Buy Ticket</div>
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
