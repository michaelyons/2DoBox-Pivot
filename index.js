var numCards = 0;

$(document).ready(getFromLocalStorage);

$('.save-btn').on('click', function(e){
    e.preventDefault();
    ideaCreate();
})

function removeIdea(target) {
    $(target).parent().parent().remove();
    localStorage.removeItem([target.parentNode.parentNode.id]);
  };

$('#title-input').on('input', toggleSaveDisabled);
$('#body-input').on('input', toggleSaveDisabled);
$('.card-list').on('click', function(e) {
    e.preventDefault();
  var buttonTarget = e.target.classList;
    if (buttonTarget.contains("upvote") || buttonTarget.contains("downvote")) {
      changeQuality(e.target);
    } else if (e.target.classList.contains("delete")) {
      removeIdea(e.target);
    } else if (e.target.classList.contains("marked-complete")) {
      completeMarked(e.target);
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
  $('.card-list').prepend(` <div aria-label="ideas displayed here" id=${ideaObject.id} class="entire-card">
    <aside class="title-text">
      <h2 class="idea"> ${ideaObject.title}</h2>
      <button class="delete-button"></button>
    </aside>
    <aside>
      <p class="light-text">${ideaObject.body}</p>
    </aside>
    <aside class="footer-text">
        <button class="upvote icon"></button>
        <button class="downvote icon"></button>
        <p class="quality-text">quality: ${ideaObject.quality}</p>
    </aside>
    <article>
      <button class="marked-complete">Completed</button>
    </article>
  </div>`);
    clearInputs();
};

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
      quality: "swill",
      completed: false
    };
    newCard(ideaObject);
    localStorage.setItem(ideaObject.id, JSON.stringify(ideaObject));
   };

function changeQuality(cardIdea) {
    var qualityValue = $(cardIdea).siblings()[1];
    var wordArray = ['swill', 'plausible', 'genius'];
    var cardId = $(cardIdea).parent().parent("div").attr("id");
    var numCards = updateCounter(cardIdea);
    $(qualityValue).text("quality: " + wordArray[numCards]);
    var parsedObject = JSON.parse(localStorage.getItem([cardId]));
    parsedObject.quality = wordArray[numCards];
    localStorage.setItem([parsedObject.id], JSON.stringify(parsedObject));
  };
 
function updateCounter(cardIdea) {
  var cardId = $(cardIdea).parent().parent("div").attr("id");
    numCards = $(cardIdea).hasClass('upvote') ? numCards = numCards + 1 : numCards = numCards - 1;
    numCards > 2 ? numCards = 2 : null;
    numCards < 0 ? numCards = 0 : null;
    return numCards;
}

function getFromLocalStorage() {
  $.each(localStorage, function(key, value) {
    isNaN(this) ?  $( ".card-idea" ).prepend(newCard(JSON.parse(this))) : null;
})};

$('#search-input').on('keyup', filterCards);
function filterCards() {
    var searchTerm =$(this).val().toLowerCase();
    $('.entire-card').each(function(index, element){
    var text= $(element).text().toLowerCase();
    var match = !!text.match(searchTerm);
    $(element).toggle(match);
  })};


  $('.completed-task-btn').on('click', )

  function completeMarked(target) {
    var markedTarget = $(target).parent().parent();
    console.log(markedTarget);
  }


  function removeIdea(target) {
    $(target).parent().remove();
    localStorage.removeItem([target.parentNode.parentNode.id]);
  };