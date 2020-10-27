#include<stdio.h>
#include<stdlib.h>
double height;
double weight;
int main(){
    printf("Please enter your height (m, round to the first decimal place)");
    scanf("%lf",&height);
    printf("Please enter your weight (kg, round to the first decimal place)");
    scanf("%lf", &weight);
    printf("BMI=%lf", weight / (height*height));
}