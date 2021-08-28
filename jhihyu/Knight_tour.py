import numpy as np
import random


# chessboard size
board_size = int(input("Please enter the n of the n*n chessboard :"))


class Knight_tour:

    def __init__(self, size):
        self.size = size
        self.chessboard = np.zeros((self.size, self.size))
        self.result = "unknown"

    def possible_step(self, x, y):

        pos_x = (2, 1, 2, 1, -2, -1, -2, -1)
        pos_y = (1, 2, -1, -2, 1, 2, -1, -2)
        next_pos = []
        for step in range(8):
            if x + pos_x[step] >= 0 and x + pos_x[step] < self.size and y + pos_y[step] >= 0 and y + pos_y[step] < self.size and self.chessboard[x + pos_x[step]][y + pos_y[step]] == 0:   
                next_pos.append([x + pos_x[step], y + pos_y[step]])
            else:
                continue

        return next_pos

    def solver(self):
        size = self.size
        print('chessboard size :', size**2)

        while self.result != 'Success!':
            
            x, y = (random.randint(0,self.size -1), random.randint(0,self.size -1))
            counter = 1
            self.chessboard[x][y] = counter
            print('initial position :', (x , y))
            
            for i in range(size**2-1):
                pos = self.possible_step(x, y)
                if len(pos) == 0:
                    result = 'change another initial position'
                    self.result = result
                    print(result)
                    break
                else :
                    first_step = pos[0]
                    for j in pos:
                        if len(self.possible_step(j[0], j[1])) <= len(self.possible_step(first_step[0], first_step[1])):
                            first_step = j
                    
                    x = first_step[0]
                    y = first_step[1]
                    counter += 1
                    self.chessboard[x][y] = counter
                    
            
            if i == size**2-2:
                result = 'Success!'
                self.result = result
                print("Success!")
                print(self.chessboard)

Knight = Knight_tour(board_size)
Knight.solver()