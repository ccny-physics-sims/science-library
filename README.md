# science-library

a p5 library for science related js demos

You can draw vectors, make balls move, make wheels spin etc.

Just include a link to the `science.js` file before you load your sketch:

```
<script language="javascript" src="/lib/science.js"></script>
```


View the documentation (in progress):

[science.js docs](ccny-physics.sims.gitub.io/science-library/docs/the-objects.md)

### Contributing

If you think you have a nice feature to add to `science.js`, then here are some tips on how to add it:

1. The library is built from several smaller js files contained in the `src` folder. For example, the arrows are made by code found in the `arrow.js` file.

2. These files get consolidated into one big file: `science.js`

3. This is done using *grunt*.
