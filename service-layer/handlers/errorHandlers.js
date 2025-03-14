exports.catchErrors = fn =>
  function(req, res, next) {
    return fn(req, res, next).catch(next);
  };

/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously
  un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    "text/html": () => {
      res.render("error", errorDetails);
    }, // Form Submit, Reload the page
    "application/json": () => res.json(errorDetails) // Ajax call, send JSON back
  });
};

/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
};
