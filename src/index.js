let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const destinationURL = "http://localhost:3000/toys"
const likeBtn = document.querySelectorAll(".like-btn")

// Get the Data of the Toys
function getToys(){
  fetch(destinationURL).then(function(response) {
    return response.json();
  }).then(function(json) {
    toyCollection.innerHTML = '';
    json.forEach(toy => renderToy(toy))
  }); 
}

// Creates the Div-card with info for Charachter
function renderToy(toy){
    card = document.createElement('div')
    card.className = "card"
    card.innerHTML = `
      <h2> ${toy.name}  </h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
    `
    toyCollection.appendChild(card)
}

// Document Load
document.addEventListener("DOMContentLoaded", () => {

  getToys()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", e => {
        e.preventDefault()
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Add New Toy 
function postToy(newToy){

  fetch(destinationURL, configObject= {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToy.name.value,
      image: newToy.image.value,
      likes: 0
    })
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    renderToy(json);
  });
}


toyCollection.addEventListener('click', like )


function like(e){
  e.preventDefault()
  let btnClicked = e.target
  let addLike = parseInt(btnClicked.previousElementSibling.innerText) + 1

  fetch(destinationURL+`/${e.target.id}`, configObject= {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: addLike
    })}
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      renderToy(json);
    });
  }
// Add Like




