const API_KEY = 'b065a777a55fa25fbfda216244ce72e9';

var genres = {};
$(() => {
  $.get('https://api.themoviedb.org/3/genre/movie/list', { api_key: API_KEY })
    .done((r) => {
      r.genres.forEach((genre) => {
        genres[genre.id] = genre.name;
      })
    })
    .fail((e) => {
      alert(e.status_message);
    })
});

$('#searchButton').click((e) => {
    // clear error message if exists
    // $('#error').text('');
  
    // disabled search button
    $('#searchButton')
      .empty()
      .attr('disabled', 'disabled')
      .append($('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'))
  
    // clear all previous result from the table
    $('#result').empty();
    console.log($('#title').val());
    // the data to be sent with the GET request
    const data = {
      api_key: API_KEY,
      query: $('#title').val(),
      include_adult: false
    };
  
    // send GET request
    $.get('https://api.themoviedb.org/3/search/movie', data)
      .done((r) => {
        if (r.results.length === 0) {
          // $('#error').text('!!! No movie with this title.')
        } else {
          r.results.forEach((movie) => {
            const tableCell = createCell(movie);
            $('#result').append(tableCell);
          })
        }
      })
    //   .fail((e) => {
    //     $('#error').text(`!!! ${e.status_message}`);
    //   })
      .always(() => {
        // re-enable the search button
        $('#searchButton')
        .empty()
        .removeAttr('disabled')
        .append("<i class='fa fa-search' aria-hidden='true'></i>");
      });
  })

  function createCell(movie) {
    var row = $("<div class='item d-flex' data-aos='fade-up'></div>");
    
  
    // poster
    const posterUrl = (movie.poster_path !== null) ? 
      `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
      'https://www.jakartaplayers.org/uploads/1/2/5/5/12551960/2297419_orig.jpg';
    const pic = $("<div class='pic'></div>")
    pic.append($(`<img src="${posterUrl}" height="200">`))
    row.append(pic);

    const movieInfo = $("<div class='p-2'></div>")
    row.append(movieInfo)

    const title = $('<h2 class="display-5"></h2>').text(movie.title);
    movieInfo.append(title);

    const overview = $('<p></p>').text(movie.overview);
    movieInfo.append(overview);

    const rating = $('<span class="badge badge-success p-2"></span>').text(`Rating: ${movie.vote_average}`);
    movieInfo.append(rating);
  
    // genres
    movie.genre_ids.forEach((id) => {
      const genre = $('<span class="badge badge-warning ml-2 p-2"></span>').text(genres[id]);
      movieInfo.append(genre);
    });

  
    // // movie information
    // const td = $('<td></td>');
    // row.append(td);
    
    // // title
    // const title = $('<h2 class="display-5"></h2>').text(movie.title);
    // td.append(title);
  
    // // overview
    // const overview = $('<p></p>').text(movie.overview);
    // td.append(overview);
  
    // // rating
    // const rating = $('<span class="badge badge-success p-2"></span>').text(`Rating: ${movie.vote_average}`);
    // td.append(rating);
  
    // // genres
    // movie.genre_ids.forEach((id) => {
    //   const genre = $('<span class="badge badge-warning ml-2 p-2"></span>').text(genres[id]);
    //   td.append(genre);
    // });
  
    return row;
  }