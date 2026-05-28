%{
#include "ast.h"
#include "parser.tab.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
%}

%%
"#include"      { return INCLUDE; }
"<stdio.h>"     { return HEADER; }

"int"       { return INT; }
"main"      { return MAIN; }
"return"    { return RETURN; }
"printf"    { return PRINTF; }
"if"        { return IF; }
"else"      { return ELSE; }
"while"     { return WHILE; }

[0-9]+ {
    yylval.num = atoi(yytext);
    return NUMBER;
}

\"[^\"]*\" {
    yylval.str = strdup(yytext);
    return STRING;
}

[a-zA-Z_][a-zA-Z0-9_]* {
    yylval.str = strdup(yytext);
    return ID;
}

"="     { return ASSIGN; }
";"     { return SEMICOLON; }
","     { return COMMA; }
"+"     { return PLUS; }
"-"     { return MINUS; }
"("     { return LPAREN; }
")"     { return RPAREN; }
"{"     { return LBRACE; }
"}"     { return RBRACE; }

[ \t\r\n] ;
. { printf("Unknown char: %s\n", yytext); }

%%
int yywrap() { return 1; }