import random

count = 0    # record how many  times the cycle runs

# run the loop until finding the solution of 64 steps
while True:  
    # produce 8*8 lattices
    overall = set()
    for i in range(1,9):
        for j in range(1,9):
            overall.add((i, j))

    # produce a table that record the number of possible moves for each lattice in a dict
    table = dict()
    table = {(1,1):2, (2,1):3, (3,1):4, (4,1):4, (5,1):4, (6,1):4, (7,1):3, (8,1):2, 
    (1,2):3, (2,2):4, (3,2):6, (4,2):6, (5,2):6, (6,2):6, (7,2):4, (8,2):3,
    (1,3):4, (2,3):6, (3,3):8, (4,3):8, (5,3):8, (6,3):8, (7,3):6, (8,3):4,
    (1,4):4, (2,4):6, (3,4):8, (4,4):8, (5,4):8, (6,4):8, (7,4):6, (8,4):4,
    (1,5):4, (2,5):6, (3,5):8, (4,5):8, (5,5):8, (6,5):8, (7,5):6, (8,5):4,
    (1,6):4, (2,6):6, (3,6):8, (4,6):8, (5,6):8, (6,6):8, (7,6):6, (8,6):4,
    (1,7):3, (2,7):4, (3,7):6, (4,7):6, (5,7):6, (6,7):6, (7,7):4, (8,7):3,
    (1,8):2, (2,8):3, (3,8):4, (4,8):4, (5,8):4, (6,8):4, (7,8):3, (8,8):2 }

    r = 1    # represent the number of steps
    path = []    # record the steps which have already gone through

    # run the loop until there are 64 steps in path
    while r < 64:
        
        # initialize the point
        if r == 1:
            a = 1
            b = 1
            point = (a, b)
            print(point, r)
            overall.remove(point)
            path.append(point)
        else:    # steps after first point
            (a, b) = point

        # choices for current point
        choice = {(a+2, b+1), (a+1, b+2), (a+2, b-1), (a+1, b-2), (a-2, b+1), (a-1, b+2), (a-2, b-1), (a-1, b-2)}
        available = overall.intersection(choice)    # check the choices which are valid
        
        # compare the possible moves and choose the smallest one of these choices
        if available != set():
            s=100
            small_equal = []
            for n in available:
                if table[n]<s:
                    s = table[n]
                    point = n
                elif table[n] == s:
                    small_equal.append(point)
                    small_equal.append(n)
            # if the possible moves of more than two choices are the same, random choose from them
            if small_equal != []:
                point = random.choice(small_equal)

            path.append(point)
            overall.remove(point)    # remove the point from the valid set

            r = r + 1

        else:    # if there are no steps for next points,  jump out of this loop and reinitialize 
            count = count + 1
            break
        
        print(path[r-1],r)

    if r==64:    
        print(path)
        print(len(path))
        print("round =", count)
        break
