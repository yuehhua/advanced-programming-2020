#include<stdio.h>
#include<stdlib.h>
#include<math.h>


int main(){
    double weight;
    double height;
    
    printf("Please enter your height(meter):");
    scanf("%lf", &height);

    printf("Please enter your weight(kilogram):");
    scanf("%lf", &weight);

    double bmi;
    bmi = weight/pow(height,2);
    printf("Your BMI:%lf", bmi);

    return(0);
  
}




















