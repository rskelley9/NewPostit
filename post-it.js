var findFont = function(note){

  var classArray = note.find('.content').attr('class').split(' ')

  if (classArray.length > 1)
  {
    note.find('.content').attr('class').split(' ')[1]
  }
  else
  {
    " "
  }

};

var saveNotes = function(){

  var notesArray = []

  var $notes = $('.post-it')

  $notes.each(function(i, e){

    var content = $(e).find('.content').text()

    var position = $(e).position()

    //changed from $(e)
    var font = "marker"

    notesArray.push({ Index: i, Font: font, Content: content, Position: position })

  });

  //requires json2.js plugin
  var jsonStr = JSON.stringify(notesArray);

  localStorage.setItem("notes", jsonStr);
};



var getAction = function(effects) {
 return effects[Math.floor(Math.random() * effects.length)];
};

var showPostIt = function(id,array) {
  var randomAction = getAction(array)
  $("#"+id).show(randomAction)
  $("#"+id).resizable({
    animate: true,
    alsoResize: ".content",
    aspectRatio: 1 / 1
  });
};

var movePostIt = function(id,x,y) {
  $("#"+id).css("top",y);
  $("#"+id).css("left",x);
};

var count = {
  value: 0,
  plusOne: function() {
    ++this.value
  }

};

var reconstructNote = function(font, content, position){

  var $postItArray = $('.post-it')

  if ($postItArray.length < 1)
  {
    var idNote = 0
  }
  else
  {
    var lastNoteId = $postItArray.last().attr('id')
    var idNote = ++lastNoteId
  }

  var newNote = "<div class='header'><span class='erase'>Erase</span><span class='note-font'>Font</span><span class='close'>X</span></div>"

  var $note = $("#"+idNote)

  var $noteContent = $("#"+idNote+" .content")

  $("#board").append("<div id='" + idNote + "' class='post-it'>");

  $note.draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

  $note.html(newNote)

  $note.append("<div class='content "+font+"' contenteditable='true'>")

  $noteContent.append(content)

  movePostIt(idNote, position.left, position.top)

  effects = ["clip","blind","bounce","explode","highlight", "shake", "scale", "pulsate", "slide", "size", "fold", "puff"]

  showPostIt(idNote, effects)

};


var loadNotes = function(){
  var storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    var notesArray = JSON.parse(storedNotes);
    var arrLength = notesArray.length;

    var i;
    for (i = 0; i < arrLength; i++) {
      var storedNote = notesArray[i];
      reconstructNote(storedNote.Font, storedNote.Content, storedNote.Position);
    }
  }
};

function initialize() {

  $(document).click(function(event) {

    if ((($(event.target).hasClass("post-it")) === false)  && (($(event.target).is("#save")) === false) && (($(event.target).is("#clear-board")) === false) && (($(event.target).hasClass("header")) === false) && (($(event.target).hasClass("note-font")) === false) && (($(event.target).hasClass("close")) === false) && (($(event.target).hasClass("erase")) === false) && ($(event.target).is('#controls') === false) && ($(event.target).hasClass("content") === false) && ($(event.target).is("palette") === false) && ($(event.target).is("#pen-font") === false) && ($(event.target).is("#pen-color") === false)) {

      var id = count.value

      newPostIt = "<div class='header'><span class='erase'>Erase</span><span class='note-font'>Font</span><span class='close'>X</span></div>"

      $("#board").append("<div id='" + id + "' class='post-it'>");

      $("#"+id).draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

      $("#"+id).html(newPostIt)

      $("#"+id).append("<div class='content' contenteditable='true'>")

      movePostIt(id,event.clientX,event.clientY)

      effects = ["clip","blind","bounce","explode","highlight", "shake", "scale", "pulsate", "slide", "size", "fold", "puff"]

      showPostIt(id, effects)

      count.plusOne()
    }
    else if ($(event.target).hasClass("close") === true)
    {

      $(event.target).parents(":eq(1)").fadeOut({duration:1100})

    }

    else if ($(event.target).hasClass("erase") === true)
    {
      $(event.target).parent().siblings().first().wrapInner( "<div class='fade'></div>" )
      $('.fade').fadeOut({duration:800})
    }
    else if ($(event.target).hasClass("note-font") === true)
    {
      var noteContent = $(event.target).parent().siblings().first()

      if (noteContent.hasClass('marker'))
      {
        noteContent.removeClass('marker').addClass('pen')
      }
      else if (noteContent.hasClass('pen'))
      {
        noteContent.removeClass('pen').addClass('ink')
      }
      else if (noteContent.hasClass('ink'))
      {
        noteContent.removeClass('ink').addClass('hand-write')
      }
      else if (noteContent.hasClass('hand-write'))
      {
        noteContent.removeClass('hand-write')
      }
      else
      {
        noteContent.addClass('marker')
      }
    }
    else if ($(event.target).is("#save"))
    {
      localStorage.clear();
      saveNotes();
    }
    else {
      $(event.target).focus()
    }
  })

};

$(document).ready(function(){

  loadNotes();

  initialize()
});

