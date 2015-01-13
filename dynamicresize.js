/**
 * Created by Ty on 1/12/2015.
 */
ig.module('plugins.dynamicresize').defines(function(){
    MixinDynamicResize = {
        upscale: true,
        resolution: {x: 240, y: 160},
        upscaleResolution: {x: 960, y: 640}, // The upscaled resolution
        upscaleThreshold: 0.004, // Target resolution Width divided by height
        forceResize: true,
		
		// Create event listener on global space
        init: function() {
            this.parent();
            ig.global.addEventListener('resize', this.resize.bind(this));
        },

        resize: function() {

            if ( !this.forceResize ) return;
            // Force game resize with no upscaling applied
            if ( !this.upscale ) {
                ig.system.resize( this.resolution.x, this.resolution.y, ig.system.scale );
                return;
            }

            // Upscale the draw area while keeping internal resolution the same
            if ( this.upscale ) {
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight,
                    // Determine scale value
                    scaleX = windowWidth / this.resolution.x,
                    scaleY = windowHeight / this.resolution.y,
                    currentRatio = windowWidth / windowHeight,
                    targetRatio = this.upscaleResolution.x / this.upscaleResolution.y,
                    optimalRatio = Math.min(scaleX, scaleY);

                // Upscale to target ratio
                if ( this.almostEqual( currentRatio, targetRatio, this.upscaleThreshold )) {
                    ig.system.canvas.style.width = this.upscaleResolution.x + "px";
                    ig.system.canvas.style.height = this.upscaleResolution.y + "px";
                }
                // Current resolution ratio does not support target ratio. Scale to optimal ratio
                else {
                    ig.system.canvas.style.width = ( this.resolution.x * optimalRatio ) + "px";
                    ig.system.canvas.style.height = ( this.resolution.y * optimalRatio ) + "px";
                }
            }
        },
		
		// Determine if the current window resolution is 'close-enough' to our target threshold
        almostEqual: function( a, b, threshold ) {
            if ( a === b ) return true;
            else {
                var d = b -a;
                return d > 0 ? d < threshold : d > -threshold;
            }
        }

    }
});

// Usage: MyGame.inject( MixinDynamicResize );