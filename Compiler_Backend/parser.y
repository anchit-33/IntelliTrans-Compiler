%{
#include <stdio.h>
#include "ast.h"

extern int yylex();
void yyerror(const char* s);

Node* root;
%}

%code requires {
    #include "ast.h"
}

%union {
    int num;
    char* str;
    Node* node;
}

%token INCLUDE HEADER INT MAIN RETURN PRINTF IF ELSE WHILE
%token <str> ID STRING
%token <num> NUMBER
%token ASSIGN SEMICOLON COMMA PLUS MINUS
%token LPAREN RPAREN LBRACE RBRACE

%left PLUS MINUS

%type <node> program stmt stmt_list expr main_block

%%

program:
    INCLUDE HEADER main_block { root = $3; }
;

main_block:
    INT MAIN LPAREN RPAREN LBRACE stmt_list RETURN NUMBER SEMICOLON RBRACE
        { $$ = $6; }
;

stmt_list:
    stmt_list stmt {
        addChild($1, $2);
        $$ = $1;
    }
    |
    stmt {
        $$ = createNode("BLOCK");
        addChild($$, $1);
    }
;

stmt:
    INT ID ASSIGN expr SEMICOLON {
        Node* n = createNode("DECL", $2);
        addChild(n, $4);
        $$ = n;
    }
    |

        ID ASSIGN expr SEMICOLON {
        Node* n = createNode("ASSIGN", $1);
        addChild(n, $3);
        $$ = n;
    }
    |

    PRINTF LPAREN STRING COMMA ID RPAREN SEMICOLON {
        Node* n = createNode("PRINT");
        addChild(n, createNode("STRING", $3));
        addChild(n, createNode("ID", $5));
        $$ = n;
    }
    |

    IF LPAREN expr RPAREN LBRACE stmt_list RBRACE
    ELSE LBRACE stmt_list RBRACE {
        Node* n = createNode("IF");
        addChild(n, $3);
        addChild(n, $6);
        addChild(n, $10);
        $$ = n;
    }
    |

    WHILE LPAREN expr RPAREN LBRACE stmt_list RBRACE {
        Node* n = createNode("WHILE");
        addChild(n, $3);
        addChild(n, $6);
        $$ = n;
    }
;

expr:
    expr PLUS expr {
            Node* n = createNode("ADD");
            addChild(n, $1);
            addChild(n, $3);
            $$ = n;
      }

    | expr MINUS expr {
            Node* n = createNode("SUB");
            addChild(n, $1);
            addChild(n, $3);
            $$ = n;
      }

    | MINUS NUMBER {
            char buf[20];
            sprintf(buf, "-%d", $2);
            $$ = createNode("NUM", buf);
      }

    | LPAREN expr RPAREN {
            $$ = $2;
      }

    | ID {
            $$ = createNode("ID", $1);
      }

    | NUMBER {
            char buf[20];
            sprintf(buf, "%d", $1);
            $$ = createNode("NUM", buf);
      }
;

%%

void yyerror(const char* s) {
    printf("Syntax Error: %s\n", s);
}