import assert from 'assert';
import macOSDefaultsSetup from '../dist'
// import stripJsonComments from 'strip-json-comments';


describe('macos-defaults-setup', function () {

  it('need some tests ', function () {

    // let Twitterstring = macOSDefaultsSetup.readFileSync('./test-files/com.twitter.twitter-mac.with.comments.json')
    // let twitterstringNoComments = stripJsonComments(Twitterstring);
    let twitterObj  = macOSDefaultsSetup.parseJsonLikeFileSync('../test-files/com.twitter.twitter-mac.with.comments.json')

    assert(twitterObj !== null, 'is-null')
  });
});
