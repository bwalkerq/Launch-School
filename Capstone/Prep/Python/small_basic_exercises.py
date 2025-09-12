## loops
# for num in range(0, 11, 2):
#     print(num)
from http.cookiejar import offset_from_tz_string

# for i in range(10,0,-1):
#     print(i)
# print("launch!")

# greeting = 'Aloha!'
# for _ in range(3):
#     print(greeting)

# for n in range(1,101):
#     print(n*2)

# lst = [1, 3, 7, 15]
# index = 0
#
# while index < len(lst):
#     print(lst[index])
#     index += 1

# friends = ['Sarah', 'John', 'Hannah', 'Dave']
# for f in friends:
#     print(f'Hello, {f}!')

# cities = ['Istanbul', 'Los Angeles', 'Tokyo', None,
#           'Vienna', None, 'London', 'Beijing', None]
#
# for city in cities:
#     if city is None:
#         continue
#     print(city)

# while True:
#     print("and on")
#     break

# fish_list = ['Dory', 'Marlin', 'Gill', 'Nemo', 'Bruce']
#
# for f in fish_list:
#     print(f)
#     if f == 'Nemo':
#         break

## Conditionals
# falsy values
# None -- the nothing
# false - the boolean false
# 0 -- the numerical false
# '' -- the string false
# followed by all the collection falses
    # []
    # {}
    # ()
    # set()
    # frozenset()
    # range(0)

# import random
# random_number = random.randint(0, 1)
# if random_number:
#     print('yes', random_number)
# else:
#     print('no')
#
# # ternary version:
# print('yes' if random_number else 'no')
#

# animal = 'horse'
#
# match animal:
#     case 'duck':
#         print('quack')
#     case 'squirrel':
#         print('nook nook')
#     case 'horse':
#         print('neigh')
#     case 'bird':
#         print('tweet tweet')
#     case _:
#         print('*cricket*')

# def multiply(a,b):
#     return a * b
#
# print(multiply(12, 4)      )# 48

# def compare_by_length(a,b):
#     if len(a) < len(b):
#         return -1
#     elif len(a) > len(b):
#         return 1
#     else:
#         return 0
#
# compare_by_length('patience', 'perseverance') # -1
# compare_by_length('strength', 'dignity')      #  1
# compare_by_length('humor', 'grace')           #  0

that = 'Captain Ruby'.split(' ')
that[1] = 'Python'
that = ' '.join(that)
print(that)

first_8 = 'Captain Ruby'[:8]
new_str = first_8 + 'Python'
print(new_str)      # Captain Python

all_words = 'Captain Ruby'.split(' ')
first_word = all_words[0]
new_str = first_word + ' Python'
print(new_str)      # Captain Python

new_str = 'Captain Ruby'.replace('Ruby', 'Python')
print(new_str)      # Captain Python















