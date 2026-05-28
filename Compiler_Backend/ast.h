#ifndef AST_H
#define AST_H

#include <string>
#include <vector>
#include <stdio.h>

using namespace std;

struct Node {
    string type;
    string value;
    vector<Node*> children;

    Node(string t, string v="") {
        type = t;
        value = v;
    }
};

Node* createNode(string type, string value="");
void addChild(Node* parent, Node* child);

void printASTtoFile(Node* root, FILE* f, int level);
void generateDOT(Node* root, FILE* f);

#endif