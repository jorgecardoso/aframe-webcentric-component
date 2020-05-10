/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Web-Centric component for A-Frame.
 */
AFRAME.registerComponent('webcentric', {
  camerarig: { type: "selector", default: "#camerarig" },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    let cameraRig = this.data.camerarig;

    if (!cameraRig) {
      console.warn("No camera rig found. Trying to use camera parent");
      let camParent = document.querySelector("[camera]").parentElement;

      if (camParent === this.sceneEl) {
        console.warn("No camera parent found");
        return;
      } else {
        console.info("Found camera parent: ", camParent);
        cameraRig = camParent;
      }
    }
    console.log(window.location.hash);
    let params = window.location.hash;
    if (!params) {
      params = window.location.search;
    }
    if (params) {
      var hash = params.substr(1);

      var result = hash.split("&").reduce(function(result, item) {
        var parts = item.split("=");
        result[parts[0]] = parts[1].replace(/,/g, " ");
        return result;
      }, {});
      console.log(result);

      cameraRig.setAttribute("rotation", result.cameraRot);
      cameraRig.setAttribute("position", result.cameraPos);
    }
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },

  /**
   * Event handlers that automatically get attached or detached based on scene state.
   */
  events: {
    // click: function (evt) { }
  }
});
