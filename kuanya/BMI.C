#include<stdio.h>
#include<stdlib.h>
#include<math.h>

int main(){
    
    float height, weight, bmi;
    printf("Please input your height (cm):\n");
    scanf("%f", &height);
    printf("Please input your weight (kg):\n");
    scanf("%f", &weight);

    bmi = weight / pow((height / 100), 2);
    printf("Your BMI is %.3f.", bmi);

    return 0;
}