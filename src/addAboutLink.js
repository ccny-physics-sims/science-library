function addQmark(corner){
  push();
  fill(0);
  noStroke();
  link = createA('https://ccny-physics-sims.github.io/simdocs/'+nicename,'?');
  link.parent('sketch-holder');
  link.style('text-decoration:none;');
  link.style('font-size:18pt;');
  link.style('color: #aaa;');

  if (corner = 'top-left'){
  link.position(20,20)
  }
  if (corner = 'bottom-left'){
  link.position(20,height-0);
  }
}
