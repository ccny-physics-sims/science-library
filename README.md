# science-library

a library for science related js demos

Just include a link to the `science.js` file before you load your sketch:

  ```
  <script language="javascript" src="/lib/science.js"></script>
  ```


## Objects

### Arrow

The arrow gives a nice triangular tipped arrow useful for showing the direction and magnitude of a vector.

#### Examples:

##### A simple Vector
[simple-vector](http://ccny-physics-sims.github.io/science-library/examples/simple-vector/)

This example shows a vector that can be dragged and grabbed. (i.e. translated and modified in dir/magnitude)

##### A rotating Vector
[rotating-vector](http://ccny-physics-sims.github.io/science-library/examples/rotating-vector/)

Here's a vector that rotates at some speed.

##### Another rotating Vector
[rotating-vector-2](http://ccny-physics-sims.github.io/science-library/examples/rotating-vector-2/)

Here's a vector that rotates at some speed, and always points towards the center.

##### Vector Addition
[Vector Addition ](http://ccny-physics-sims.github.io/science-library/examples/vector-addition/)

This example shows the sum of two vectors graphically.

`Arrow(origin_, target_)`

`origin_` and `target_` are [p5.Vector](http://p5js.org/reference/#/p5.Vector) objects

#### arrow properties:

`Arrow.color` sets the color of the arrow.

for example:

`Arrow.color = color(20,20,230);` will give you a nice blue vector. Or, you could just write `Arrow.color = color('blue')` and p5 will make translate that to RGB values.

`Arrow.width` give the thickness of the arrow shaft. Default is 20px.

`Arrow.showComponents` is a boolean that indicates whether the x/y components should be shown. Default is `false`.

`Arrow.draggable` is a boolean that indicates whether the arrow should be draggable by the user or not. Default is `true`.

`Arrow.grab` is a boolean that indicates whether the user can grab the tip and change the direction/magnitude of the arrow. Default is `true`.

### Mover

The mover object makes a little ball that moves around.

#### Examples

##### Very simple moving ball

[a moving ball](http://ccny-physics-sims.github.io/science-library/examples/moving-ball/)

Just a regular ol' moving ball. It's red! And it bounces when it hits the wall.

##### Many moving balls

[a bunch of moving balls](http://ccny-physics-sims.github.io/science-library/examples/moving-balls/)

This example uses an array to create many moving balls, each with their own properties (e.g. velocity)

#### Mover properties

`Mover(position, velocity, acceleration, mass, color)`

`Mover.position` is a p5.Vector that gives this position of the mover

`Mover.velocity` is a p5.Vector that gives this velocity of the mover

`Mover.acceleration` is a p5.Vector that gives this acceleration of the mover

`Mover.limit` is a number that give the maximum velocity.

`Mover.mass` the movers can have mass.

`Mover.tail` the movers can leave little dots as they go. Boolean. Default is `false`.

`Mover.color` set the color of the ball using the p5 color specifications.
