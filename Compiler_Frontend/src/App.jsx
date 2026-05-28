import React from "react";

export default function MiniCCompilerFrontend() {

  const phases = [
    "Lexical Analysis",
    "Syntax Analysis",
    "Semantic Analysis",
    "Intermediate Code Generation",
    "AST Generation"
  ];

  const [code, setCode] = React.useState("");

  const [compiled, setCompiled] = React.useState(false);
  const [compiling, setCompiling] = React.useState(false);

  const [showAST, setShowAST] = React.useState(false);

  const [pythonOutput, setPythonOutput] = React.useState("");
  const [astImage, setAstImage] = React.useState("");

  const [compilerError, setCompilerError] = React.useState("");
  
  const handleCompile = async () => {

  setCompiling(true);
setCompiled(false);
setCompilerError("");

  try {

    const response = await fetch(
      "http://localhost:5000/compile",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          code: code,
        }),
      }
    );

    const data = await response.json();

    setCompiling(false);

    if (data.success) {

  setCompiled(true);

  setPythonOutput(data.python);

  setAstImage(
  "http://localhost:5000" +
  data.ast +
  "?t=" +
  new Date().getTime()
);

} else {

  setCompilerError(data.error);

}
  } catch (err) {

    setCompiling(false);

    setCompilerError("Backend connection failed");

  }

};
  

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-8 py-8">

      <div className="max-w-[1500px] mx-auto">

        {/* HERO SECTION */}

        <div className="text-center py-16 mb-6">

          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

            IntelliTrans Source-to-Source Compiler

          </h1>

          <p className="text-slate-300 text-lg max-w-4xl mx-auto leading-relaxed">

            IntelliTrans is a custom Source-to-Source Compiler designed to
            translate Mini-C programming language into equivalent Python code.
            The project demonstrates major compiler phases including
            lexical analysis, syntax analysis, semantic analysis,
            Abstract Syntax Tree generation, and target code generation.

            Developed using Flex, Bison, C++, React and Graphviz,
            the system visualizes compiler internals while converting
            Mini-C constructs into executable Python programs.

          </p>

        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-4 gap-5 mb-12">

          <div className="bg-slate-800/60 backdrop-blur rounded-3xl p-6 border border-slate-700 shadow-2xl">

            <h3 className="text-xl font-bold mb-2 text-cyan-400">
              Lexer
            </h3>

            <p className="text-slate-300 text-sm">
              Tokenizes Mini-C source code using Flex.
            </p>

          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-3xl p-6 border border-slate-700 shadow-2xl">

            <h3 className="text-xl font-bold mb-2 text-blue-400">
              Parser
            </h3>

            <p className="text-slate-300 text-sm">
              Builds grammar rules and syntax tree using Bison.
            </p>

          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-3xl p-6 border border-slate-700 shadow-2xl">

            <h3 className="text-xl font-bold mb-2 text-purple-400">
              Semantic
            </h3>

            <p className="text-slate-300 text-sm">
              Performs declaration and semantic checks.
            </p>

          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-3xl p-6 border border-slate-700 shadow-2xl">

            <h3 className="text-xl font-bold mb-2 text-pink-400">
              Codegen
            </h3>

            <p className="text-slate-300 text-sm">
              Converts Mini-C into executable Python code.
            </p>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">

          {/* CODE EDITOR */}

          <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

            <div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex justify-between items-center">

              <h2 className="text-2xl font-bold text-cyan-400">

                Write Your Mini-C Code Here

              </h2>

              <button
                onClick={handleCompile}
                className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-xl font-semibold text-black"
              >

                {compiling ? "Executing..." : "Compile"}

              </button>

            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your Mini-C code here..."
              className="w-full h-[700px] bg-slate-950 text-green-400 p-5 font-mono text-sm outline-none resize-none"
            />

          </div>

          {/* RIGHT SECTION */}

          <div className="space-y-6">

            {/* PHASES */}

            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">

              <h2 className="text-2xl font-bold text-blue-400 mb-6">

                Compiler Execution Phases

              </h2>

              <div className="space-y-4">

                {!compiled && !compiling && (

                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">

                    <p className="text-slate-300">
                      Waiting for compilation...
                    </p>

                  </div>

                )}

                {compiling && (

                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">

                    <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-cyan-400 font-semibold">

                      Executing Compiler...

                    </p>

                  </div>

                )}

                {compiled &&
                  phases.map((phase, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-800 rounded-2xl px-5 py-4 border border-slate-700"
                    >

                      <div>

                        <p className="font-semibold text-white">

                          {phase}

                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>

                        <span className="text-green-400 text-sm font-medium">

                          Executed

                        </span>

                      </div>

                    </div>

                  ))}

              </div>

            </div>
            
            {/* COMPILER TERMINAL */}

<div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

  <div className="bg-slate-800 px-5 py-4 border-b border-slate-700">

    <h2 className="text-2xl font-bold text-red-400">

      Compiler Terminal

    </h2>

  </div>

  <div className="bg-black text-green-400 font-mono p-5 min-h-[220px] overflow-auto">

    {!compilerError && !compiled && !compiling && (

      <p className="text-slate-500">
        Waiting for compilation...
      </p>

    )}

    {compiling && (

      <div>

        <p className="text-cyan-400">
           Starting compiler...
        </p>

        <p className="text-yellow-400">
           Running lexical analysis...
        </p>

        <p className="text-purple-400">
           Parsing source code...
        </p>

      </div>

    )}

    {compilerError && (

      <div className="text-red-400 whitespace-pre-wrap">

        {compilerError}

      </div>

    )}

    {compiled && !compilerError && (

      <div className="text-green-400">

        <p> Lexical analysis completed</p>
        <p> Syntax analysis completed</p>
        <p> Semantic analysis completed</p>
        <p> AST generated successfully</p>
        <p> Python code generated successfully</p>

      </div>

    )}

  </div>

