import assert from 'assert';
import path from 'path';
import macOSDefaultsSetup from '../lib'
// import stripJsonComments from 'strip-json-comments';


describe('macos-defaults-setup', function () {

  it('need some tests ', function () {

    let twitterObj = macOSDefaultsSetup.parseObjectFromArg(path.resolve('./test-files/com.twitter.twitter-mac.with.comments.json'), {})
    assert(twitterObj !== null, 'is-null')
  });
});
