"""
P: given a letter, build a diamond with the letter at the widest point.
the diamond is the expected shape

E: A just returns A
B would be _A_, then B_B (note the spacing is important here), then _A_
total places used across is 3
_A_
B_B
_A_

C: the 3rd letter, let's say i = 2
total places used across is 5 (i * 2 + 1)
__A__
_B_B_   total spaces is 3, here, 1,1,1
C___C   3 spaces in the middle
_B_B_
__A__

D: 4th letter, i = 3
total places used across is 7 (i * 2 + 1 = 3 * 2 + 1 = 7)
___A___
__B_B__     7 spaces, always two letters except first and last row, so i - 1, B, 1, B, i - 1
_C___C_     i - 2 ,      C, 3, C i-2
D_____D     i-3 (0),    D, 5, D
_C___C_
__B_B__
___A___

D:
I think there's just the array to hold each entry
make the first half and double, chop duplicate middle, reverse, concat, then join everything with new lines

Algo:
take the letter
find the position, i, with zero-based index
tail = i
start with a list
push tail spaces + A + tail spaces
decrement tail
mid = 1

then for each letter up to the target letter...
     push tail + letter + mid + letter + tail
     decrement tail by 1
     increment mid by 2

copy the array and reverse it, then chop the first entry off (the duplicate target letter)

concat the arrays
join them with newlines

"""
from pstats import add_func_stats


class Diamond:
    ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    def __init__(self, letter: str):
        self.letter = letter.upper()
        self.position = self._get_letter_position()

    @staticmethod
    def _get_letter_position(letter):
        return ord(letter.upper()) - ord('A')

    @classmethod
    def make_diamond(cls, letter: str):
        if letter == 'A':
            return 'A\n'

        result = []
        idx = cls._get_letter_position(letter)
        tail = idx * ' '
        result.append(tail + 'A' + tail)
        mid = ' ' # 1 space for the 'B' line...

        letters = cls.ALPHABET[1: idx + 1]

        for char in letters:
            tail = tail[1:]     # subtract a space
            result.append(tail + char + mid + char + tail)
            mid = mid + '  '    # add two spaces

        clone = result[::-1]
        clone = clone[1:]
        result += clone
        result = '\n'.join(result)

        return result + '\n'

# print(Diamond.make_diamond('c'))