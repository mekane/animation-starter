# SEED FILL

An experiment to play around with filling areas by filling them starting with initial "seeds"

* Using a setTimeout interval timer to tightly control frame rate rather than maxing it with setAnimationFrame

* Plan to use a bitmap / raster fill on the canvas
  * Look into efficient JS 2D array for pixels + canvas fill

TODO: should be reasonable to import the "2D Array" style of view + data structure into the animation-starter framework
    so that this kind of project could be built within the framework.

* Ideal would be to have a standard data structure for the 2D array of pixels and pass that to the seedFill recursive functions.

* size a 2D array according to initial screen size
* Is there a specific data structure for bitmaps?
  * (resize array on screen resize?)
* canvas rendering context to push 2d array to canvas?

Seed the empty array with some random points (pseudo-logic to space them eveny), put them in the toIterate list
Run seed algorithm at the seeds (check surrounding pixels, color and add to toIterate list if empty)
On successive iterations start seed algorithm at points in the toIterate list
