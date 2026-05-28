#include "ast.h"
#include <algorithm>
#include <iostream>

using namespace std;

/* -------- NODE CREATION -------- */

Node* createNode(string type, string value) {
    return new Node(type, value);
}

void addChild(Node* parent, Node* child) {
    if(child) parent->children.push_back(child);
}

/* -------- PRINT AST (TEXT) -------- */

void printASTtoFile(Node* root, FILE* f, int level) {
    if(!root) return;

    for(int i = 0; i < level; i++)
        fprintf(f, "  ");

    fprintf(f, "%s", root->type.c_str());

    if(root->value != "")
        fprintf(f, "(%s)", root->value.c_str());

    fprintf(f, "\n");

    for(auto child : root->children)
        printASTtoFile(child, f, level + 1);
}

/* -------- GRAPHVIZ DOT GENERATION -------- */

int nodeId = 0;

// helper: convert string to lowercase
string toLower(string s) {
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    return s;
}

void generateDOTUtil(Node* root, FILE* f, int parentId) {
    if(!root) return;

    int currentId = nodeId++;

    // -------- CREATE SAFE LABEL --------
    string label = root->type;

    if(root->value != "") {
        string cleanValue = root->value;

        cleanValue.erase(remove(cleanValue.begin(), cleanValue.end(), '\"'), cleanValue.end());

        for(char &c : cleanValue) {
            if(c == ' ') c = '_';
        }

        label += "_" + cleanValue;
    }

    // -------- COLOR LOGIC --------
    string fill = "lightpink";
    int penWidth = 2;

    string type = toLower(root->type);
    string value = toLower(root->value);

    // 🌿 Leaf nodes
    if(root->children.empty()) {
        fill = "lightgreen";
    }

    // 🔀 Control statements (type OR value)
    else if(type.find("if") != string::npos ||
            type.find("else") != string::npos ||
            type.find("while") != string::npos ||
            value == "if" || value == "else" || value == "while") {
        fill = "orange";
        penWidth = 4;
    }

    // ➕ Operators
    else if(type.find("op") != string::npos ||
            type.find("operator") != string::npos) {
        fill = "yellow";
    }

    // 🧠 Identifiers / variables
    else if(type.find("id") != string::npos ||
            type.find("var") != string::npos ||
            type.find("identifier") != string::npos) {
        fill = "yellow";
    }

    // -------- PRINT NODE --------
    fprintf(f,
        "node%d [label=\"%s\", style=\"filled,rounded\", fillcolor=%s, color=red, penwidth=%d];\n",
        currentId, label.c_str(), fill.c_str(), penWidth
    );

    // -------- EDGE --------
    if(parentId != -1) {
        fprintf(f, "node%d -> node%d;\n", parentId, currentId);
    }

    // -------- RECURSION --------
    for(auto child : root->children) {
        generateDOTUtil(child, f, currentId);
    }
}

void generateDOT(Node* root, FILE* f) {
    fprintf(f, "digraph AST {\n");

    // global shape only (styling handled per node)
    fprintf(f, "node [shape=box];\n");

    nodeId = 0;
    generateDOTUtil(root, f, -1);

    fprintf(f, "}\n");
}