</div>

            {/* GENERATED PYTHON */}

            <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700">

                <h2 className="text-2xl font-bold text-purple-400">

                  Generated Python Code

                </h2>

              </div>

              <pre className="p-5 text-sm overflow-auto bg-slate-950 text-yellow-300 font-mono min-h-[350px]">

                {compiled && !compilerError
                ? pythonOutput
                : "Compile Mini-C code to generate Python output..."}

              </pre>

            </div>

          </div>

        </div>

        {/* AST SECTION */}
        {compiled && !compilerError && (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl mb-16">

          <div className="bg-slate-800 px-8 py-6 border-b border-slate-700 flex justify-between items-center">

            <h2 className="text-4xl font-bold text-pink-400">

              Generated AST (Abstract Syntax Tree)

            </h2>

            <button
              onClick={() => setShowAST(true)}
              className="bg-pink-500 hover:bg-pink-400 transition-all duration-300 px-8 py-3 rounded-2xl font-bold text-black text-lg"
            >

              View AST

            </button>

          </div>

          <div className="p-10 flex justify-center items-center bg-slate-950 min-h-[500px]">

            <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-5xl">

              <img
                src={astImage}
                alt="AST"
                className="w-full rounded-2xl border border-slate-300"
              />

            </div>

          </div>

        </div>
        )}

        {/* FULL SCREEN AST MODAL */}

        {showAST && (

          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">

            <div className="relative w-full h-full flex items-center justify-center">

              <button
                onClick={() => setShowAST(false)}
                className="absolute top-5 right-5 bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-2xl font-bold text-lg z-50"
              >

                Close

              </button>

              <img
                src={astImage}
                alt="Full AST"
                className="max-w-full max-h-full rounded-3xl shadow-2xl border-4 border-white"
              />

            </div>

          </div>

        )}

        {/* WORKFLOW */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl mb-12">

          <h2 className="text-4xl font-bold text-center mb-10 text-cyan-400">

            Compiler Workflow

          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-center">

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

              <div className="text-5xl mb-4">📝</div>

              <h3 className="font-bold text-lg mb-2">
                Source Code
              </h3>

              <p className="text-slate-400 text-sm">
                User writes Mini-C code.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

              <div className="text-5xl mb-4">🔍</div>

              <h3 className="font-bold text-lg mb-2">
                Lexical
              </h3>

              <p className="text-slate-400 text-sm">
                Tokens generated using Flex.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

              <div className="text-5xl mb-4">🌳</div>

              <h3 className="font-bold text-lg mb-2">
                AST
              </h3>

              <p className="text-slate-400 text-sm">
                Parse tree and AST created.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

              <div className="text-5xl mb-4">🧠</div>

              <h3 className="font-bold text-lg mb-2">
                Semantic
              </h3>

              <p className="text-slate-400 text-sm">
                Semantic validation performed.
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">

              <div className="text-5xl mb-4">⚡</div>

              <h3 className="font-bold text-lg mb-2">
                Python Output
              </h3>

              <p className="text-slate-400 text-sm">
                Python source generated.
              </p>

            </div>

          </div>

          {/* WORKFLOW SHORT DESCRIPTION */}

          <div className="mt-10 grid md:grid-cols-5 gap-4">

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">
                User enters Mini-C source code through compiler editor.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">
                Flex lexer scans characters and produces lexical tokens.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">
                Bison parser validates grammar and constructs AST nodes.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">
                Semantic analyzer validates identifiers and declarations.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed">
                Equivalent Python code is generated from AST representation.
              </p>
            </div>

          </div>

        </div>

        {/* ABOUT SECTION */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-2xl mt-14">

          <h2 className="text-4xl font-bold text-center mb-10 text-cyan-400">

            About IntelliTrans Compiler

          </h2>

          <div className="grid lg:grid-cols-2 gap-10">

            <div>

              <h3 className="text-2xl font-bold mb-5 text-white">

                Source-to-Source Compiler

              </h3>

              <p className="text-slate-300 leading-loose mb-5">

                IntelliTrans is a custom compiler project that translates
                Mini-C programming language into Python source code while
                preserving execution logic and syntax structure.

              </p>

              <p className="text-slate-300 leading-loose">

                The project demonstrates complete compiler phases including
                lexical analysis, syntax analysis, semantic validation,
                AST generation and target code generation using modern
                compiler development tools.

              </p>

            </div>

            <div className="space-y-5">

              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

                <h4 className="text-cyan-400 font-bold text-lg mb-2">
                  Lexical Analysis
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Converts source code into tokens using Flex lexer.
                </p>

              </div>

              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

                <h4 className="text-blue-400 font-bold text-lg mb-2">
                  Syntax Analysis
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Builds parser structures and validates grammar using Bison.
                </p>

              </div>

              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

                <h4 className="text-purple-400 font-bold text-lg mb-2">
                  Semantic Analysis
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Performs declaration and identifier validation.
                </p>

              </div>

              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

                <h4 className="text-pink-400 font-bold text-lg mb-2">
                  Code Generation
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Generates equivalent executable Python source code.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}