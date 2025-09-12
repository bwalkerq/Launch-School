# Write Python code to print the seventh number of range(0, 25, 3).
# a = range(0, 25, 3)
# print(a[6])

# b = 'Launch School'
# print(b[4:10])
# my_str = 'Launch School'
# start = my_str.find('c')
# print(my_str[start:start + 6])        # ch Sch


# my_tuple = (1, 2, 3, 4, 5)
# # my_list = list(my_tuple)
# # my_list = my_list[1:-1]
# # my_new_tuple = tuple(my_list)
# # print(my_new_tuple)
# result = my_tuple[::-1]
# result = result[1:-1]
# print(result)

# pets = {
#     'Cat':  'Meow',
#     'Dog':  'Bark',
#     'Bird': 'Tweet',
# }
#
# print(pets['Dog'])
# print(pets.get('Lizard', '<silence>'))

info = 'xyz:*:42:42:Lee Kim:/home/xyz:/bin/zsh'
# result = info.split(':')
# result = '+'.join(result)
# print(result)
# result = info.replace(':', '+')
# print(result)


print('johnson' in 'Joe Johnson')           #
print('sen' not in 'Joe Johnson')           # t
print('Joe J' in 'Joe Johnson')             #  t
print(5 in range(5))                        #
print(5 in range(6))                        # t
print(5 not in range(5, 10))                #
print(0 in range(10, 0, -1))                #
print(4 in {6, 5, 4, 3, 2, 1})              # t
print({1, 2, 3} in {1, 2, 3})               #  t nope false
print({3, 2} in {1, frozenset({2, 3})})     #  nope true???























