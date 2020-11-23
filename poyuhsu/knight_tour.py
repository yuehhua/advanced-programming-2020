import random

set1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
        41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]
dict1 = {'-17': [18,19,20,21,22,23,24,26,27,28,29,30,31,32,34,35,36,37,38,39,40,42,43,44,45,46,47,48,50,51,52,53,54,55,56,58,59,60,61,62,63,64],
         '-15': [17,18,19,20,21,22,23,25,26,27,28,29,30,31,33,34,35,36,37,38,39,41,42,43,44,45,46,47,49,50,51,52,53,54,55,57,58,59,60,61,62,63],
         '-10': [11,12,13,14,15,16,19,20,21,22,23,24,27,28,29,30,31,32,35,36,37,38,39,40,43,44,45,46,47,48,51,52,53,54,55,56,59,60,61,62,63,64],
         '-6' : [9,10,11,12,13,14,17,18,19,20,21,22,25,26,27,28,29,30,33,34,35,36,37,38,41,42,43,44,45,46,49,50,51,52,53,54,57,58,59,60,61,62],
         '6' : [3,4,5,6,7,8,11,12,13,14,15,16,19,20,21,22,23,24,27,28,29,30,31,32,35,36,37,38,39,40,43,44,45,46,47,48,51,52,53,54,55,56],
         '10': [1,2,3,4,5,6,9,10,11,12,13,14,17,18,19,20,21,22,25,26,27,28,29,30,33,34,35,36,37,38,41,42,43,44,45,46,49,50,51,52,53,54],
         '15': [2,3,4,5,6,7,8,10,11,12,13,14,15,16,18,19,20,21,22,23,24,26,27,28,29,30,31,32,34,35,36,37,38,39,40,42,43,44,45,46,47,48],
         '17': [1,2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,33,34,35,36,37,38,39,41,42,43,44,45,46,47]}
lesspath = {1,2,7,8,9,16,49,56,57,58,63,64}
set2 = list([])

get = 1
count = 0
ans1 = 0
ans2 = 0
ans3 = 0
ans4 = 0
ans5 = 0
ans6 = 0
ans7 = 0
ans8 = 0

lens1 = 0
lens2 = 0
getlist = []

for x in range(4501):
    if lens1 == 64:
        break
    Next = set1[0]
    set2.append(set1[0])
    get = 1
    count = 0

    if x == 4500:
        print("Not found")
        print(getlist)
        print("結束時list數量: ",lens2)
    
    if lens1 == 64:
        break
        
    while get != -1:
        set3 = set({})
        if Next in dict1['-17']:
            ans1 = Next - 17
            set3.add(ans1)
        else:
            pass
        if Next in dict1['-15']:
            ans2 = Next - 15
            set3.add(ans2)
        else:
            pass
        if Next in dict1['-10']:
            ans3 = Next - 10
            set3.add(ans3)
        else:
            pass
        if Next in dict1['-6']:
            ans4 = Next - 6
            set3.add(ans4)
        else:
            pass
        if Next in dict1['6']:
            ans5 = Next + 6
            set3.add(ans5)
        else:
            pass
        if Next in dict1['10']:
            ans6 = Next + 10
            set3.add(ans6)
        else:
            pass
        if Next in dict1['15']:
            ans7 = Next + 15
            set3.add(ans7)
        else:
            pass
        if Next in dict1['17']:
            ans8 = Next + 17
            set3.add(ans8)
        else:
            pass
        
        if list(set3.intersection(lesspath)) != [] and list(lesspath.intersection(set3.difference(set2))) != []:            
            get = random.choice(list(lesspath.intersection(set3.difference(set2))))
        else:
            get = random.choice(list(set3))
            
        count += 1
    
        if count > 1500:
            #print("結束時list數量: ",len(set2))
            lens1 = len(set2)
            if lens1 > lens2:
                lens2 = lens1
                getlist = list(set2)
            set2 = list([])
            break

        if get in set2:
            continue
        Next = get
        set2.append(get)
                
        if set(set1) == set(set2):
            lens1 = 64
            print(list(set2))
            print("結束時list數量: ",len(set2))
            print("第",x,"次找到")
        else:
            pass
        #有可能找不到，需再重跑幾次
