function create_keyboard(movies_found) {
  var keyboard = []
  for (i=0; i<movies_found.length; i++) {
      var movie = movies_found[i];
      var inline_button = [{
        "text": `${movie.size} ${movie.caption}`,
        "callback_data": `${movie.message_id}`
     }]
     keyboard.push(inline_button);
  }

  return keyboard;
}