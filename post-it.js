
var getAction = function(effects) {
 return effects[Math.floor(Math.random() * effects.length)];
}

var showPostIt = function(id,array) {
  var randomAction = getAction(array)
  $("#"+id).show(randomAction)
  $("#"+id).resizable({
    animate: true,
    alsoResize: ".content",
    aspectRatio: 1 / 1
  });
}

var movePostIt = function(id,x,y) {
  $("#"+id).css("top",y);
  $("#"+id).css("left",x);
};

var count = {
  value: 0,
  plusOne: function() {
    ++this.value;
  }

}

function initialize() {

  $(document).click(function(event) {
    // if there click target isn't a post-it, nor the span.close area then initialize postit
    if (
     ($(event.target).hasClass("post-it")) === false) && 
     (($(event.target).hasClass("header")) === false) && 
     (($(event.target).hasClass("note-font")) === false) && 
     (($(event.target).hasClass("close")) === false) && 
     (($(event.target).hasClass("erase")) === false) && 
     ($(event.target).is('#controls') === false) && 
     ($(event.target).hasClass("content") === false) && 
     ($(event.target).is("palette") === false) && 
     ($(event.target).is("#pen-font") === false) && 
     ($(event.target).is("#pen-color") === false
    ) {

      id = count.value;

      newPostIt = "<div class='header'><span class='erase'>Erase</span><span class='note-font'>Font</span><span class='close'>X</span></div>";

      $("#board").append("<div id='" + id + "' class='post-it'>");

      $("#"+id).draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

      $("#"+id).html(newPostIt);

      $("#"+id).append("<div class='content' contenteditable='true'>");

      movePostIt(id,event.clientX,event.clientY);

      effects = [
         "clip",
         "blind",
         "bounce",
         "explode",
         "highlight", 
         "shake", 
         "scale", 
         "pulsate", 
         "slide", 
         "size", 
         "fold", 
         "puff"
      ];

      showPostIt(id, effects);

      count.plusOne();
    }
    else if ($(event.target).hasClass("close") === true) {
      $(event.target).parents(":eq(1)").fadeOut({duration:1100});
    }

    else if ($(event.target).hasClass("erase") === true) {
      $(event.target).parent().siblings().first().wrapInner( "<div class='fade'></div>" );
      $('.fade').fadeOut({duration:800});
    }
    else if ($(event.target).hasClass("note-font") === true) {
      var noteContent = $(event.target).parent().siblings().first()

      if (noteContent.hasClass('marker')) {
        noteContent.removeClass('marker').addClass('pen');
      }
      else if (noteContent.hasClass('pen')) {
        noteContent.removeClass('pen').addClass('ink');
      }
      else if (noteContent.hasClass('ink')) {
        noteContent.removeClass('ink').addClass('hand-write');
      }
      else if (noteContent.hasClass('hand-write')) {
        noteContent.removeClass('hand-write');
      }
      else {
        noteContent.addClass('marker');
      }
    }
    else {
      $(event.target).focus();
    }
  })

}

$(document).ready(function(){
  initialize();
})

