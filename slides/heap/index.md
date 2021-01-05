
class: center, middle






# Homework






## Heap implementation






#### Yueh-Hua Tu


---






## Requirements


Implement a heap in Julia.


  * Implement a data structure of `Heap` based on array in Julia.
  * Get a index of a root node of a heap.

      * `root(h::Heap)`
  * Get a index of a left child of a node in a heap.

      * `leftchild(h::Heap, i::Int)`
  * Get a index of a right child of a node in a heap.

      * `rightchild(h::Heap, i::Int)`
  * Get a index of a parent of a node in a heap.

      * `parent(h::Heap, i::Int)`


---




## Requirements


  * Get a height of a node in a heap.

      * `height(h::Heap, i::Int)`
  * Get a height of a heap.

      * `height(h::Heap)`
  * Able to push an element to the end of a heap.

      * `push!(h::Heap, x)`
  * Able to pop an element from the end of a heap.

      * `pop!(h::Heap)`
  * Swap two elements in a heap given two indecies.

      * `swap(h::Heap, i::Int, j::Int)`


---




## Requirements


  * Use parametric type to allow heap supporting different primitive types.
  * Optional: Able to print a heap in a tree structure. (left child is in upper branch)


```
1 --- 2 --- 4 --- 8
   |     |     └- 9
   |     └- 5
   └- 3 --- 6
         └- 7
```


  * Unit test is required and put it in `test/runtests.jl`.
  * Use Github Action CI for autometic testing.

