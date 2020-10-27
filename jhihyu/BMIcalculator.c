#include<stdio.h>
#include<stdlib.h>

int main(){
    float h, w, bmi;
    printf("Please input your height (cm): ");
    scanf("%f",&h);
    printf("Please input your weight (kg): ");
    scanf("%f",&w);
    bmi = w / pow(h/100, 2) ;
    printf("Your BMI is %f ",bmi);
}