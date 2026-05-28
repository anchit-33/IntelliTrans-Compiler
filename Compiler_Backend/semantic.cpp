#include "ast.h"
#include <iostream>
#include <map>
#include <stdexcept>

using namespace std;

map<string, bool> symbolTable;

void check(Node* root) {

    if(!root) return;

    // DECLARATION CHECK
    if(root->type == "DECL") {

        if(symbolTable.find(root->value) != symbolTable.end()) {

            cout << "Semantic Error: "
                 << root->value
                 << " already declared\n";

            throw runtime_error("semantic");
        }

        symbolTable[root->value] = true;
    }

    // ASSIGNMENT CHECK
    if(root->type == "ASSIGN") {

        if(symbolTable.find(root->value) == symbolTable.end()) {

            cout << "Semantic Error: "
                 << root->value
                 << " not declared\n";

            throw runtime_error("semantic");
        }
    }

    // IDENTIFIER CHECK
    if(root->type == "ID") {

        if(symbolTable.find(root->value) == symbolTable.end()) {

            cout << "Semantic Error: "
                 << root->value
                 << " not declared\n";

            throw runtime_error("semantic");
        }
    }

    for(auto child : root->children)
        check(child);
}