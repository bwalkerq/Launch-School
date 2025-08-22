"""
robot name
p: have a robot class where each robot has a name, and when it's rebooted, gets a new name
the name is two letters then 3 numbers
they should be random names
~~on reboot, the name can not be the same as last time~~
each instance of a robot should be unique
reboot mean new unique name among all the robot instances

e:
a robot is instantiated, assigned a random name
comes with a reboot method, which changes the robot's name
    checks for duplicate names, regenerates if it's a duplicate

d: class
property: name
method: reboot
    generates a new name and reassigns if it's not a duplicate

also a class variable, a set, to track all the names

a:
class variable that holds all previous names

in init,
    self.name = generate helper

generate name function
    while true
        use regex to create the name (asked AI)
        if that name is NOT included in the class variable
            break

reboot function
    reset the name
    this may involve a setter? get this far and feed lsbot for feedback

"""
import random
import string

class Robot:
    names = set()

    def __init__(self):
        self.name = self._name_generator()

    def reset(self):
        previous = self.name
        self.name = self._name_generator()
        self.names.discard(previous)

    @classmethod
    def _name_generator(cls):
        while True:
            letters = ''.join(random.choices(string.ascii_uppercase, k=2))
            digits = ''.join(random.choices(string.digits, k=3))
            name = letters + digits
            if name not in cls.names:
                cls.names.add(name)
                return name
