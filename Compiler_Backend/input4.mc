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