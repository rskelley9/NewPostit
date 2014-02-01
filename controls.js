$(document).ready(function(){
  $('#controls').on('click', function(){

    if($('.content').hasClass('marker'))
    {
    $('.content').removeClass('marker').addClass('pen')
    }
    else if ($('.content').hasClass('pen'))
    {
      $('.content').removeClass('pen')
    }
    else
    {
      $('.content').addClass('marker')
    }
  });
});
