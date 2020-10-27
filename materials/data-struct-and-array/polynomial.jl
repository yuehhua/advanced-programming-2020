import Base: push!, +

struct Polynomial{T}
    coefs::Vector{T}
    orders::Vector{Int64}

    Polynomial{T}() where {T} = new(T[], Int64[])
end

function push!(p::Polynomial{T}, coef::T, order) where {T}
    if isempty(p.coefs) || p.orders[end] < order
        push!(p.coefs, coef)
        push!(p.orders, order)
    elseif p.orders[1] > order
        pushfirst!(p.coefs, coef)
        pushfirst!(p.orders, order)
    else
        for i = 1:length(p.orders)
            if p.orders[i] > order
                insert!(p.coefs, i, coef)
                insert!(p.orders, i, order)
                break
            end
        end
    end
    p
end

function Base.show(io::IO, p::Polynomial{T}) where {T}
    print("Polynomial{$T} ")
    if length(p.orders)  == 0
    elseif length(p.orders) == 1
        print(p.coefs[1], "x^", p.orders[1])
    else
        for i = 1:length(p.orders)-1
            print(p.coefs[i], "x^", p.orders[i], " + ")
        end
        print(p.coefs[end], "x^", p.orders[end])
    end
end

function +(p1::Polynomial{T}, p2::Polynomial{T}) where {T}
    p = Polynomial{T}()

    for (i, order) in enumerate(p2.orders)

        coef2 = p2.coefs[i]
        if order in p1.orders
            coef1 = findall(order1->order1==order, p1.orders)[1]
            coef1 = p1.coefs[coef1]

            coef = coef1 + coef2
            push!(p, coef, order)
        else
            push!(p, coef2, order)
        end
    end

    for (i, order) in enumerate(p1.orders)
        if !(order in p.orders)
            push!(p, p1.coefs[i], order)
        end
    end
    p
end

function main()
    p1 = Polynomial{Float64}()
    println(p1)
    push!(p1, 3.5, 2)
    push!(p1, 2.0, 5)
    push!(p1, 4.5, 1)
    push!(p1, 2.7, 4)
    println(p1)

    p2 = Polynomial{Float64}()
    println(p2)
    push!(p2, 3.5, 1)
    push!(p2, 7.0, 5)
    push!(p2, 4.4, 8)
    push!(p2, 2.5, 3)
    push!(p2, 0.5, 2)
    println(p2)

    p = p1 + p2
    println(p)
end

main()