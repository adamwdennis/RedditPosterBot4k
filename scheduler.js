var moment = require('moment');

var currentJobId = 0;
var currentTaskId = 0;

var execute = function (id, fn, callback) {
  if (!fn) {
    console.error('Function not specified.');
    return;
  }

  try {
    var result = fn(id);
    if (callback) {
      callback(null, result);
    }
  } catch (e) {
    if (callback) {
      callback(e, null);
    }
  }
};

module.exports.runJob = function (fn, intervalMs, callback) {
  // Run now
  console.log('** Running job ' + currentJobId + ' **', moment().format('MMMM Do YYYY, h:mm:ss a'));
  execute(currentJobId++, fn, callback);

  //Run later, forever, at interval specified by jobInterval
  var timer = setInterval(function () {
    console.log('** Running job ' + currentJobId + ' **', moment().format('MMMM Do YYYY, h:mm:ss a'));
    execute(currentJobId++, fn, callback);
  }, intervalMs);
};

module.exports.runTask = function (jobId, fn, callback) {
  console.log('\t>> Running task ' + jobId + ':'+ currentTaskId +' **', moment().format('MMMM Do YYYY, h:mm:ss a'));
  execute(currentTaskId++, fn, function (error, result) {
    callback(error, result);
  });
};


module.exports.runAllTasks = function (jobId, tasks, delayMs, callback) {
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
      module.exports.runTask(jobId, tasks[i], endTaskCallback);
    }, delayMs);
  };

  var endTaskCallback = function (error, result) {
    i++;
    if (i < n) {
      next();
    } else if (callback) {
      callback();
    }
  };

  module.exports.runTask(jobId, tasks[i], endTaskCallback);
};
