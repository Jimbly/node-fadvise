const fadvise = require('./');
const fs = require('fs');

let fd = fs.openSync('./test.tmp', 'a');
let buf = Buffer.alloc(1024);
for (let ii = 0; ii < 1024; ++ii) {
  fs.writeSync(fd, buf);
}
fs.fsync(fd, function () {
  fadvise.posix_fadvise(fd, 0, 0, fadvise.POSIX_FADV_DONTNEED);
  fs.closeSync(fd);
  console.log('Done.  `nocache/cachestats test.tmp` should indicate 0 pages in buffers/cache');
});
