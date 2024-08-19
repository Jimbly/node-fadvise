#ifndef _WIN32
#include <fcntl.h>
#include <unistd.h>
#endif

#include <napi.h>

#include <string>

using namespace Napi;

Value posix_fadvise(const CallbackInfo &info) {
  Env env = info.Env();

  if (info.Length() != 4) {
    TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }

  Number args[4];
  for (int ii = 0; ii<4; ++ii) {
    if (!info[ii].IsNumber()) {
      TypeError::New(env, "Argument must be a number").ThrowAsJavaScriptException();
      return env.Null();
    }
    args[ii] = info[ii].As<Number>();
  }

  int ret = 0;

  #ifndef _WIN32
  int fd = args[0].Int32Value();
  off_t start = args[1].Int64Value();
  off_t length = args[2].Int64Value();
  int advice = args[3].Int32Value();
  ret = posix_fadvise(fd, start, length, advice);
  #endif

  return Number::New(env, (double)ret);
}

Object Init(Env env, Object exports) {
  exports.Set(String::New(env, "posix_fadvise"), Function::New<posix_fadvise>(env));
  return exports;
}

NODE_API_MODULE(addon, Init)