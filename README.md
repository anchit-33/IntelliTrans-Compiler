# IntelliTrans — Mini-C to Python Source-to-Source Compiler

## Overview

IntelliTrans is a Source-to-Source Compiler project that translates a custom Mini-C programming language into equivalent Python code. The project demonstrates major compiler design phases including lexical analysis, syntax analysis, semantic analysis, AST generation, and target code generation.

The compiler backend is developed using Flex, Bison, and C++, while the frontend is built using React and Tailwind CSS. Graphviz is used for AST visualization.

---

# Features

* Mini-C to Python translation
* Lexical Analysis using Flex
* Syntax Analysis using Bison
* Semantic Error Detection
* Abstract Syntax Tree (AST) Generation
* Python Code Generation
* Interactive React-based Compiler UI
* Real-time AST visualization
* Full-screen AST preview
* Compiler phase execution simulation

---

# Technologies Used

## Frontend

* React.js
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js

## Compiler Core

* Flex
* Bison
* C++

## Visualization

* Graphviz

---

# Compiler Phases

## 1. Lexical Analysis

Converts source code into tokens using Flex.

## 2. Syntax Analysis

Validates grammar and constructs parser structures using Bison.

## 3. Semantic Analysis

Checks undeclared variables, redeclarations, and semantic correctness.

## 4. AST Generation

Creates Abstract Syntax Tree and visualizes it using Graphviz.

## 5. Code Generation

Generates equivalent Python source code.

---

# Project Structure

```txt
Compiler_Project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server.js
├── parser.y
├── lexer.l
├── ast.cpp
├── semantic.cpp
├── codegen.cpp
├── ast.h
├── main.cpp
├── compiler.exe
├── input4.mc
├── output.py
├── ast.dot
└── ast.png
```

---

# Installation

## Prerequisites

Install:

* Node.js
* Flex
* Bison
* Graphviz
* g++

---

# Frontend Setup

```bash
npm install
npm run dev
```

---

# Backend Setup

```bash
node server.js
```

---

# Compiler Build Commands

```bash
bison -d parser.y
flex lexer.l
g++ lex.yy.c parser.tab.c ast.cpp semantic.cpp codegen.cpp main.cpp -o compiler.exe
```

---

# Graphviz Command

```bash
dot -Tpng ast.dot -o ast.png
```

---

# Sample Mini-C Input

```c
#include <stdio.h>

int main() {

    int a = 10;
    int b = 5;
    int sum = a + b + 2;

    if (a + b) {
        printf("Inside If:", sum);
    } else {
        printf("Inside Else:", a);
    }

    while (a) {
        printf("Loop:", a);
        a = a + -1;
    }

    return 0;
}
```

---

# Generated Python Output

```python
a = 10
b = 5
sum = a + b + 2

if a + b:
    print("Inside If:", sum)
else:
    print("Inside Else:", a)

while a:
    print("Loop:", a)
    a = a - 1
```

---

# Semantic Error Examples

## Undeclared Variable

```c
int main() {
    a = 10;
    return 0;
}
```

## Redeclaration Error

```c
int main() {
    int a = 5;
    int a = 10;
    return 0;
}
```

---

# UI Features

* Interactive Mini-C editor
* Compiler execution visualization
* Real-time terminal logs
* Python output viewer
* AST image preview
* Fullscreen AST visualization

---

# Future Enhancements

* Function support
* Arrays and pointers
* Optimization phase
* Intermediate code generation
* Symbol table visualization
* Online deployment support

---

# Author

Anchit Jugran
B.Tech CSE  
Graphic Era Hill University

Project: IntelliTrans — Mini-C to Python Source-to-Source Compiler

---

# License

This project is developed for academic and educational purposes.
