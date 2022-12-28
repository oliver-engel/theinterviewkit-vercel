    var canvas = document.getElementById('canvas');


    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;

    console.log("initial width: " + w );

    // var width = element.clientWidth;

    // var w = window.innerWidth;
    // var h = window.innerHeight;

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;

    // provide concave decomposition support library
    // Common.setDecomp(require('poly-decomp'));

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: canvas,
        engine: engine,
        options: {
            width: w,
            height: h,
            wireframes: false,
             pixelRatio: 'auto'
        }
    });

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    //Loading SVGs + sprites

    var loadAssets = ['button1, phone1'];

    let assetScale = .7;

    var bodies = [];


    // add bodies
    if (typeof fetch !== 'undefined') {
        var select = function(root, selector) {
            return Array.prototype.slice.call(root.querySelectorAll(selector));
        };

        var loadSvg = function(url) {
            return fetch(url)
                .then(function(response) { return response.text(); })
                .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
        };

        ([
          // './assets/img/icons/chat.svg',

          './assets/img/icons/chapter.svg',

            './assets/img/icons/figma.svg',

            './assets/img/icons/portfolio.svg',
            './assets/img/icons/submitted.svg',
            './assets/img/icons/chat.svg',
            './assets/img/icons/casestudy.svg',
            './assets/img/icons/cruise.svg',
            './assets/img/icons/price.svg',
            './assets/img/icons/casestudydetails.svg'



        ]).forEach(function(path, i) {
            loadSvg(path).then(function(root) {
                var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

                var vertexSets = select(root, 'path')
                    .map(function(path) {
                      //args: fidelity, size, size
                      return Vertices.scale(Svg.pathToVertices(path, 20), assetScale, assetScale);
                    });

                //this section uses regex to pull the corresponding sprite file to match the loaded SVG.
                var regex = /[^\/]+(?=\.[^.]+$)/;
                var result = path.match(regex);
                console.log("here it is! " + result);

                var sprite = Bodies.fromVertices(getRandomArbitrary(0, w), getRandomArbitrary(-h, 0), vertexSets, {
                  restitution: .7,
                  friction: 0.1,
                    render: {
                        fillStyle: color,
                        strokeStyle: color,
                        lineWidth: 1,
                        sprite: {
                          texture: './assets/img/icons/' + result + '.png',
                          xScale: assetScale,
                          yScale: assetScale
                        }

                    }
                });

                engine.timing.timeScale = 0.8;

                // Matter.Body.setInertia(sprite, Infinity);

                bodies[i] = sprite;



                Composite.add(world, sprite, true);
            });
        });


    } else {
        Common.warn('Fetch is not available. Could not load SVG.');
    }







    var boundaryParams = {
      isStatic: true,
        render: {
          visible: false
        }
    }

    // create two walls and a ground
    var ground = Bodies.rectangle(w , h + 30  , w * 5, 60, boundaryParams);
    var wallLeft = Bodies.rectangle(-30, h, 60, h * 20, boundaryParams);
    var wallRight = Bodies.rectangle(w + 30, h / 2, 60, h * 20, boundaryParams);

    Composite.add(world, [ground, wallLeft, wallRight]);

    //
    // var resizedCanvas = document.querySelector('canvas');
    //
    //
    // window.addEventListener('resize', function () {
    //
    //   w = canvas.offsetWidth;
    //   h = canvas.offsetHeight;
    //
    //
    //
    //   document.querySelector('canvas').setAttribute("height", h);
    //   document.querySelector('canvas').setAttribute("width", w);
    //
    //     // document.querySelector("canvas").setAttribute("height", newH);
    //     // document.querySelector("canvas").setAttribute("width", newW);
    //
    //     // Matter.Body.setPosition(ground, {x: w, y: h + 30})
    //     // Matter.Body.setPosition(wallRight, {x: w + 30, y: h / 2})
    //     console.log("canvas width: " + resizedCanvas.offsetWidth);
    //
    //     console.log("new width: " + w);
    // });




    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);
          mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
          mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);


    // keep the mouse in sync with rendering
    render.mouse = mouse;



    Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
       //For Matter.Query.point pass "array of bodies" and "mouse position"
       var foundPhysics = Matter.Query.point(bodies, event.mouse.position);


      //Your custom code here
      console.log(foundPhysics[0]); //returns a shape corrisponding to the mouse position

      // foundPhysics[0].

      // foundPhysics[0].render.strokeStyle();



      if (foundPhysics[0]!=undefined && !foundPhysics[0].isStatic) {




                var forceMagnitude = 0.002 * foundPhysics[0].mass;

                Matter.Body.applyForce(foundPhysics[0], foundPhysics[0].position, {
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
            }



    });

    // Render.lookAt(render, sprite);


    // fit the render viewport to the scene
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    // });
