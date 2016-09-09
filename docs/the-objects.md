# science-library


a library for science related js demos

Just include a link to the `science.js` file before you load your sketch:

  ```
  <script language="javascript" src="/lib/science.js"></script>
  ```
 * [Arrow](#arrow).
 * [Mover](#mover).
 * [Axes](#axes).
 * [Moving background](#moving-background).
 * [Free body Diagrams](#free-body-diagrams).


## Objects

### Arrow

The arrow gives a nice triangular tipped arrow useful for showing the direction and magnitude of a vector.

To declare an arrow use the following:
```javascript
var my_arrow = new Arrow(origin_,target_);

/*where both of the parameters are P5.js vector objects*/
```
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

##### Random Walks
[Random Walks](http://ccny-physics-sims.github.io/science-library/examples/random-walk/)

Add up 10 random displacements and what do you get? A random walk.

#### Usage

The following will create the object.
```
aVector = new Arrow(startPoint, endPoint);
```
To display it:
```
aVector.update();
aVector.display();
```


The statement asks for: `Arrow(origin_, target_)`

`origin_` and `target_` are [p5.Vector](http://p5js.org/reference/#/p5.Vector) objects

#### arrow properties:

`Arrow.color` sets the color of the arrow. (the defualt color is white)

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

##### A ball and some vectors

[ball and vector](http://ccny-physics-sims.github.io/science-library/examples/moving-ball-vector/)

Here, we combine a mover and the arrow object to show the position and velocity vectors associated with a moving ball.

#### Mover properties

`Mover(position, velocity, acceleration, mass, color)`

`Mover.position` is a p5.Vector that gives this position of the mover

`Mover.velocity` is a p5.Vector that gives this velocity of the mover

`Mover.acceleration` is a p5.Vector that gives this acceleration of the mover

`Mover.limit` is a number that give the maximum velocity.

`Mover.mass` the movers can have mass.

`Mover.tail` the movers can leave little dots as they go. Boolean. Default is `false`.

`Mover.color` set the color of the ball using the p5 color specifications.

### Axes

#### Usage

`drawAxes()` will create a simple cartesian coordinate frame

### Moving Background

Let's say you want to convey motion, without making an object move? Then use the moving-background object.

#### Examples

##### Linear Motion
[linear motion](http://ccny-physics-sims.github.io/science-library/examples/moving-background-cityStreet/)

A simple 1-d motion system. The object stays still, but motion is understood via the background.

##### 2d Motion
[2d motion](http://ccny-physics-sims.github.io/science-library/examples/moving-background-clouds/)

A 2d system. The green vector shows velocity; the purple vector shows acceleration.

#### Moving background properties

`movingBackground(whichKind,basePosition,velocity,acceleration);`

`whichKind` determines what the background is. Right now, there are two options: `'cityStreet'` or `'clouds'`. `cityStreet` is good for linear motion in x. `clouds` is more appropriate for an object moving in x and y.

`basePosition` is a p5.Vector that gives the center location of the backgroun.

`velocity` is a p5.Vector that indicates the initial velocity of the background.

`acceleration` is a p5.Vector that indicates the acceleration of the background, i.e. how the velocity changes. This of course, could change.

```
bg.update()
bg.display();
```

will update and draw the background


### Free body diagrams

*Note: this feature is still under major development*

Here's a simple example

[free body diagram](http://ccny-physics-sims.github.io/science-library/examples/free-body-diagram/)

`a_free_body_diagram = new FBD(position_, howManyForces_,showResultant_);`


Define the forces using arrays:

```
a_free_body_diagram.mag = [force1mag,force2mag,force3mag];
a_free_body_diagram.direction = [force1direction,force2direction,force2direction]
a_free_body_diagram.xoffsets = [0,0,0]
a_free_body_diagram.yoffsets = [0,0,0]
a_free_body_diagram.labels = ['force 1','force 2','force 3']
```

The offsets can be used for clarity if you have two or more forces on an object pointing in the same direction.

Update and display the fbd using:

```
a_free_body_diagram.update();
a_free_body_diagram.display();
```
