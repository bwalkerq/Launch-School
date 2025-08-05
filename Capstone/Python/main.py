from nis import match

first = 'Benji'
last = 'Walker'

# print(first + ' ' + last)
# print(f'{first} {last}')

# print('5' + '10')
# print(int('5') + int('10'))

balance = 1000
balance *= 1.10
# print(balance)

# obj = 'ABcd'        #assignment
# obj.upper()         #none
# obj = obj.lower()   #re
# print(len(obj))     #none
# obj = list(obj)
#                     # re to a list
# obj.pop()
#                     # mutate
# obj[2] = 'X'
#                     # mutate
# obj.sort()
#                     # mutate
# set(obj)
#                     # none
# obj = tuple(obj)
#                     # re

def say():
    print('Hello')

# say()

greeting = 'Salutations'

def well_howdy(who):
    print(f'{greeting}, {who}')

# well_howdy('Angie')
# print(greeting)

# Flow Control exercises
# print(False or (True and False)) # f
# print(True or (1 + 2))           #  t
# print((1 + 2) or True)           #  true, nope, 3
# print(True and (1 + 2))          #    true, nope 3
# print(False and (1 + 2))         #
# print((1 + 2) and True)          #
# print((32 * 4) >= 129)           #
# print(False != (not True))       #
# print(True == 4)                #
# print(False == (847 == '847'))   #

def even_or_odd(num):
    if num % 2 == 0:
        return 'even'
    else:
        return 'odd'

# print(even_or_odd(10))
# print(even_or_odd(11))

def uppercase_longer_than_ten(word):
    if len(word) > 10:
        return word.upper()
    else:
        return word

def number_range(num):
    if num < 0:
        print(f'{num} is less than 0')
    elif num > 100:
        print(f'{num} is greater than 100')
    elif num > 50:
        print(f'{num} is between 51 and 100')
    else:
        print(f'{num} is between 0 and_expr 50')

# number_range(0)     # 0 is between 0 and 50
# number_range(25)    # 25 is between 0 and 50
# number_range(50)    # 50 is between 0 and 50
# number_range(75)    # 75 is between 51 and 100
# number_range(100)   # 100 is between 51 and 100
# number_range(101)   # 101 is greater than 100
# number_range(-1)    # -1 is less than 0

# stuff = ('hello', 'world', 'bye', 'now')
# myList=list(stuff)
# myList[2]='baby'
# stuff=tuple(myList)
# print(stuff)

pi = 3.141592
str_pi = str(pi)
# print(str_pi)


range(7)            # 0 - 6
range(1, 6)         # 1 - 5
range(3, 15, 4)     # 3,7,11
range(3, 8, -1)     # ? nothing?, no. [] an empty array
range(8, 3, -1)     # 8 - 4 descending

print(list(range(3, 17, 4))) # because ranges are "lazy lists"

# this is a set declaration (not a dict)
names = { 'Chris', 'Clare', 'Karis', 'Karl',
          'Max', 'Nick', 'Victor' }
print(names)
# sets are unordered, so printing this will likely not output the same order





















