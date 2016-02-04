var moment = require('moment');

module.exports.jobInterval = 60000;
module.exports.taskInterval = 5000;

var execute = function (fn, callback) {
  if (!fn) {
    console.error('Function not specified.');
    return;
  }

  try {
    var result = fn();
    if (callback) {
      callback(null, result);
    }
  } catch (e) {
    if (callback) {
      callback(e, null);
    }
  }
};

module.exports.runJob = function (fn, callback) {
  // Run now
  console.log("** Running job **", moment().format('MMMM Do YYYY, h:mm:ss a'));
  execute(fn, callback);

  //Run later, forever, at interval specified by jobInterval
  var timer = setInterval(function () {
    console.log("** Running job **", moment().format('MMMM Do YYYY, h:mm:ss a'));
    execute(fn, callback);
  }, module.exports.jobInterval);
};

module.exports.runTask = function (fn, callback) {
  console.log("\t>> Running task **", moment().format('MMMM Do YYYY, h:mm:ss a'));
  execute(fn, function (error, result) {
    callback(error, result);
  });
};


module.exports.runAll = function (tasks, callback) {
  if (!tasks || tasks.length === 0) {
    if (callback) {
      callback('No tasks specified');
    }
    return;
  }

  var i = 0;
  var n = tasks.length;

  var next = function () {
    var timer = setTimeout(function () {
      module.exports.runTask(tasks[i], endTaskCallback);
    }, module.exports.taskInterval);
  };

  var endTaskCallback = function (error, result) {
    i++;
    if (i < n) {
      next();
    } else if (callback) {
      callback();
    }
  };

  module.exports.runTask(tasks[i], endTaskCallback);
};
