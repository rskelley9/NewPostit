//.position() returns position in coordinates


//if there is stored local data, load it

//save all postits coordinates, content, font

//on click save all postits again

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

  $notes.each(function(index, element){

    var content = $(e).find('.content').text()

    var position = $(e).position()

    var font = findFont($(e))

    notesArray.push({ Index: i, Font: font, Content: content, Position: position })

  })

  //requires json2.js plugin
  var jsonStr = JSON.stringify(notesArray);

  localStorage.setItem("notes", jsonStr);
};

var loadNotes = function(){
  var storedNotes = localStorage.getItem("notes");
     if (storedNotes) {
        var notesArray = JSON.parse(storedNotes);
        count = notesArray.length;

        var i;
        for (i = 0; i < count; i++) {
            var storedNote = notesArray[i];
            addNewNote(storedNote.Class, storedNote.Title, storedNote.Content);
        }
    }
}

function addNewNote(className, title, content) {

    notes.append("<li><div class='col-md-3 portfolio-item img'>" +
                    "<input class='note-title' placeholder='Untitled'/>" +
                    "<i class='fa fa-trash-o hidden'></i>" +
                    "<textarea class='note-content' placeholder='Your content here'/>" +
                "</div></li>");

    var newNote = notes.find("li:last");
    newNote.find("i").click(function () {
        newNote.remove();
        saveNotes();
    });

    addNoteEvent(newNote);


    if (title) {
        newNote.find("input.note-title").val(title);
    }
    if (content) {
        newNote.find("textarea.note-content").val(content);
    }
    saveNotes();
}




