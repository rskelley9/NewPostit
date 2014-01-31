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

  $(document).click(function(e) {
    //if there click target isn't a post-it, nor the span.close area then initialize postit
    if ((($(e.target).hasClass("post-it")) === false) && (($(e.target).hasClass("header")) === false) && (($(e.target).hasClass("content")) === false) && (($(e.target).hasClass("close")) === false)){

      id = increment.value


      $("#board").append("<div id='" + id + "' class='post-it'>");

      $("#"+id).draggable({scroll: true, scrollSensitivity: 20, scrollSpeed: 20});

      $("#"+id).html("<div class='header'><span class='close'>[X]</span></div>")

      $("#"+id).append("<div class='content' contenteditable='true'>")

      changePostItPos(id,e.clientX,e.clientY)

      actions = ["clip","blind","bounce","explode","highlight", "shake", "scale", "pulsate", "slide", "size", "fold", "puff"]

      showPostIt(id,actions)

      increment.count()
    }
    else if ($(e.target).hasClass("close") === true) {
      $(e.target).parent().parent().remove()
    }
    else {
      console.log(e.target)
      $(e.target).focus()
    }
  })

}

$(document).ready(function(){
  initialize()
})
