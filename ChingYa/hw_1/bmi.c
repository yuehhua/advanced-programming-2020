#include<stdio.h>
#include<stdlib.h>
#include<math.h>


int main(void)
{
    float height;
    float kg;
    float bmi;
    printf("Count your BMI~\n");
    printf("Please input your height（m):");
    scanf("%f", &height);
    printf("Please input your kilogram(kg):");
    scanf("%f", &kg);
   
   bmi = kg/pow(height,2);
   printf("Your BMI is: %f", bmi);

    return 0;
}
