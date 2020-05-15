/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Web-Centric component for A-Frame.
 */
AFRAME.registerComponent('webcentric', {
    camerarig: {type: "selector", default: "#camerarig"},

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        let _this = this;
        this._hasStats = false;
        let scene = this.el.sceneEl;

        if (scene.hasLoaded) {
            run();
        } else {
            scene.addEventListener('loaded', run);
        }

        function run () {
            console.log(scene.hasAttribute('stats'))
            if (scene.hasAttribute('stats')) {
                _this._hasStats = true;
                _this._curPosition = new THREE.Vector3();
                _this._curRotation = new THREE.Vector3();
                _this._lastPosition = new THREE.Vector3();
                _this._lastRotation = new THREE.Vector3();
                // this._statsPanel = document.querySelector
            }
        }


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
        let cameraRotString = null;
        let cameraPosString = null;
        if (window.location.search) {
            console.log(window.location.search)
            let params = new URLSearchParams(window.location.search);
            if (params.get("cameraRot")) {
                cameraRotString = params.get("cameraRot");
            }
            if (params.get("cameraPos")) {
                cameraPosString = params.get("cameraPos");
            }
        }
        console.log(cameraPosString, cameraRotString)
        if (!cameraRotString || !cameraPosString) {
            if (window.location.hash) {
                console.log(window.location.hash)
                let params = new URLSearchParams(window.location.hash.substring(1));
                if (params.get("cameraRot")) {
                    cameraRotString = params.get("cameraRot");
                }
                if (params.get("cameraPos")) {
                    cameraPosString = params.get("cameraPos");
                }
            }
        }

        if (cameraPosString) {
            //let cameraPos = cameraPosString.split(",").map(v => parseFloat(v));
            let cameraPos = cameraPosString.replace(/,/g, " ");
            console.log(cameraPos);
            cameraRig.setAttribute("position", cameraPos);
        }

        if (cameraRotString) {
            //let cameraPos = cameraPosString.split(",").map(v => parseFloat(v));
            let cameraRot = cameraRotString.replace(/,/g, " ");
            console.log(cameraRot);
            cameraRig.setAttribute("rotation", cameraRot);
        }
       /* if (params) {
            var hash = params.substr(1);
            let split = hash.split("&");
            if (split.length > 1) {
              var result = hash.split("&").reduce(function (result, item) {
                var parts = item.split("=");
                result[parts[0]] = parts[1].replace(/,/g, " ");
                return result;
              }, {});
              console.log(result);
              cameraRig.setAttribute("rotation", result.cameraRot);
              cameraRig.setAttribute("position", result.cameraPos);
            }

*/

        window.addEventListener('popstate', function (event) {
            // Log the state data to the console
            console.log(event);

            if (window.location.hash) {
                console.log(window.location.hash)
                let params = new URLSearchParams(window.location.hash.substring(1));
                if (params.get("cameraRot")) {
                    cameraRotString = params.get("cameraRot");
                }
                if (params.get("cameraPos")) {
                    cameraPosString = params.get("cameraPos");
                }
            }
            let cam = document.querySelector("[camera]");
            cam.setAttribute("position", `0 ${cam.object3D.position.y} 0`)
            //cam.object3D.position = new THREE.Vector3(0, cam.object3D.position.y, 0)
            if (cameraPosString) {
                //let cameraPos = cameraPosString.split(",").map(v => parseFloat(v));
                let cameraPos = cameraPosString.replace(/,/g, " ");
                console.log(cameraPos);
                cameraRig.setAttribute("position", cameraPos);
            }

            if (cameraRotString) {
                //let cameraPos = cameraPosString.split(",").map(v => parseFloat(v));
                let cameraRot = cameraRotString.replace(/,/g, " ");
                console.log(cameraRot);
                cameraRig.setAttribute("rotation", cameraRot);

                cam.components['look-controls'].pitchObject.rotation.x = 0;
                cam.components['look-controls'].yawObject.rotation.y = 0;
            }


        });
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) {
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function () {
    },

    /**
     * Called on each scene tick.
     */
    tick: function (t) {
        if (this._hasStats) {
            if(!this._statsPanel) {
                this._statsPanel = document.querySelector(".rs-base");
                let statsPanelContainer = this._statsPanel.querySelector(".rs-container");

                let title = document.createElement("h1")
                title.innerText = "Camera (World)";
                statsPanelContainer.appendChild(title);

                let container = document.createElement("div");
                container.classList.add("rs-group");
                let counterBasePosition = document.createElement("div");
                counterBasePosition.classList.add("rs-counter-base");
                counterBasePosition.innerHTML = '<span class="rs-counter-id">Position</span>';
                this._containerPosition = document.createElement("div");
                this._containerPosition.classList.add("rs-counter-value");
                this._containerPosition.style = "width: 200px";
                counterBasePosition.appendChild(this._containerPosition);
                container.appendChild(counterBasePosition);


                let counterBaseRotation = document.createElement("div");
                counterBaseRotation.classList.add("rs-counter-base");
                counterBaseRotation.innerHTML = '<span class="rs-counter-id">Rotation</span>';
                this._containerRotation = document.createElement("div");
                this._containerRotation.classList.add("rs-counter-value");
                this._containerRotation.style = "width: 200px";
                counterBaseRotation.appendChild(this._containerRotation);
                container.appendChild(counterBaseRotation);

                statsPanelContainer.appendChild(container);
                console.log(this._statsPanel)
            }

            let cam = this.el.sceneEl.querySelector("[camera]");


            // Round values to allow copy in the stats panel
            this._curPosition.copy(cam.object3D.getWorldPosition(this._curPosition));
            this._curPosition.x = this._curPosition.x.toFixed(3);
            this._curPosition.y = this._curPosition.y.toFixed(3);
            this._curPosition.z = this._curPosition.z.toFixed(3);


            let quaternion = new THREE.Quaternion();
            cam.object3D.getWorldQuaternion(quaternion);
            let euler = new THREE.Euler();
            euler.setFromQuaternion(quaternion, "XZY");

            this._curRotation.copy(euler);
            this._curRotation.x = THREE.Math.radToDeg(this._curRotation.x).toFixed(3);
            this._curRotation.y = THREE.Math.radToDeg(this._curRotation.y).toFixed(3);
            this._curRotation.z = THREE.Math.radToDeg(this._curRotation.z).toFixed(3);

            //console.log(this._curRotation);
            //console.log(this._lastRotation);

            if (!this._curPosition.equals(this._lastPosition)) {
                this._containerPosition.innerText = `${this._curPosition.x} ${this._curPosition.y}  ${this._curPosition.z}`
                this._lastPosition.copy(this._curPosition);
            }

            if (!this._curRotation.equals(this._lastRotation)) {
                this._containerRotation.innerText = `${this._curRotation.x} ${this._curRotation.y}  ${this._curRotation.z}`
                this._lastRotation.copy(this._curRotation);
            }


        }
        //console.log("tick")
    },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause: function () {
    },

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play: function () {
    },

    /**
     * Event handlers that automatically get attached or detached based on scene state.
     */
    events: {
        // click: function (evt) { }
    }
});
