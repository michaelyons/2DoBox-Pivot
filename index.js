var numCards = 0;

$(document).ready(getFromLocalStorage);

$('.save-btn').on('click', function(e){
    e.preventDefault();
    ideaCreate();
});

function removeIdea(target) {
    $(target).parent().parent().remove();
    localStorage.removeItem([target.parentNode.parentNode.id]);
}

$('#title-input').on('input', toggleSaveDisabled);
$('#body-input').on('input', toggleSaveDisabled);
$('.card-list').on('click', function(e) {
    e.preventDefault();
  var buttonTarget = e.target.classList;
    if (buttonTarget.contains("upvote") || buttonTarget.contains("downvote")) {
      changeImportance(e.target);
    } else if (e.target.classList.contains("delete-button")) {
      removeIdea(e.target);
    }
});

function toggleSaveDisabled() {
  var titleInput = $('#title-input');
  var bodyInput = $('#body-input'); 
  var saveButton = $('.save-btn');
    if (titleInput.val() === '' || bodyInput.val() === '') {
      saveButton.prop('disabled', true);
    } else {
      saveButton.prop('disabled', false);
    }
}


function newCard(ideaObject) {
  $('.card-list').prepend(` <div aria-label="ideas displayed here" id=${ideaObject.id} class="entire-card card">
    <aside class="title-text">
      <h2 class="idea" contenteditable> ${ideaObject.title}</h2>
      <button class="delete-button"></button>
    </aside>
    <aside class="body-text">
      <p class="light-text" contenteditable>${ideaObject.body}</p>
    </aside>
    <aside class="footer-text">
        <button class="upvote icon"></button>
        <button class="downvote icon"></button>
        <p class="importance-text">importance: ${ideaObject.importance}</p>
    </aside>
  </div>`);
    clearInputs();
}

function clearInputs() {
  var titleInput = $('#title-input');
  var bodyInput = $('#body-input');
  var saveButton = $('.save-btn');
    titleInput.val('');
    bodyInput.val('');
    saveButton.prop('disabled', true);
}

function ideaCreate() {
    var ideaObject = {
      title: $('#title-input').val(),
      body: $('#body-input').val(),
      id: Date.now(),
      importance: "Normal",
    };
    newCard(ideaObject);
    localStorage.setItem(ideaObject.id, JSON.stringify(ideaObject));
}

function changeImportance(cardIdea) {
    var importanceValue = $(cardIdea).siblings()[1];
    var wordArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var cardId = $(cardIdea).parent().parent("div").attr("id");
    var numCards = updateCounter(cardIdea);
    $(importanceValue).text("importance: " + wordArray[numCards]);
    var parsedObject = JSON.parse(localStorage.getItem([cardId]));
    parsedObject.importance = wordArray[numCards];
    localStorage.setItem([parsedObject.id], JSON.stringify(parsedObject));
}
 
function updateCounter(cardIdea) {
  var cardId = $(cardIdea).parent().parent("div").attr("id");
    numCards = $(cardIdea).hasClass('upvote') ? numCards = numCards + 1 : numCards = numCards - 1;
    numCards > 4 ? numCards = 4 : null;
    numCards < 0 ? numCards = 0 : null;
    return numCards;
}

$('.container-box').on('blur', ('.idea, .title-text'), todoUpdateTitle);

function todoUpdateTitle() {
  var cardId = $(this).parent('aside').parent("div").attr("id");
  var id = $(this).closest('section').attr('id');
  var parsedLocal = JSON.parse(localStorage.getItem(cardId));
  parsedLocal.title = $(this).text();
  sendToStringify = localStorage.setItem(cardId, JSON.stringify(parsedLocal));  
}

$('.container-box').on('blur', ('.light-text, .body-text'), todoUpdateBody);

function todoUpdateBody() {
  var cardId = $(this).parent('aside').parent("div").attr("id");
  var id = $(this).closest('section').attr('id');
  var parsedLocal = JSON.parse(localStorage.getItem(cardId));
  parsedLocal.body = $(this).text();
  sendToStringify = localStorage.setItem(cardId, JSON.stringify(parsedLocal));  
}

function getFromLocalStorage() {
  $.each(localStorage, function(key, value) {
    isNaN(this) ?  $( ".card-idea" ).prepend(newCard(JSON.parse(this))) : null;
})}

$('#search-input').on('keyup', filterCards);
function filterCards() {
    var searchTerm =$(this).val().toLowerCase();
    $('.entire-card').each(function(index, element){
    var text= $(element).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(element).toggle(match);
  })};
