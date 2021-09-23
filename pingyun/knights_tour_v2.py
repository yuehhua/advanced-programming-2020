#!/usr/bin/env python
# coding: utf-8

# In[1]:


import random
import numpy as np
import time
import matplotlib.pyplot as plt


# In[2]:


#依據騎士的位置，將會超出格子的步法移除
def possible_steps(x,y,knight):
    #指定X(i),Y(j)方向分別可以走的距離
    #依據位置，將不可走的距離刪除
    moves_i=[-2,-1,1,2]
    
    if knight[0]<=1:
        moves_i.remove(-2)
        if knight[0]==0:
            moves_i.remove(-1)
    if knight[0]>=x-2:
        moves_i.remove(2)
        if knight[0]==x-1:
            moves_i.remove(1)
    
    moves_j=[-2,-1,1,2]
    
    if knight[1]<=1:
        moves_j.remove(-2)
        if knight[1]==0:
            moves_j.remove(-1)
    if knight[1]>=y-2:
        moves_j.remove(2)
        if knight[1]==y-1:
            moves_j.remove(1)
    #for i, for j, 若兩者之距離總合為3，將其加入可走步伐
    available=[[i,j] for i in moves_i for j in moves_j if abs(i)+abs(j)==3]
    return available


# In[3]:


#檢查棋盤是否有死路
def finddeadend(chessboard):
    #預設是沒有
    dead=False
    #對每個仍然標示為0(沒走過)的位置進行一次檢查，確認所有能到達的step
    for i in range(len(chessboard)):
        for j in range(len(chessboard)):
            if chessboard[i,j]==0:
                test=possible_steps(len(chessboard),len(chessboard[0]),[i,j])
                val=[chessboard[t[0]+i,t[1]+j] for t in test]
                #是否皆為1
                if sum(val)==len(val):
                    dead=True 
                    break
        if dead==True:
            break
    return  dead


# In[4]:


def draw_trace(trace):
    x=[i[0] for i in trace]
    y=[i[1] for i in trace]
    fig=plt.figure()
    fig, axs=plt.subplots()
    axs.grid(True)
    axs.plot(x,y)


# In[13]:


def knights_tour(x,y,knight=None):
    start_time = time.time()
    chessboard=np.zeros([x,y])
    #先決定騎士的初始位置，本來是完全隨機，後來決定從角落出發，增加效率
    if knight == None:
        knight=[random.randint(0,x-1),random.randint(0,y-1)]
    #紀錄騎士經過的位置
    trace=[]
    #紀錄每個位置可能走的步法
    options_list=[]
    retry=0
    #未走滿棋盤時都持續搜索
    while len(trace)<x*y:
        #檢查此時棋盤是否已有死路
        deadend=finddeadend(chessboard)
        #如果騎士剛抵達該點，產生對應之可能步法，將步法與該位置分別append   
        if knight not in trace:
            options_list.append(possible_steps(x,y,knight))
            trace.append(knight)
            chessboard[knight[0],knight[1]]=1
        #如果trace已走滿棋盤，離開迴圈
        if len(trace)==x*y:
            break
                    
        #如果該位置仍有未走過的步法
        if options_list[-1] != [] and deadend ==False:
            #隨機選擇一步，並將該步刪除避免重複行走
            pending=random.choice(options_list[-1])
            options_list[-1].remove(pending)
            #如果走出該步後的位置沒被騎士走過
            if [knight[0]+pending[0],knight[1]+pending[1]] not in trace:
                #將騎士設至新位置
                #chessboard[knight[0],knight[1]]=1
                knight=[knight[0]+pending[0],knight[1]+pending[1]]
                #print(knight)
            #反之則會回到上一步，再隨機選出新的一步
            
        #當該位置沒有可走的路時(死路)
        else:
            #if len(trace) >x*y-4:
                #print(knight,len(trace))
            #將該步從軌跡中刪除
            options_list.pop()
            trace.pop()
            chessboard[knight[0],knight[1]]=0
            #騎士回到上個位置
            knight=trace[-1]
            #retry+=1
            #每次回頭時，記錄當時走到哪，是第幾步
    #從上個位置還未走完的步法中，再次選擇新的一步
    print("--- %s seconds ---" % (time.time() - start_time))
    print(trace)
    draw_trace(trace)


# In[16]:


knights_tour(8,8)


# In[ ]:




