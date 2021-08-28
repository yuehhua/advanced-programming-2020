import numpy as np
import random

from numpy.core.numeric import Infinity

board_size = 8
initial_pos = (random.randint(0,board_size -1), random.randint(0,board_size -1))

class Knight_tour:

    def __init__(self, size, initial_pos):
        self.size = size
        self.x = initial_pos[0]
        self.y = initial_pos[1]
        self.board = np.zeros((self.size, self.size))

    def possible_step(self):

        pos_x = (2, 1, 2, 1, -2, -1, -2, -1)
        pos_y = (1, 2, -1, -2, 1, 2, -1, -2)
        next_pos = []

        for i in range(self.size):
            if self.x + pos_x[i] >= 0 and self.x + pos_x[i] < self.size and self.y + pos_y[i] >= 0 and self.y + pos_y[i] < self.size:
                next_pos.append([self.x + pos_x[i], self.y + pos_y[i]])

        return next_pos

    def solver(self):
        for i in range(1000):




chessboard = [[]]









