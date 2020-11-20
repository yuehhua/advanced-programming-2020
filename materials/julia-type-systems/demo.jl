for i in 1:10
    println(i^2)
end

π

i = 0
while i < 10
    i += 1
    println(i % 3)
end

if i > 3
    ....
else
    ....
end

function foo(a)
    println(a)
end

foo(3)

foo(a, b) = a + b

foo(2, 5)

x = () -> println("hello")
x()

map(x -> x + 5, [1,2,3,4,5])
(a, b) -> a + b
sum([1,2,3,4,5])

arr = [1,2,3,4,5]
results = []
for x in arr
    y = x + 5
    push!(results, y)
end

[x + 5 for x in arr]

ys = [3, 5, 1, 7, 9, 2]
sort
sort!

struct Time
    hour::Int64
    minute::Int64
    second::Int64
end

t = Time(6, 0, 0)

mutable struct Time2
    hour::Int64
    minute::Int64
    second::Int64
end

function add_hour(t::Time)
    Time(t.hour + 1, t.minute, t.second)
end

function add_hour(t::Time2)
    Time2(t.hour + 1, t.minute, t.second)
end

function add_hour!(t::Time2)
    t.hour += 1
    t
end