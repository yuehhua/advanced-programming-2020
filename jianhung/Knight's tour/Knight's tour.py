#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
from collections import defaultdict

tour_map = list()
record_map = list()
start = [3,3]


def step_options(position):
    options = list()
    for i in range(2):
        for j in range(2):
            for k in range(2):
                if i == 0:
                    elements = [1,2]
                else:
                    elements = [2,1]
                if j == 0 and k == 0:
                    options.append([position[0]+elements[0],position[1]+elements[1]])
                elif j == 0 and k == 1:
                    options.append([position[0]+elements[0],position[1]-elements[1]])
                elif j == 1 and k == 0:
                    options.append([position[0]-elements[0],position[1]+elements[1]])
                elif j == 1 and k == 1:
                    options.append([position[0]-elements[0],position[1]-elements[1]])
    
    clone = options.copy()
    for i in range(len(clone)):
        if clone[i][0] > 8 or clone[i][0] < 0 or clone[i][1] > 8 or clone[i][1] < 0:
            options.remove(clone[i])
    return options

record_map.append(start)
options = step_options(start)
n = 0

while len(record_map) != 64:  
    if n != 1:
        record_map.append(options[n])
    next_step = step_options(options[n])
    for j in step_options(options[n]):
        if j in record_map:
            next_step.remove(j)
    if len(next_step) != 0:
        options = next_step.copy()
        n = 0
    else:
        record_map.remove(options[n])
        options = step_options(record_map[-1])
        n += 1
print(record_map)


        


        



                









        






















































