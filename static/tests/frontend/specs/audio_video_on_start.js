'use strict';

const {cartesian} = require('ep_webrtc/static/tests/frontend/utils');

describe('audio/video on/off according to query parameters/cookies', function () {
  const testCases = cartesian(['audio', 'video'], [null, false, true], [null, false, true]);

  for (const [avType, cookieVal, queryVal] of testCases) {
    it(`${avType} cookie=${cookieVal} query=${queryVal}`, async function () {
      this.timeout(60000);
      await helper.aNewPad({
        padPrefs: Object.assign({
          rtcEnabled: true,
        }, cookieVal == null ? {} : {[`${avType}EnabledOnStart`]: cookieVal}),
        params: queryVal == null ? {} : {[`webrtc${avType}enabled`]: queryVal},
      });
      const chrome$ = helper.padChrome$;
      await helper.waitForPromise(() => chrome$('#rtcbox').data('initialized'), 5000);
      const {disabled} = chrome$.window.clientVars.webrtc[avType];
      const checkbox = chrome$(`#options-${avType}enabledonstart`);
      if (disabled === 'hard') {
        expect(checkbox.length).to.equal(0); // There shouldn't even be a checkbox.
      } else {
        const wantChecked = (queryVal || (queryVal == null && cookieVal) ||
                             (queryVal == null && cookieVal == null && disabled === 'none'));
        expect(checkbox.prop('checked')).to.equal(wantChecked);
      }
    });
  }
});
