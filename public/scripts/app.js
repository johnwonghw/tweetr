$(document).ready(function () {

  function createTweetElement(data) {
    const createdTime = moment(data.created_at);

// security measures that turns all input text into a string  
    function escape(str) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = `

                <article class="tweet">
                  <header>
                    <img class="userlogo" src=${data.user.avatars.small}>
                    <h3>${escape(data.user.name)}</h3>
                    <span class="shortUsername">${escape(data.user.handle)}</span>
                  </header>
                  <article class="tweetMessage">${escape(data.content.text)}
                  </article>
                  <footer>

                    <span id="createdTime">${(createdTime.fromNow())}</span>
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </footer>
                </article>
                `
    return $tweet;
  };

  function renderTweets(tweets) {
    $('tweets-container').children().remove();
    tweets.forEach(function (item) {
      $('#tweets-container').prepend(createTweetElement(item));
    })
  };

// ajax GET request to get tweets
  function loadTweets() {
    $.getJSON('/tweets')
      .done((tweets) => {
        renderTweets(tweets);
      })
  };

// Adds a limit to input text length. 
  function formValidation() {
    const text = $('.new-tweet > #tweetSubmit > textarea')
    if (!text.val().length) {
      alert('Enter message!')
      return false;
    };
    if (text.val().length > 140) {
      alert('Please shorten your message')
      return false;
    };
    return true;
  };

// prevents the site from refreshing after posting and turns the form into a string
  function createTweets() {
    event.preventDefault();
    if (formValidation()) {
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $form.serialize()
      })
      .done(() => {
        loadTweets()
      })
    }
  };

  const $form = $('#tweetSubmit');
  $form.on('submit', createTweets)
  loadTweets()


  $(".button").click(function () {
    $(".new-tweet").slideToggle("slow", function () {
    });
    $("#tweetTextArea").focus();
  });



});