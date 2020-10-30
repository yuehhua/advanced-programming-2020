
class: center, middle






# Data structures and arrays






#### Yueh-Hua Tu






#### 2020.10.31


---






# Tools and techniques


In computer systems, tools and techniques are 


  * Data abstraction
  * Algorithm specification
  * Performance analysis and measurement
  * Recursive programming


---






# System development


  * Requirements

      * Describing the information that we are given (input) and the results that we must produce (output)


--


  * Analysis

      * Breaking the problem down into manageable pieces
      * Bottom-up & top-down


--


  * Design

      * The creation of abstract data types
      * The specification of algorithms and a consideration of algorithm design strategies
      * Coding details are not required!


---




# System development


  * Implementation and debuging

      * Choosing representations for our data objects and writing algorithms for each operation on them


--


  * Verification

      * Correctness: The same techniques used in mathematics; time-consuming
      * Testing: Good test data should verify that every piece of code runs correctly.
      * Error removal: The ease with which we can remove errors depends on the design and coding decisions made earlier.


---






# Algorithm specification


> Def. a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation.



--


The following are specified clearly:


  * Input
  * Output
  * Definiteness
  * Finiteness
  * Effectiveness


> Ref: Wikipedia - algorithm



---






# Algorithm v.s. program?


--


> Program: A program doesn't need to satify *finiteness*.



---






# How to describe an algorithm?


  * Natural langauge
  * Flow chart
  * Pseudocode


--






### Natural langauge


We check every element from begining and move ever larger number backward. In the first round, we push the largest number to the last. In the second round, we push the second large one to second last.


---




# How to describe an algorithm?






### Flow chart


<img src="../../pics/Bubble-Sort-Flowchart.jpeg" width="13%" style="display: block; margin-left: auto;margin-right: auto;">


> [Ref](https://www.softwareideas.net/a/1598/Bubble-Sort--Flowchart-)



---




# How to describe an algorithm?






### Pseudocode


Input: `A` is an array of size `n`


Output: `A`


```
for i = 1:n
    for j = 1:(n-i)
        if A[j] > A[j+1]
            swap A[j] and A[j+1]
        end
    end
end
```


---






# Recursive Algorithms






### Direct recursion


  * Functions call themselves.


--






### Indirect recursion


  * Functions may call other functions that invoke the calling function again.


--


  * Easier to understand


--






### Examples


  * Factorials
  * Fibonacci numbers
  * Binomial coefficients
  * Binary search


---






# Data Abstraction


> Def. A data type is a collection of objects and a set of operations that act on those objects.







#### Example: int and arithmetic operations


--


All programming languages provide at least a minimal set of primative data types, and the ability to construct **user-defined types**.


--






### Abstract data type (ADT)


> Def. a data type whose specification of the objects and the operations on the objects.



--






### Specification vs. Implementation


The specification consists of the names of every function, the type of its arguments, and the type of its result.


---






# Categories of functions of a ADT


  * Creator/constructor
  * Transformers
  * Observers/reporters


---






# Performance Analysis






### Performance analysis


Estimate the theoretic comsuption of time and space of an *algorithm*, which is machine-independent.


--






### Performance measurement


Measure the execution time of a *program*, which is machine-dependent.


--






### Space complexity


Size of memory used in this algorithm.


--






### Time complexity


Analytical execution time of an algorithm.


---




# Time complexity


  * compile time
  * runtime


--






### Cases


  * best case
  * worst case
  * average case






#### Example: bubble sort


---






# Array


Check another slides


---






# Homework


Knight's tour in Python


Check picture for details.

