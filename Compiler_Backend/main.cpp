#include <stdio.h>
#include <stdlib.h>
#include "ast.h"

extern int yyparse();
extern FILE *yyin;
extern Node* root;

void check(Node*);
void generate(Node*);

extern FILE *out;

int main() {

    yyin = fopen("input4.mc", "r");
    out = fopen("output.py", "w");
    FILE *astFile = fopen("ast.txt", "w");
    FILE *dotFile = fopen("ast.dot", "w");

    if(!yyin || !out || !astFile || !dotFile) {
        printf("File error\n");
        return 1;
    }

    printf("Starting parsing...\n");

    if(yyparse() != 0) {
        printf("Parsing failed\n");
        return 1;
    }

    printf("Parsing done.\n");

    if(root == NULL) {
        printf("AST root is NULL\n");
        return 1;
    }

    // Generate AST text
    printASTtoFile(root, astFile, 0);

    // Generate DOT file
    generateDOT(root, dotFile);

// IMPORTANT
fclose(dotFile);

    // Automatically generate PNG using Graphviz
    system("dot -Tpng ast.dot -o ast.png");

    try {

    check(root);

    generate(root);

}
catch(...) {

    return 1;

}

    fclose(astFile);
    fclose(out);
    fclose(yyin);

    printf("Compilation successful.\n");
    printf("Generated files:\n");
    printf("1. output.py\n");
    printf("2. ast.txt\n");
    printf("3. ast.dot\n");
    printf("4. ast.png\n");

    return 0;
}