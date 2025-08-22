"""
create a clock
each clock object has a time that can add or subtract minutes, but a new clock object is created??
two clock objects with the same time should be equal

e:
alpha = new clock at 1
alpha.add(30) # this returns...a new clock object for 1:30 and alpha stores that?
bravo = new clock(1:30)
bravo == alpha # True

d: dealing with arithmetic and separate hours and minutes

"""
import math

class Clock:
    def __init__(self, hours, minutes=0):
        self._hours = hours
        self._minutes = minutes
        self.time = self.create_time(hours, minutes)

    def __str__(self):
        return self.time

    @classmethod
    def at(cls, hours, minutes=0):
        return Clock(hours, minutes)

    @staticmethod
    def create_time(hours, minutes):
        hours = hours % 24
        hours_string = str(hours) if hours >= 10 else f'0{hours}'
        minutes = str(minutes) if minutes >= 10 else f'0{minutes}'
        return hours_string + ':' + str(minutes)

    def __eq__(self, other):
        return self.time == other.time

    def __add__(self, other):
        new_hours = self._hours + (math.floor(other / 60))
        new_minutes = self._minutes + other % 60
        return Clock(new_hours, new_minutes)

    def __sub__(self, other):
        new_hours = (self._hours - (math.floor(other / 60))) % 24
        if self._minutes < other  % 60:
            new_hours = (new_hours - 1) % 24
        new_minutes = (self._minutes - other % 60) % 60
        return Clock(new_hours, new_minutes)

print(Clock.at(4))
"""
subtract:
30 - 40 needs to equal 50
"""
print(-3 % 10)
print(-10 % 60)