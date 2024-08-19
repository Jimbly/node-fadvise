Native Node.js bindings for the `posix_fadvise()` function on Linux
============================

Usage:
```javascript
const fadvise = require('fadvise');
const fs = require('fs');

let fd = fs.openSync('./test.tmp', 'a');
fs.writeSync(fd, 'hundreds of megabytes');
fs.fsync(fd, function () {
  fadvise.posix_fadvise(fd, 0, 0, fadvise.POSIX_FADV_DONTNEED);
  fs.closeSync(fd);
});
```

In the example above, `top` and [nocache](https://github.com/Feh/nocache)'s `cachestats test.tmp` should indicate 0 (additional) pages in buffers/cache.

See [posix_fadvise(7)](https://man7.org/linux/man-pages/man2/posix_fadvise.2.html) for details.
