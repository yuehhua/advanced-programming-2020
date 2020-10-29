#include<stdio.h>
#include<stdlib.h>
#include <math.h>

int main(){
    float height, weight;
    printf("Please input your height (cm):\n");
    scanf("%f", &height);
    printf("Please input your weight (kg):\n");
    scanf("%f", &weight);
    printf("Your BMI is %.3f.",weight / pow(height / 100, 2));
    return 0;
}