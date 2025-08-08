# Comprehensions are insane
from itertools import product
from operator import index

from setuptools.command.build_ext import if_dl

cats_colors = {
    'Tess':   'brown',
    'Leo':    'orange',
    'Fluffy': 'gray',
    'Ben':    'black',
    'Kat':    'orange',
}

names = [ name.upper()
          for name in cats_colors
          if cats_colors[name] == 'orange'
          if name[0] == 'L' ]
# print(names) # ['LEO']

suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
ranks = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace',
]

deck = [ f'{rank} of {suit}'
         for suit in suits
         for rank in ranks ]
# print(deck)

# for dictionaries!
# { key: value for element in iterable if condition }


multiples_of_6 = [ number for number in range(20)
                   if number % 6 == 0 ]
# print(multiples_of_6)      # [0, 6, 12, 18]

squares = ( number * number for number in range(1, 6) )
# print(squares) # <generator object <genexpr> at 0x104e39a40>

# Note that I often overlook the different between a (tuple) and a [list].
# It took me a long time to figure out why these two expressions returned different objects.

# exercises:
# my_list = [6, 3, 0, 11, 20, 4, 17]
# for number in my_list:
#     print(number)
# index = 0
# while index < len(my_list):
#     print(my_list[index])

# for number in my_list:
#     if number > 5 and number % 2 == 1:
#         print(number)

# my_list = [
#     [1, 3, 6, 11],
#     [4, 2, 4],
#     [9, 17, 16, 0],
# ]
#
# for list in my_list:
#     for number in list:
#         if number % 2 == 0:
#             print(number)

my_list = [
    1, 3, 6, 11,
    4, 2, 4, 9,
    17, 16, 0,
]

# [USER_REQUEST]: ? 'even' : 'odd' for my_list
# comprehension = ['even' if number % 2 == 0 else 'odd' for number in my_list]
# print(comprehension)
# ORRRR
# def odd_or_even(number):
#     return 'even' if number % 2 == 0 else 'odd'
#
# result = [ odd_or_even(number)
#            for number in my_list ]
# print(result)

def find_integers(things):
    return [element
            for element in things
            if type(element) is int]

my_tuple = (1, 'a', '1', 3, [7], 3.1415,
            -4, None, {1, 2, 3}, False)

integers = find_integers(my_tuple)
# print(integers)                    # [1, 3, -4]


my_set = {
    'Fluffy',
    'Butterscotch',
    'Pudding',
    'Cheddar',
    'Cocoa',
}

my_sol = {name: len(name)
          for name in my_set
          if len(name) % 2 != 0}
# print(my_sol)

def factorial(num):
    p = 1
    for number in range(1, num + 1):
        p *= number
    return p

# print(factorial(1))   # 1
# print(factorial(2))   # 2
# print(factorial(3))   # 6
# print(factorial(4))   # 24
# print(factorial(5))   # 120
# print(factorial(6))   # 720
# print(factorial(7))   # 5040
# print(factorial(8))   # 40320
# print(factorial(25))  # 15511210043330985984000000

import random

highest = 10

while True:
    number = random.randrange(highest + 1)
    print(number)
    if number == highest:
        break