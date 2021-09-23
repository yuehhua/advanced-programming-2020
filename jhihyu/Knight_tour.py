import numpy as np
import random

# 8 steps
next_step = [(2,1), (1,2), (2,-1), (1,-2), (-2,1), (-1,2), (-2,-1), (-1,-2)]




class KnightTour:

    def __init__(self, size):
        self.size = size
        self.chessboard = np.zeros((self.size, self.size))

    # randon initional position
    def initiate_pos(self):
        return (random.randint(0,self.size -1), random.randint(0,self.size -1))

    # check the history that it is a avalivable step which is never visiting.
    def check_his(self, new_x, new_y):
        return self.chessboard[new_x][new_y] == 0

    # check next step not out of the chessboard    
    def check_pos(self, new_x, new_y):
        return new_x >= 0 and new_x < self.size and new_y >= 0 and new_y < self.size

    # next step
    def move(self, x, y):
        next_pos = []
        for step in range(8):
            new_x = x + next_step[step][0]
            new_y = y + next_step[step][1]
            if  self.check_pos(new_x, new_y) and self.check_his(new_x, new_y):
                next_pos.append([new_x, new_y])
        return next_pos

    # find all steps
    def travel(self, init_x, init_y):
        counter = 1
        self.chessboard[init_x][init_y] = counter
        result = True
        
        total_steps = self.size**2
        for i in range(total_steps):
            pos = self.move(init_x, init_y)
            if len(pos) == 0:
                result = False
                break
            
            else :
                first_step = pos[0]
                
                # move to the bound position first
                for j in pos:
                    if len(self.move(j[0], j[1])) <= len(self.move(first_step[0], first_step[1])):
                        first_step = j
                
                init_x = first_step[0]
                init_y = first_step[1]
                counter += 1
                self.chessboard[init_x][init_y] = counter
                
        return result

if __name__ == '__main__':

    # chessboard size
    board_size = int(input("Please enter the n of the n*n chessboard :"))

    test = KnightTour(board_size)

    # initional position
    x, y = test.initiate_pos()
    result = test.travel(x, y)

    # find all steps
    while not result:
        test = KnightTour(board_size)
        x, y = test.initiate_pos()
        result = test.travel(x, y)

    print('Success!')
    print('Pathway :')
    print(test.chessboard)