#include "ast.h"
#include <stdio.h>

FILE *out;
int indent = 0;

void printIndent() {
    for(int i=0;i<indent;i++) fprintf(out,"    ");
}

void generate(Node* root) {
    if(!root) return;

    if(root->type == "BLOCK") {
        for(auto child : root->children)
            generate(child);
    }

    else if(root->type == "DECL") {
        printIndent();
        fprintf(out, "%s = ", root->value.c_str());
        generate(root->children[0]);
        fprintf(out, "\n");
    }

    else if(root->type == "ASSIGN") {
    printIndent();
    fprintf(out, "%s = ", root->value.c_str());
    generate(root->children[0]);
    fprintf(out, "\n");
    }

    else if(root->type == "PRINT") {
        printIndent();
        fprintf(out, "print(%s, %s)\n",
            root->children[0]->value.c_str(),
            root->children[1]->value.c_str());
    }

    else if(root->type == "IF") {
        printIndent();
        fprintf(out, "if ");
        generate(root->children[0]);
        fprintf(out, ":\n");

        indent++;
        generate(root->children[1]);
        indent--;

        printIndent();
        fprintf(out, "else:\n");

        indent++;
        generate(root->children[2]);
        indent--;
    }

    else if(root->type == "WHILE") {
        printIndent();
        fprintf(out, "while ");
        generate(root->children[0]);
        fprintf(out, ":\n");

        indent++;
        generate(root->children[1]);
        indent--;
    }

    else if(root->type == "ADD") {
        generate(root->children[0]);
        fprintf(out, " + ");
        generate(root->children[1]);
    }
    else if(root->type == "SUB") {
    generate(root->children[0]);
    fprintf(out, " - ");
    generate(root->children[1]);
}
    else if(root->type == "NUM") {
        fprintf(out, "%s", root->value.c_str());
    }

    else if(root->type == "ID") {
        fprintf(out, "%s", root->value.c_str());
    }
}