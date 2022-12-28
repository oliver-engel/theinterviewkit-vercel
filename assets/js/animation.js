// // This work is modified based on Matter.js + p5.js Example from Daniel Shiffman
// // https://github.com/CodingTrain/p5-matter
//
// var Engine = Matter.Engine;
// var Render = Matter.Render;
// var World = Matter.World;
// var Bodies = Matter.Bodies;
// var Composite = Matter.Composite;
// var Composites = Matter.Composites;
//
// let colors = "008dd5-dfbbb1-f56476-e43f6f-F7A072".split("-").map(a=>"#"+a)
//
// var Mouse = Matter.Mouse;
// var MouseConstraint = Matter.MouseConstraint;
//
// var engine;
// var world;
// var bodies= [];
//
// var mouseConstraint;
// let overAllTexture
// function setup() {
//   canvas = createCanvas(800, 800);
// overAllTexture=createGraphics(width,height)
// 	overAllTexture.loadPixels()
// 	// noStroke()
// 	for(var i=0;i<width+50;i++){
// 		for(var o=0;o<height+50;o++){
// 			overAllTexture.set(i,o,color(100,noise(i/3,o/10,i*o/50)*random([0,30,60])))
// 		}
// 	}
// 	overAllTexture.updatePixels()
//
//   // Mouse positions don't align
//   // But it does work if I force pixel density of 1
//   // pixelDensity(1);
//   // Can I instead tell mouse to divide its xy by 2?
//
//   // create an engine
//   engine = Engine.create();
//   world = engine.world;
//
//   var mouse = Mouse.create(canvas.elt);
//   var mouseParams = {
//     mouse: mouse,
//     constraint: {
//       stiffness: 0.1,
//     }
//   }
//   mouseConstraint = MouseConstraint.create(engine, mouseParams);
//   mouseConstraint.mouse.pixelRatio = pixelDensity();
//   World.add(world, mouseConstraint);
//
//   var params = {
//     isStatic: true
//   }
//   var ground = Bodies.rectangle(width / 2, height, width, 50, params);
//   var wall1 = Bodies.rectangle(0, height / 2, 50, height, params);
//   var wall2 = Bodies.rectangle(width, height / 2, 50, height, params);
//   var top = Bodies.rectangle(width / 2, 0, width, 50, params);
//   World.add(world, [ground,wall1,wall2,top]);
//
//   function makeCircle(x, y,r ) {
//     var params = {
//       restitution: 0.7,
//       friction: 0.3
//     }
// 		let cir = Bodies.circle(x, y, random(10,90), params)
// 		cir.color = random(colors)
// 		cir.spots = []
// 		for(var i=0;i<10;i++){
// 			cir.spots.push({
// 				x: random(-0.8,0.8)*random(),
// 				y: random(-0.8,0.8)*random(),
// 				r: random(0,0.5)
// 			})
// 		}
//     return cir;
//   }
// 	for(var i=0;i<width;i+=150){
// 		for(var o=0;o<height;o+=60){
// 			let cir = makeCircle(i,o)
// 			World.add(world, cir);
// 			bodies.push(cir)
// 		}
// 	}
//
// 	drawingContext.shadowColor = color(0,30);
// 	drawingContext.shadowOffsetY = 2
// 	drawingContext.shadowOffsetX = 2
//
//   // run the engine
//   Engine.run(engine);
// }
//
// function draw() {
//   fill(20,20,80);
// 	rect(0,0,width,height)
// 	strokeWeight(3)
//   for (var i = 0; i < bodies.length; i++) {
//     var circle = bodies[i];
//     var pos = circle.position;
//     var r = circle.circleRadius;
//     var angle = circle.angle;
//
//
//     push();
// 			noStroke()
// 			translate(pos.x, pos.y);
// 			rotate(angle);
// 			scale(0.92)
// 			fill(circle.color)
// 		stroke(0,30)
//
// 			//body
// 			drawingContext.shadowOffsetY = 0
// 			drawingContext.shadowOffsetX = 0
// 			// ellipse(0, 0, r * 2);
// 			beginShape()
// 			let spanCount = int(r*2/20)*20
// 			for(var o=0;o<spanCount;o++){
// 				let useR =( o%4<2?r:r/1.5)+sin(o/spanCount*5+frameCount/10+i)*5
// 				let useAng = o/spanCount*PI*2 + (circle.active?frameCount/10:0)
// 				vertex( useR*cos(useAng), useR*sin(useAng))
//
// 			}
// 			endShape(CLOSE)
//
// 			noStroke()
// 			fill(255,40)
// 			// stroke(255,50)
// 			circle.spots.forEach(sp=>{
// 				ellipse(sp.x*r,sp.y*r,sp.r*r/2)
// 			})
//
//
// 			//mouth
//
// 			noFill()
// 			stroke(0)
// 			if (circle.active){
// 				let mR = (sin(o/spanCount*5+frameCount+i)+1)/2*r/3
// 				arc(0,r/3,mR,mR,0,PI*2)
// 			}else{
// 				let mR = (sin(o/spanCount*5+frameCount/3+i)+1)/2*r/3
// 				arc(0,r/3,r/3,r/3,PI,PI*2)
//
// 			}
//
//
// 			drawingContext.shadowOffsetY = 3
// 			drawingContext.shadowOffsetX = 3
// 			//eyes
// 			noStroke()
// 			scale( 1,(frameCount+i+o) %30<5?0.05:1)
//
// 			fill(255)
// 			arc(-r/3,-r/8,r/2,r/2,0,circle.active?2*PI:PI)
// 			arc(r/3,-r/8,r/2,r/2,0,circle.active?2*PI:PI)
//
// 			translate(sin(o/spanCount*5+frameCount/r+i)*r/10,0)
// 			fill(0)
// 			arc(-r/3,-r/8,r/4,r/4,0,circle.active?2*PI:PI)
// 			arc(r/3,-r/8,r/4,r/4,0,circle.active?2*PI:PI)
//
// 			// line(0, 0, r, 0);
//     pop();
// 		circle.active=false
//   }
//
//   var a = mouseConstraint.constraint.pointA;
//   var bodyB = mouseConstraint.constraint.bodyB;
//   if (bodyB) {
// 		cursor('grab');
//     strokeWeight(2);
//     stroke(255,20);
//     line(a.x, a.y, bodyB.position.x, bodyB.position.y);
// 		bodyB.active=true
//   }else{
// 		cursor('');
// 	}
// 	push()
// 		blendMode(MULTIPLY)
// 		image(overAllTexture,0,0)
// 	pop()
//
// }
