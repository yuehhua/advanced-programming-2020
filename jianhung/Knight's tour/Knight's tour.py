#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import random

class Knight_tour():

    def __init__(self, size, record_map):
        self.size = size
        self.record_map = record_map
        
    def step_options(self, knight):
        dirs = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]]
        options = [[knight[0]+i[0], knight[1]+i[1]] for i in dirs]
        i = 0
        while i != len(options):
            if options[i][0] > (self.size-1) or options[i][0] < 0 or options[i][1] > (self.size-1) or options[i][1] < 0:
                del options[i]
            else:
                i += 1       
        return [step for step in options if Knight_tour.visitable(self, step)]

    def visitable(self, knight):
        return knight[0] > -1 and knight[0] < self.size and knight[1] > -1 and knight[1] < self.size and not knight in self.record_map

    def next_step(self, options):
        NextTwoStepOptions = [Knight_tour.step_options(self, knight) for knight in options]
        min_index = 0
        index_list = [0]

        for i in range(1,len(options)):
            if len(NextTwoStepOptions[min_index]) > len(NextTwoStepOptions[i]):
                min_index = i
                index_list = list()
                index_list.append(min_index)
            elif len(NextTwoStepOptions[min_index]) == len(NextTwoStepOptions[i]):
                index_list.append(i)
            else:
                pass
        return options[random.choice(index_list)]
    
    def main(self, knight):
        self.record_map.append(knight)
        for i in range(1, self.size**2):
            options = Knight_tour.step_options(self, knight)
            if len(options) == 0:
                break
            if len(options) == 1:
                knight = options[0]
            else:
                knight = Knight_tour.next_step(self, options)
            self.record_map.append(knight)
        return self.record_map

for i in range(8):
    for j in range(8):
        tour  = Knight_tour(8, list())
        route = tour.main([i,j])
        print('start from', [i,j])
        print(route)





    

    
    





            
    




        


        



                









        






















































