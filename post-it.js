// var Board = function( selector ) {
//   // Your board related code goes here

//   // Use $elem to access the DOM element for this board
//   var $elem = $( selector );

//   function initialize() {
//     // What needs to happen when this object is created?
//   };

//   initialize();
// };

// var PostIt = function() {
//   // Your post-it related code goes here
// };


var getAction = function(actions) {
 return actions[Math.floor(Math.random() * actions.length)];
}

var changePostItPos = function(id,x,y) {
  $("#"+id).css("top",y);
  $("#"+id).css("left",x);
};


var showPostIt = function(id,array) {
  randomAction = getAction(array)
  $("#"+id).show(randomAction)
}


var increment = {
  value: 0,
  count: function() {
    this.value = this.value + 1

  }

}

function initialize() {

  $(document).click(function(event) {
    //if there click target isn't a post-it, nor the span.close area then initialize postit
    if ((($(event.target).hasClass("post-it")) === false) && (($(event.target).hasClass("header")) === false) && (($(event.target).hasClass("content")) === false) && (($(event.target).hasClass("close")) === false)){

      id = increment.value

      newPostIt = "<div class='header'><span class='erase'>E</span><span class='close'>X</span></div>"

      $("#board").append("<div id='" + id + "' class='post-it'>");

      $("#"+id).draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

      $("#"+id).html(newPostIt)

      $("#"+id).append("<div class='content' contenteditable='true'>")

      changePostItPos(id,event.clientX,event.clientY)

      actions = ["clip","blind","bounce","explode","highlight", "shake", "scale", "pulsate", "slide", "size", "fold", "puff"]

      showPostIt(id,actions)

      increment.count()
    }
    else if ($(event.target).hasClass("close") === true) {
      // $(event.target).parent().parent().remove()
      $(event.target).parents(":eq(1)").fadeOut({duration:1000})
      $(event.target).parents(":eq(1)").fadeIn({duration:1000})
      //erase text with fadeOut on click
    }
    else {
      $(event.target).focus()
    }
  })

}

$(document).ready(function(){
  initialize()
})
