$(document).ready(function(){
  $('#pen-font').on('click', function(){

    if($('.content').hasClass('marker'))
    {
    $('.content').removeClass('marker').addClass('pen')
    }
    else if ($('.content').hasClass('pen'))
    {
      $('.content').removeClass('pen').addClass('ink')
    }
    else if ($('.content').hasClass('ink'))
    {
      $('.content').removeClass('ink')
    }
    else
    {
      $('.content').addClass('marker')
    }
  });

var noteColors = ['#f1e09c', '#F1900C', '#39F10C', '#3ce3f5'],
counter = 0

var colors = ['#0a0a0a', '#ef2404', '#2103a9', '#2e9503', '#ff0069', '#4c4c4c', '#0aff3e'],
counter = 0

  $('#pen-color').on('click', function(){
        counter = (counter + 1) % colors.length;
    $('.content').css({"color": colors[counter]})
  });
});
