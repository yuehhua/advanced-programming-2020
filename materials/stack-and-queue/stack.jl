struct Stack{T}
    content::Vector{T}
    Stack{T}() where {T} = new(T[])
end

st = Stack{Int64}()
println(st)

import Base: push!, pop!

push!(st::Stack{T}, x::T) where {T} = pushfirst!(st.content, x); st

pop!(st::Stack) = popfirst!(st.content)

println(push!(st, 5))
println(push!(st, 3))
println(push!(st, 1))

println(pop!(st))

function Base.show(io::IO, st::Stack{T}) where {T}
    print("Stack{$T} [")
    for x = st.content[1:end-1]
        print(x, ", ")
    end
    print(st.content[end], "]")
end

println(st)
