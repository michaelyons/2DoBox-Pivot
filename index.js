var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('.save-btn');
var numCards = 0;
var qualityVariable = "swill";
var ideaList = $('.bottom-box');
var ideasArray = [];

// $(document).ready(retrieveFromLocalStorage);

// function retrieveFromLocalStorage() {
//     for (var i=0; i < localStorage.length; i++) {
//         var storageRetrieve = JSON.parse(localStorage.getItem(localStorage.key(i)));
//         ideasArray.push(storageRetrieve);
//     }
//     getIdeasAndRender();
// }

saveButton.on('click', function(e){
    e.preventDefault();
    ideaCreate();
    newCard();
})

titleInput.on('input', toggleSaveDisabled);
bodyInput.on('input', toggleSaveDisabled);
ideaList.on('click', function(e) {
    e.preventDefault();
  var buttonTarget = e.target.classList;
    if (buttonTarget.contains("upvote") || buttonTarget.contains("downvote")) {
      changeQuality(e.target);
    } else if (e.target.classList.contains("delete")) {
      removeIdea(e.target);
    } 
  });
    // getIdeasAndRender();

function toggleSaveDisabled() {
    if (titleInput.val() === '' || bodyInput.val() === '') {
      saveButton.prop('disabled', true);
    } else {
      saveButton.prop('disabled', false);
    }
  }

function newCard(id , title , body , quality) {
    ideaList.prepend('<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>');
    clearInputs();
};

function clearInputs() {
    titleInput.val('');
    bodyInput.val('');
    saveButton.prop('disabled', true);
}

function ideaCreate() {
    var ideaObject = {
      title: titleInput.val(),
      body: bodyInput.val(),
      id: Date.now(),
      quality: "swill"
    };
    ideasArray.push(ideaObject);
    localStorage.setItem([ideaObject.id], JSON.stringify(ideaObject));
   };

   function changeQuality(cardIdea) {
    var qualityValue = $(cardIdea).siblings()[1];
    var wordArray = ['swill', 'plausible', 'genius'];
    var cardId = $(cardIdea).parent().parent("div").attr("id");
    
    $(cardIdea).hasClass('upvote') ? numCards = numCards + 1 : numCards = numCards - 1;
    numCards > 2 ? numCards = 2 : null;
    numCards < 0 ? numCards = 0 : null;
    
    $(qualityValue).text("quality: " + wordArray[numCards]);
    var parsedObject = JSON.parse(localStorage.getItem([cardId]));
    parsedObject.quality = wordArray[numCards];
    localStorage.setItem([parsedObject.id], JSON.stringify(parsedObject));
  };


// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     console.log(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(cardObject());
//     localStorage.setItem('card' + numCards  , cardString);
// }

// $('.save-btn').on('click', function(event) {
//     event.preventDefault();
//     if ($('#title-input').val() === "" || $('#body-input').val() === "") {
//        return false;
//     };  
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// });

