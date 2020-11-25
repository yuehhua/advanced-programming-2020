# !/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
import random
#thepath is store how many path can go to each location.
thepath = np.array([[2,3,4,4,4,4,3,2],
                    [3,4,6,6,6,6,4,3],
                    [4,6,8,8,8,8,6,4],
                    [4,6,8,8,8,8,6,4],
                    [4,6,8,8,8,8,6,4],
                    [4,6,8,8,8,8,6,4],
                    [3,4,6,6,6,6,4,3],
                    [2,3,4,4,4,4,3,2]])
size = 8 
record_board=np.array([[0]*size for i in range(size)]) #創造一個負責記錄走過沒有的matrix
pth_order = [] #紀錄64個走過位置的順序

def main():
    count_loop=0 #計算跑了幾次迴圈了
    check = False #確認是否為騎士巡邏
    while(check==False):
        pth_order = [] #要清空順序的list
        for p in range(size): #將記錄走過的矩陣歸0
            for o in range(size):
                record_board[p][o]=0
        # 隨意選擇一格並改成1
        first_i = random.randint(0, size-1)
        first_j = random.randint(0, size-1)
        record_board[first_i][first_j] = 1
        # append該位置進入list
        pth_order.append([first_i,first_j])
        i = first_i
        j = first_j
        local_new = min_path(first_i, first_j)#下一個位置
    
        while(local_new!=[i,j]):#當四面八方不是0的時候
            record_board[local_new[0]][local_new[1]]=1 #把該位置記錄為1
            i = local_new[0] #記住本次位置的座標等等要比較是不是四面八方都是１
            j = local_new[1]
            pth_order.append(local_new)
            local_new = min_path(local_new[0], local_new[1]) #找尋下一個新位置

        check = np.all(record_board==1) #確認該矩陣是否是全為1的矩陣
        count_loop += 1 #若要重做就把計算跑了幾次while記下來
        
    
    print('Knights tour path order: \n',pth_order)
    print('How many loop can do it?: ', count_loop)
    
    return(0)
    

def min_path(x,y): #尋找下一個位置的函式
    #這一大段是土法煉鋼法的判斷會有幾個方向的走法
    if(x-1<0):
        if (y==0):            
            pathway = [[x+2,y+1],[x+1,y+2]]
        elif(y==1):
            pathway = [[x+2,y+1],[x+2,y-1],[x+1,y+2]]
        elif(2<=y and y<=5):
            pathway = [[x+2,y+1],[x+2,y-1],[x+1,y+2],[x+1,y-2]]
        elif(y == 6):
            pathway = [[x+2,y+1],[x+2,y-1],[x+1,y-2]]
        else:
            pathway = [[x+2,y-1],[x+1,y-2]]
    elif(x-2<0):
        if (y==0):            
            pathway = [[x+2,y+1],[x+1,y+2],[x-1,y+2]]
        elif(y==1):
            pathway = [[x+2,y+1],[x+2,y-1],[x+1,y+2],[x-1,y+2]]
        elif(2<=y and y<=5):
            pathway = [[x+2,y+1],[x+2,y-1],
                       [x+1,y+2],[x-1,y+2],
                       [x+1,y-2],[x-1,y-2]]
        elif(y==6):
            pathway = [[x+2,y+1],[x+2,y-1],[x+1,y-2],[x-1,y-2]]
        else:
            pathway = [[x+2,y-1],[x+1,y-2],[x-1,y-2]]
    elif(x-2>=0 and x+2<8):
        if (y==0):            
            pathway = [[x+2,y+1],[x-2,y+1],[x+1,y+2],[x-1,y+2]]
        elif(y==1):
            pathway = [[x+2,y+1],[x+2,y-1],
                       [x-2,y+1],[x-2,y-1],
                       [x+1,y+2],[x-1,y+2]]
        elif(2<=y and y<=5):
            pathway = [[x+2,y+1],[x+2,y-1],
                       [x-2,y+1],[x-2,y-1],
                       [x+1,y+2],[x-1,y+2],
                       [x+1,y-2],[x-1,y-2]]
        elif(y == 6):
            pathway = [[x+2,y+1],[x+2,y-1],
                       [x-2,y+1],[x-2,y-1],
                       [x+1,y-2],[x-1,y-2]]
        else:
            pathway = [[x+2,y-1],[x-2,y-1],[x+1,y-2],[x-1,y-2]]
        
    elif(x==6):
        if (y==0):            
            pathway = [[x-2,y+1],[x+1,y+2],[x-1,y+2]]
        elif(y==1):
            pathway = [[x-2,y+1],[x-2,y-1],
                       [x+1,y+2],[x-1,y+2]]
        elif(2<=y and y<=5):
            pathway = [[x-2,y+1],[x-2,y-1],
                       [x+1,y+2],[x-1,y+2],
                       [x+1,y-2],[x-1,y-2]]
        elif(y == 6):
            pathway = [[x-2,y+1],[x-2,y-1],[x+1,y-2],[x-1,y-2]]
        else:
            pathway = [[x-2,y-1],[x+1,y-2],[x-1,y-2]]
    elif(x==7):
        if (y==0):            
            pathway = [[x-2,y+1],[x-1,y+2]]
        elif(y==1):
            pathway = [[x-2,y+1],[x-2,y-1],[x-1,y+2]]
        elif(2<=y and y<=5):
            pathway = [[x-2,y+1],[x-2,y-1],[x-1,y+2],[x-1,y-2]]
        elif(y == 6):
            pathway = [[x-2,y+1],[x-2,y-1],[x-1,y-2]]
        else:
            pathway = [[x-2,y-1],[x-1,y-2]]
    
    min_temp = size+1 #先隨便最小的走法（但一定要比矩陣裡的所有數字大）
    for k in range(len(pathway)):
        #如果該位置能走的路徑最少並且他的那格沒有走過那就把它記錄下來等等要用
        if (min_temp>thepath[pathway[k][0]][pathway[k][1]]) and (record_board[pathway[k][0]][pathway[k][1]]!=1):
            min_temp = thepath[pathway[k][0]][pathway[k][1]]
            temp_local = k
    if min_temp == size+1:
        return([x,y]) #如果發現該位置四面八方能走的路都走過了，要回傳他自己本來的位置
    else:
        return(pathway[temp_local]) #如果可以走，就回傳下一個位置



if __name__ == "__main__":
    main()

