
class: center, middle






# Homework






## Dequeue implementation






#### Yueh-Hua Tu


---






## Requirements


Implement a dequeue in Julia.


  * Implement a data structure of `Dequeue` based on array in Julia.
  * Able to push an element to the end of a dequeue.

      * `push!(deq::Dequeue, x)`
  * Able to pop an element from the end of a dequeue.

      * `pop!(deq::Dequeue)`
  * Able to push an element to the start of a dequeue.

      * `pushfirst!(deq::Dequeue, x)`
  * Able to pop an element from the end of a dequeue.

      * `popfirst!(deq::Dequeue)`


---




## Requirements


  * Don't use `push!`, `pop!`, `pushfirst!` and `popfirst!` provided by Julia.
  * Given a max length for construction of fixed-length dequeue.
  * Head and tail index are available for indicating a queue.
  * Circular structure is optional.

