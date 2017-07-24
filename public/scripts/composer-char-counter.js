$(document).ready(function () {
  const maxLength = 140;
  $(".new-tweet > form > textarea").on("keyup", function () {
    const counter = $(".new-tweet > form > textarea").siblings(".counter");
    const txtLength = $(this).val().length;
    const txtCurrentLimit = maxLength - txtLength;
    $('.counter').text(txtCurrentLimit);
    if (txtCurrentLimit < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});