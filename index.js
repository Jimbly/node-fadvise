/* eslint max-len:off, no-empty-function:off, global-require:off */

try {
  module.exports = require('bindings')('fadvise.node');
} catch (e) {
  module.exports = {
    posix_fadvise: function (fd, offset, length, advice) {},
  };
}

/**
 * POSIX_FADV_NORMAL
 * Indicates that the application has no advice to give about
 * its access pattern for the specified data.  If no advice
 * is given for an open file, this is the default assumption.
 */
module.exports.POSIX_FADV_NORMAL = 0; /* No further special treatment.  */
/**
 * POSIX_FADV_RANDOM
 * The specified data will be accessed in random order.
 */
module.exports.POSIX_FADV_RANDOM = 1; /* Expect random page references.  */
/**
 * POSIX_FADV_SEQUENTIAL
 * The application expects to access the specified data
 * sequentially (with lower offsets read before higher ones).
 */
module.exports.POSIX_FADV_SEQUENTIAL = 2; /* Expect sequential page references.         */
/**
 * POSIX_FADV_WILLNEED
 * The specified data will be accessed in the near future.
 *
 * POSIX_FADV_WILLNEED initiates a nonblocking read of the
 * specified region into the page cache.  The amount of data
 * read may be decreased by the kernel depending on virtual
 * memory load.  (A few megabytes will usually be fully
 * satisfied, and more is rarely useful.)
 */
module.exports.POSIX_FADV_WILLNEED = 3; /* Will need these pages.  */
/**
 * POSIX_FADV_DONTNEED
 * The specified data will not be accessed in the near
 * future.
 *
 * POSIX_FADV_DONTNEED attempts to free cached pages
 * associated with the specified region.  This is useful, for
 * example, while streaming large files.  A program may
 * periodically request the kernel to free cached data that
 * has already been used, so that more useful cached pages
 * are not discarded instead.
 *
 * Requests to discard partial pages are ignored.  It is
 * preferable to preserve needed data than discard unneeded
 * data.  If the application requires that data be considered
 * for discarding, then offset and len must be page-aligned.
 *
 * The implementation may attempt to write back dirty pages
 * in the specified region, but this is not guaranteed.  Any
 * unwritten dirty pages will not be freed.  If the
 * application wishes to ensure that dirty pages will be
 * released, it should call fsync(2) or fdatasync(2) first.
 */
module.exports.POSIX_FADV_DONTNEED = 4; /* Don't need these pages.  */
/**
 * The specified data will be accessed only once.
 *
 * Before Linux 2.6.18, POSIX_FADV_NOREUSE had the same
 * semantics as POSIX_FADV_WILLNEED.  This was probably a
 * bug; since Linux 2.6.18, this flag is a no-op.
 */
module.exports.POSIX_FADV_NOREUSE = 5; /* Data will be accessed once.  */
