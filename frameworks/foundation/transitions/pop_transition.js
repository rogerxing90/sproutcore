// ==========================================================================
// Project:   SproutCore
// Copyright: @2013 7x7 Software, Inc.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


SC.mixin(SC.View,
  /** @scope SC.View */ {

  /** @class

    @extends SC.TransitionProtocol
    @since Version 1.10
  */
  POP: {
    /** @private */
    setupIn: function (view, options, inPlace) {
      view.adjust({ scale: inPlace ? view.get('layout').scale || 0 : 0 });
    },

    /** @private */
    runIn: function (view, options, finalLayout, finalFrame) {
      var bigScale,
        duration,
        frames,
        poppiness = options.poppiness || 0.2,
        scale;

      scale = finalLayout.scale || 1;
      bigScale = scale * (poppiness + 1);

      duration = options.duration || 0.25;

      frames = [
        { value: { scale: bigScale }, duration: duration * 0.6, timing: 'ease-out' },
        { value: { scale: scale }, duration: duration * 0.4, timing: 'ease-in-out' }
      ];

      var callback = function () {
        view.didTransitionIn();
      };

      // Animate through the frames.
      view._animateFrames(frames, callback, options.delay || 0);
    },

    /** @private */
    runOut: function (view, options) {
      var bigScale,
        duration,
        frames,
        poppiness = options.poppiness || 0.15,
        scale;

      scale = view.get('layout').scale || 1;
      bigScale = scale * (poppiness + 1);

      duration = options.duration || 0.2;

      frames = [
        { value: { scale: bigScale }, duration: duration * 0.4, timing: 'ease-out' },
        { value: { scale: 0 }, duration: duration * 0.6, timing: 'ease-in-out' }
      ];

      var callback = function () {
        view.didTransitionOut();
      };

      // Animate through the frames.
      view._animateFrames(frames, callback, options.delay || 0);
    }
  }
});
