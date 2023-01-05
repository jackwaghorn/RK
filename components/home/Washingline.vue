<template>
  <div id="parent"></div>
</template>

<script setup>
import Matter from "matter-js";



const washingLine = () => {
  // module aliases

  let width_ = document.getElementById("parent").offsetWidth;

  let height_ = document.getElementById("parent").offsetHeight;

  let engine = Matter.Engine.create();

  let runner = Matter.Runner.create();
  let render = Matter.Render.create({
    element: document.getElementById("parent"),
    engine: engine,
    options: {
      width: width_,
      height: height_,
      wireframes: false,
      background: "transparent",
      wireframeBackground: "transparent",
    },
  });

  // Re-size canvas
  let myCanvas = document.getElementById("parent").querySelector("canvas");
  let myContext = myCanvas.getContext("2d");

  // get current size of the canvas
  let rect = myCanvas.getBoundingClientRect();

  // increase the actual size of our canvas
  myCanvas.width = rect.width * 1.7;
  myCanvas.height = rect.height * 1.7;

  // ensure all drawing operations are scaled
  myContext.scale(1.7, 1.7);

  // scale everything down using CSS
  myCanvas.style.width = rect.width + "px";
  myCanvas.style.height = rect.height + "px";

  // Screensizes
  let large = width_ > 768 ? true : false;
  let small = width_ < 480 ? true : false;

  // Washing line height
  let washingLineHeight = width_ > 768 ? height_ / 3.2 : height_ / 4;

  let isMobile = false;

  if (window.matchMedia("(any-pointer: coarse)").matches) {
    isMobile = true;
  }

  let trueBottom = isMobile ? window.innerHeight : height_;

  // The ground
  let ground = Matter.Bodies.rectangle(width_ / 2, trueBottom, width_, 10, {
    isStatic: true,
    render: {
      visible: false,
    },
  });

  // left wall
  let wallL = Matter.Bodies.rectangle(-30, height_ / 2, 60, height_, {
    isStatic: true,
    render: {
      visible: false,
    },
  });
  Matter.World.add(engine.world, wallL);

  // right wall
  let wallR = Matter.Bodies.rectangle(width_ + 30, height_ / 2, 60, height_, {
    isStatic: true,
    render: {
      visible: false,
    },
  });
  Matter.World.add(engine.world, wallR);

  // Mouse interaction
  let mouse = Matter.Mouse.create(render.canvas);

  let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {
        visible: false,
      },
    },
  });
  render.mouse = mouse;

  let mouseScale = 1 + 1 / (1.7 / (1 - 1.7));

  Matter.Mouse.setScale(mouse, { x: mouseScale, y: mouseScale });

  // add bodies
  // var group = Body.nextGroup(true);

  let bridgeLength = Math.floor(width_ / 30);

  var bridge = Matter.Composites.stack(
    15,
    washingLineHeight - 2,
    bridgeLength,
    1,
    0,
    0,
    function (x, y) {
      return Matter.Bodies.rectangle(x - 9.5, y - 3, 40, 15, {
        collisionFilter: { mask: 2 },
        chamfer: 5,
        density: 0.005,
        frictionAir: 0.05,
        render: {
          fillStyle: "transparent",
        },
      });
    }
  );

  Matter.Composites.chain(bridge, 0, 0, 0, 0, {
    stiffness: 1,
    length: 0,
    render: {
      visible: true,
      strokeStyle: "#000",
      type: "line",
      lineWidth: 1,
    },
  });

  let leftHook = Matter.Constraint.create({
    pointB: { x: 0, y: washingLineHeight },
    bodyA: bridge.bodies[0],

    length: 0,
    stiffness: 0.9,
    render: {
      visible: false,
    },
  });

  let rightHook = Matter.Constraint.create({
    pointB: { x: width_, y: washingLineHeight },
    bodyA: bridge.bodies[bridge.bodies.length - 1],
    length: 0,
    stiffness: 0.9,
    render: {
      visible: false,
    },
  });

  // Peg
  let pegStyle = {
    type: "line",
    strokeStyle: "#fa5950",
    lineWidth: 6,
    anchors: false,
  };
  let bridgeConnectors = bridgeLength - 1;

  let bridgeIncriment = Math.round(width_ / bridgeLength - 0.11);

  if (width_ > 480) {
    // POSTER
    let posterPos = Math.round(bridgeConnectors / 20);

    let poster = Matter.Bodies.rectangle(
      bridgeIncriment * (posterPos + 3),
      Math.floor(washingLineHeight) + 110,
      150,
      190,
      {
        render: {
          sprite: {
            xScale: 0.5,
            yScale: 0.5,
            texture: new URL(
              `~/assets/img/washingline/painting.jpg`,
              import.meta.url
            ).href,
          },
        },
      }
    );
    Matter.World.add(engine.world, poster);
    // Left poster peg
    let posterPegL = Matter.Constraint.create({
      bodyA: poster,
      bodyB: bridge.bodies[posterPos],
      pointA: { x: -60, y: -90 },

      stiffness: 0.9,
      length: 22,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, posterPegL);

    // Right poster peg
    let posterPegR = Matter.Constraint.create({
      bodyA: poster,
      bodyB: bridge.bodies[posterPos + 4],
      pointA: { x: 60, y: -90 },
      stiffness: 0.9,
      length: 22,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, posterPegR);
  }

  if (width_ > 992) {
    // conchiglia
    let rockOnePos = Math.round((bridgeConnectors / 20) * 5);

    let rockOne = Matter.Bodies.polygon(
      bridgeIncriment * rockOnePos,
      Math.floor(washingLineHeight) + 40,
      9,
      13,
      {
        render: {
          sprite: {
            xScale: 0.25,
            yScale: 0.25,
            texture: new URL(
              `~/assets/img/washingline/conchiglia.png`,
              import.meta.url
            ).href,
          },
        },
      }
    );

    Matter.World.add(engine.world, rockOne);

    let rockOnePeg = Matter.Constraint.create({
      bodyA: rockOne,
      bodyB: bridge.bodies[rockOnePos - 1],
      pointA: { x: 0, y: -10 },
      stiffness: 0.9,
      length: 20,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, rockOnePeg);
  }

  // orange
  if (width_ < 900 && width_ > 300) {
    let orangeNum = (large && 10) || (small && 3) || 11;

    let orangePos = Math.round((bridgeConnectors / 20) * orangeNum);

    let orange = Matter.Bodies.polygon(
      bridgeIncriment * orangePos,
      Math.floor(washingLineHeight) + 40,
      5,
      28,
      {
        render: {
          sprite: {
            xScale: 0.35,
            yScale: 0.35,
            texture: new URL(
              `~/assets/img/washingline/orange.jpg`,
              import.meta.url
            ).href,
          },
        },
      }
    );
    Matter.World.add(engine.world, orange);

    let orangePeg = Matter.Constraint.create({
      bodyA: orange,
      bodyB: bridge.bodies[orangePos - 1],
      pointA: { x: 0, y: -10 },

      stiffness: 0.9,
      length: 20,
      render: pegStyle,
    });
    Matter.Composite.add(engine.world, orangePeg);
  }

  // Roxana
  let roxana = ["R", "O", "X", "A", "N", "A"];
  let roxanaChain = [];
  let roxPrev = null;
  let roxPosNum = width_ > 768 ? 7 : 9;
  let roxPos = Math.round((bridgeConnectors / 20) * roxPosNum);

  for (var r = 0; r < roxana.length; r++) {
    let roxLetter = Matter.Bodies.circle(
      bridgeIncriment * roxPos,
      Math.floor(washingLineHeight) + 45 + 15 * r,
      8,
      {
        render: {
          fillStyle: "transparent",
          strokeStyle: "red",
          text: {
            content: roxana[r],
            color: "black",
            size: 13,
            family: "Source Code Pro, monospace",
          },
        },
      }
    );

    roxanaChain.push(roxLetter);

    if (roxPrev) {
      let options = {
        bodyA: roxLetter,
        bodyB: roxPrev,
        length: 20,
        stiffness: 0.3,
        render: {
          visible: false,
        },
      };
      let constraint = Matter.Constraint.create(options);
      Matter.World.add(engine.world, constraint);
    }
    roxPrev = roxLetter;
  }

  Matter.Composite.add(engine.world, roxanaChain);

  Matter.World.add(
    bridge,
    Matter.Constraint.create({
      bodyA: bridge.bodies[roxPos - 1],
      bodyB: roxanaChain[0],
      pointB: { x: 0, y: -20 },
      length: 18,
      stiffness: 0.5,
      render: pegStyle,
    })
  );

  // orange

  if (width_ > 900) {
    // POSTER
    let printPos = Math.round((bridgeConnectors / 20) * 8.5);

    let print = Matter.Bodies.rectangle(
      bridgeIncriment * (printPos + 3),
      Math.floor(washingLineHeight) + 110,
      150,
      200,
      {
        render: {
          sprite: {
            xScale: 0.5,
            yScale: 0.5,
            texture: new URL(
              `~/assets/img/washingline/print.jpg`,
              import.meta.url
            ).href,
          },
        },
      }
    );
    Matter.World.add(engine.world, print);
    // Left poster peg
    let printPegL = Matter.Constraint.create({
      bodyA: print,
      bodyB: bridge.bodies[printPos],
      pointA: { x: -60, y: -90 },

      stiffness: 0.9,
      length: 22,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, printPegL);

    // Right poster peg
    let printPegR = Matter.Constraint.create({
      bodyA: print,
      bodyB: bridge.bodies[printPos + 4],
      pointA: { x: 60, y: -90 },
      stiffness: 0.9,
      length: 22,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, printPegR);
  }

  // Kenjeeva
  let kenjeeva = ["K", "E", "N", "J", "E", "E", "V", "A"];
  let kenjeevaChain = [];
  let kenPrev = null;
  let kenPos = Math.round((bridgeConnectors / 20) * 13);

  for (var k = 0; k < kenjeeva.length; k++) {
    let kenLetter = Matter.Bodies.circle(
      bridgeIncriment * kenPos,
      Math.floor(washingLineHeight) + 50 + 15 * k,
      10,
      {
        render: {
          fillStyle: "transparent",
          strokeStyle: "red",
          text: {
            content: kenjeeva[k],
            color: "black",
            size: 13,
            family: "Source Code Pro, monospace",
          },
        },
      }
    );

    kenjeevaChain.push(kenLetter);

    if (kenPrev) {
      let options = {
        bodyA: kenLetter,
        bodyB: kenPrev,
        length: 20,
        stiffness: 0.3,
        render: {
          visible: false,
        },
      };
      let constraint = Matter.Constraint.create(options);
      Matter.World.add(engine.world, constraint);
    }
    kenPrev = kenLetter;
  }

  Matter.Composite.add(engine.world, kenjeevaChain);

  Matter.Composite.add(
    bridge,
    Matter.Constraint.create({
      bodyA: bridge.bodies[kenPos - 1],
      bodyB: kenjeevaChain[0],
      pointB: { x: 0, y: -20 },
      length: 18,
      stiffness: 0.5,
      render: pegStyle,
    })
  );

  // rockTwo
  if (width_ > 768) {
    let rockTwoPos = Math.round((bridgeConnectors / 20) * 15);

    let rockTwo = Matter.Bodies.rectangle(
      bridgeIncriment * rockTwoPos,
      Math.floor(washingLineHeight) + 40,
      26,
      40,
      {
        chamfer: { radius: 10 },
        render: {
          sprite: {
            xScale: 0.2,
            yScale: 0.2,
            texture: new URL(
              `~/assets/img/washingline/sasso2.png`,
              import.meta.url
            ).href,
          },
        },
      }
    );
    Matter.World.add(engine.world, rockTwo);

    let rockTwoPeg = Matter.Constraint.create({
      bodyA: rockTwo,
      bodyB: bridge.bodies[rockTwoPos - 1],
      pointA: { x: 0, y: -10 },

      stiffness: 0.9,
      length: 20,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, rockTwoPeg);
  }

  // pomegranate

  let pomegranateNum = width_ > 768 ? 17 : 19;

  let pomegranatePos = Math.round((bridgeConnectors / 20) * pomegranateNum);
  let pomegranate = Matter.Bodies.rectangle(
    bridgeIncriment * pomegranatePos,
    Math.floor(washingLineHeight) + 120,
    40,
    210,
    {
      chamfer: { radius: 18 },
      render: {
        sprite: {
          xScale: 0.45,
          yScale: 0.45,
          texture: new URL(
            `~/assets/img/washingline/pomegranate.png`,
            import.meta.url
          ).href,
        },
      },
    }
  );
  Matter.World.add(engine.world, pomegranate);

  let pomegranatePeg = Matter.Constraint.create({
    bodyA: pomegranate,
    bodyB: bridge.bodies[pomegranatePos - 1],
    pointA: { x: -15, y: -100 },

    stiffness: 0.9,
    length: 20,
    render: pegStyle,
  });

  Matter.Composite.add(engine.world, pomegranatePeg);

  if (width_ > 768) {
    // orangeTwo
    let orangeTwoPos = Math.round((bridgeConnectors / 20) * 19);
    let orangeTwo = Matter.Bodies.rectangle(
      bridgeIncriment * orangeTwoPos,
      Math.floor(washingLineHeight) + 30,
      35,
      50,
      {
        chamfer: { radius: 18 },
        render: {
          sprite: {
            xScale: 0.35,
            yScale: 0.35,
            texture: new URL(
              `~/assets/img/washingline/orange2.png`,
              import.meta.url
            ).href,
          },
        },
      }
    );
    Matter.World.add(engine.world, orangeTwo);

    let orangeTwoPeg = Matter.Constraint.create({
      bodyA: orangeTwo,
      bodyB: bridge.bodies[orangeTwoPos - 1],
      pointA: { x: -14, y: -25 },

      stiffness: 0.9,
      length: 20,
      render: pegStyle,
    });

    Matter.Composite.add(engine.world, orangeTwoPeg);
  }

  Matter.Events.on(mouseConstraint, "mousemove", function (event) {
    //For Matter.Query.point pass "array of bodies" and "mouse position"
    var foundPhysics = Matter.Query.point(
      engine.world.bodies,
      event.mouse.position
    );
    if (foundPhysics[0]) {
      document.getElementById("parent").style.cursor = "pointer";
    } else {
      document.getElementById("parent").style.cursor = "inherit";
    }
  });

  // REMOVE BY FORCE
  Matter.Events.on(
    mouseConstraint,
    "mousedown",
    () => {
      if (mouseConstraint.body) {
        document.addEventListener("mousemove", breakString);
        document.addEventListener("touchmove", breakString);

        //This listener is getting added with every mousedown and is never removed
        document.addEventListener("mouseup", function () {
          Matter.World.add(engine.world, [mouseConstraint]);
          document.removeEventListener("mousemove", breakString);

          document.onmouseup = null;
        });
        document.addEventListener("touchend", function () {
          Matter.World.add(engine.world, [mouseConstraint]);
          document.removeEventListener("touchmove", breakString);
          document.onmouseup = null;
        });
      } else return;
    },
    false
  );

  function breakString() {
    let element = mouseConstraint.body;
    let constraints = engine.world.constraints.filter(
      (item) => !item.label.includes("Mouse Constraint")
    );

    const isElementPresent = constraints.some((o) => o.bodyA.id === element.id);
    if (isElementPresent) {
      let force =
        mouseConstraint.body.constraintImpulse.x *
        mouseConstraint.body.constraintImpulse.y;

      if (force > 0.02) {
        let selectedUser = constraints.find(function (constraint) {
          return constraint.bodyA.id === element.id;
        });

        Matter.World.remove(engine.world, selectedUser);
        Matter.World.remove(engine.world, [mouseConstraint]);
      }
    } else return;
  }

  Matter.Composite.add(engine.world, [bridge, leftHook, rightHook]);

  Matter.World.add(engine.world, [ground, mouseConstraint]);

  Matter.Runner.run(engine);
  Matter.Render.run(render);

  Matter.Runner.tick(runner, engine);
};

onMounted(() => {
  washingLine();
});
</script>



<style scoped>
#parent {
  position: relative;
  color: black;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  touch-action: none;
}
</style>