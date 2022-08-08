import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get<{ food: string }>("/eat/:food", (req, res) => {
  const food = req.params.food;
  const foodProper: string = "aeiou".includes(food[0])
    ? `an ${food}`
    : `a ${food}`;
  res.json({
    message: `Yum yum - you ate ${foodProper}`,
  });
});

// app.get("/eat/apple", (req, res) => {
//   res.json({
//     message: "Yum yum - you ate an apple!",
//   });
// });

// app.get("/eat/banana", (req, res) => {
//   res.json({
//     message: "Yum yum - you ate a banana!",
//   });
// });

// app.get("/eat/carrot", (req, res) => {
//   res.json({
//     message: "Yum yum - you ate a carrot!",
//   });
// });

app.get<{ exampleRouteParameter: string }>(
  "/echo/:exampleRouteParameter",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
    });
  }
);

app.get<{ something: string }>("/shout/:something", (req, res) => {
  res.json({
    shout: `${req.params.something.toUpperCase()}!`,
    result: `I am shouting back to you: ${req.params.something.toUpperCase()}!`,
  });
});

app.get<{ numOne: string; numTwo: string; numThree: string }>(
  "/add/:numOne/:numTwo/:numThree?",
  (req, res) => {
    const filterOutEmpty: [string, string][] = Object.entries(
      req.params
    ).filter((el) => el[1] !== undefined);
    const arrayOfNum: number[] = filterOutEmpty.map((el) => parseInt(el[1]));
    const addition = arrayOfNum.reduce((prev, curr) => prev + curr);
    const stringAddition: string = arrayOfNum
      .map((num) => num.toString())
      .join(" + ");
    res.json({
      original: stringAddition,
      result: addition,
    });
  }
);

app.get<{ numOne: string; numTwo: string }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = parseInt(numOne) * parseInt(numTwo);
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
///// !! declaring param with type enforces its correct use
///// name in curly braces must match that of the path
///// gives type and autocomplete hints as well within the body
///// type must be string as the transpiled javascript will see
///// it that way and you need to type cast it.
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
