describe('test that webrtc, audio and video are on or off on start according to urlVars and cookies', function() {
  context('webrtc off via cookies', function() {
    before(function(done) {
      this.timeout(60000);
      helper.newPad({
        padPrefs: {
          rtcEnabled: false,
          fakeWebrtcFirefox: true,
          audioEnabledOnStart: true,
          videoEnabledOnStart: true,
        },
        cb: function () {
          var chrome$
          chrome$ = helper.padChrome$;
          helper.waitFor(function() {
            chrome$ = helper.padChrome$;
            return chrome$ && chrome$("#rtcbox").length === 1;
          }, 1000).done(function() {
            setTimeout(done, 1000)
          })
        }
      });
    });

    it('has the expected checkbox values with and without urlVars', function(done) {
      chrome$ = helper.padChrome$;
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(false)

      // overriding with url params
      chrome$.window.ep_webrtc.setUrlParamString("?webrtcenabled=true")
      chrome$.window.ep_webrtc.setupCheckboxes()
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(true)

      done()
    });

  });

  context('webrtc on, audio on, video off via cookies', function() {
    before(function(done) {
      this.timeout(60000);
      helper.newPad({
        padPrefs: {
          rtcEnabled: true,
          fakeWebrtcFirefox: true,
          audioEnabledOnStart: true,
          videoEnabledOnStart: false,
        },
        cb: function () {
          var chrome$
          chrome$ = helper.padChrome$;
          helper.waitFor(function(){
            chrome$ = helper.padChrome$;
            return chrome$ && chrome$("#rtcbox video").length === 1;
          }, 1000).done(done)
        }
      });
    });

    it('has the expected checkbox values with and without urlVars', function(done) {
      chrome$ = helper.padChrome$;
      expect(chrome$('#options-audioenabledonstart').prop("checked")).to.equal(true)
      expect(chrome$('#options-videoenabledonstart').prop("checked")).to.equal(false)
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(true)

      // overriding with url params
      chrome$.window.ep_webrtc.setUrlParamString("?webrtcaudioenabled=false&webrtcvideoenabled=true")
      chrome$.window.ep_webrtc.setupCheckboxes()
      expect(chrome$('#options-audioenabledonstart').prop("checked")).to.equal(false)
      expect(chrome$('#options-videoenabledonstart').prop("checked")).to.equal(true)
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(true)

      done()
    });
  });

  context('webrtc on, audio off, video on via cookies, no url params', function() {
    before(function(done) {
      this.timeout(60000);
      helper.newPad({
        padPrefs: {
          rtcEnabled: true,
          fakeWebrtcFirefox: true,
          audioEnabledOnStart: false,
          videoEnabledOnStart: true,
        },
        cb: function () {
          var chrome$
          chrome$ = helper.padChrome$;
          helper.waitFor(function(){
            chrome$ = helper.padChrome$;
            return chrome$ && chrome$("#rtcbox video").length === 1;
          }, 1000).done(done)
        }
      });
    });

    it('has the expected checkbox values with and without urlVars', function(done) {
      chrome$ = helper.padChrome$;
      expect(chrome$('#options-audioenabledonstart').prop("checked")).to.equal(false)
      expect(chrome$('#options-videoenabledonstart').prop("checked")).to.equal(true)
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(true)

      // overriding with url params
      chrome$.window.ep_webrtc.setUrlParamString("?webrtcaudioenabled=true&webrtcvideoenabled=false")
      chrome$.window.ep_webrtc.setupCheckboxes()
      expect(chrome$('#options-audioenabledonstart').prop("checked")).to.equal(true)
      expect(chrome$('#options-videoenabledonstart').prop("checked")).to.equal(false)
      expect(chrome$('#options-enablertc').prop("checked")).to.equal(true)

      done()
    });
  });
});
