const fadvise = require('./');
const fs = require('fs');

let fd = fs.openSync('./test.tmp', 'a');
fs.writeSync(fd, 'test');
fs.fsync(fd, function () {
  fadvise.posix_fadvise(fd, 0, 0, fadvise.POSIX_FADV_DONTNEED);
  fs.closeSync(fd);
  console.log('Done.');
});
