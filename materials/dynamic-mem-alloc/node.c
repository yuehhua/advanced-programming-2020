#include<stdio.h>
#include<stdlib.h>

typedef struct listNode {
    int data;
    struct listNode * ptr;
} Node;

int main(void){
    Node * ptr = (Node *)malloc(sizeof(Node));
    ptr->data = 10;
    ptr->ptr = NULL;

    printf("%d\n", ptr->data);

    return 0;
}
