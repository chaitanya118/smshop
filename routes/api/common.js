/* common util functions */
exports.onError = function(err, callback) {
  console.error("UNEXPECTED ERROR " + err);
  console.error("STACK", err.stack);
  return callback(500, "UNEXPECTED INTERNAL ERROR");
}