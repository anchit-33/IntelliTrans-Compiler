const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* AST IMAGE STATIC ROUTE */

app.use(
  "/ast",
  express.static(path.join(__dirname))
);

/* COMPILE API */

app.post("/compile", (req, res) => {

  const code = req.body.code;

  /* WRITE UI CODE TO INPUT FILE */

  fs.writeFileSync("input4.mc", code);

  /* DELETE OLD FILES */

  if (fs.existsSync("output.py")) {
    fs.unlinkSync("output.py");
  }

  if (fs.existsSync("ast.png")) {
    fs.unlinkSync("ast.png");
  }

  /* RUN COMPILER */

  exec("compiler.exe", (error, stdout, stderr) => {

    /* COMPILER / SEMANTIC ERROR */

    if (error) {

      return res.json({

        success: false,

        error:
          stdout ||
          stderr ||
          "Compilation failed"

      });

    }

    /* READ GENERATED PYTHON */

    let pythonCode = "";

    try {

      pythonCode = fs.readFileSync(
        "output.py",
        "utf-8"
      );

    } catch {

      pythonCode = "";

    }

    /* CHECK AST EXISTS */

    if (!fs.existsSync("ast.png")) {

      return res.json({

        success: false,

        error: "AST image not generated"

      });

    }

    /* SUCCESS RESPONSE */

    res.json({

      success: true,

      python: pythonCode,

      ast: "/ast/ast.png"

    });

  });

});

/* START SERVER */

app.listen(5000, () => {

  console.log(
    "Backend running on port 5000"
  );

});