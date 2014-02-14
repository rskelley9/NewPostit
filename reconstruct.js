// notesArray.push({ Index: i, Font: font, Content: content, Position: position })



var reconstructNote = function(font, content, position){

  var $postItArray = $('.post-it')

  if $postItArray.size() === 0
  {
    var id = 0
  }
  else
  {
    var lastNoteId = $postItArray.last().attr('id')
    var id = ++lastNoteId
  }

  var newNote = "<div class='header'><span class='erase'>Erase</span><span class='note-font'>Font</span><span class='close'>X</span></div>"
  var $note = $("#"+id)
  var $noteContent = $("#"+id+" .content")

  $("#board").append("<div id='" + id + "' class='post-it'>");

  $note.draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

  $note.html(newNote)

  //add font
  $note.append("<div class='content "+font+"' contenteditable='true'>")

  //add content
  $noteContent.append(content)

  //move to past position
  movePostIt(id,position.left, position.top)

  effects = ["clip","blind","bounce","explode","highlight", "shake", "scale", "pulsate", "slide", "size", "fold", "puff"]

  showPostIt(id, effects)

};
