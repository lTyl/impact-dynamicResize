====================

## Summary ##

+ Name: Dynamic Canvas Resize
+ Written by: Tyler Deren
+ Current Version: V1.0.0
+ Release Date: Jan 13, 2014
+ Engine: ImpactJS

# What is it? #

This Impact Mixin provides dynamic canvas resize capability based on resolution threshold ratio (To limit blurring) and also handles canvas upscaling while maintaining internal canvas resolution.

# How it Works #
Using CSS to handle upscaling, thus will not work with most mobile wrappers for native applications (Such as CocoonJS), but will work with AppMobi or equivalent for building. We create an event handler which listens for the resize event signal and calls the resize function when fired. A maximum upscale threshold value can be configured to limit upscaling to only a certain range (To prevent too much blur, project specific based on asset size). Upscale threshold is targetWIDTH / targetHEIGHT

# Usage #
Include the 'plugins.dynamicresize' plugin in your main.js. After your class declaration closure, inject this mixin into your game class. Inject into all core game classes where you want resize capability. See included index.html file for additional fluff (Via CSS)

## License ##
Released under the WTFPL (http://www.wtfpl.net/)