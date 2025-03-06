const express = require("express");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

// serve static files from the server
app.use(express.static("dist"));

// allow requests from all origins (can be more specific in production)
const cors = require("cors");
app.use(cors());

// automatically parse JSON data in the request body
app.use(express.json());

const morgan = require("morgan");
// define custom morgan token
morgan.token("requestBody", function (req) {
  // in production environment, avoid logging GDPR-sensitive data
  return JSON.stringify(req.body);
});

// custom morgan format function
const customMorganFormat = (tokens, req, res) => {
  // get the HTTP request method
  const method = tokens.method(req, res);

  // recreate the predefined "tiny" format according to the docs
  const tinyFormat = [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  // for POST requests only, log the request body as well
  return method === "POST"
    ? `${tinyFormat} ${tokens.requestBody(req, res)}`
    : tinyFormat;
};

app.use(morgan(customMorganFormat));

app.get("/api/persons", (_request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (_request, response) => {
  Person.find({}).then((persons) => {
    const currTime = new Date();
    const amount = `${persons.length} ${
      persons.length === 1 ? "person" : "people"
    }`;
    response.send(`<p>Phonebook has info for ${amount}</p><p>${currTime}</p>`);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// unknown endpoint handler (must be used after all routes are registered)
const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// error handler middleware (must be the last middleware used, and
// after all routes are registered)
const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("triggered ValidationError", error.message);
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

// handle ports when not on localhost (3001) as well
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
