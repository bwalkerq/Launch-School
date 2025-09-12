# class Kid:
#
#     def __init__(self, name):
#         self.name = name
#
#     def play(self):
#         print("I'm playing")
#
# enty = Kid('Enty')
# olivia = Kid('Olivia')
#
# olivia.play()
from socket import send_fds
from threading import settrace


# class Car:
#     def __init__(self, model, year, color):
#         self._model = model
#         self._year = year
#         self.color = color
#         self.speed = 0
#
#     def start(self):
#         print(f"{self._model}'s engine is started")
#
#     def turn_off(self):
#         print('the engine is off')
#
#     def accelerate(self):
#         self.speed += 10
#         print('speeding up')
#
#     def decelerate(self):
#         self.speed -= 10
#         print('slowing down')
#
#     def current_speed(self):
#         print(f'The current speed is {self.speed}')
#
#     @property
#     def color(self):
#         return self._color
#
#     @color.setter
#     def color(self, color):
#         self._color = color
#
#     @property
#     def model(self):
#         return self._model
#
#     @property
#     def year(self):
#         return self._year
#
#     def spray_paint(self, color):
#         self.color = color
#         print(f'your car is now {self.color}')
#
#     @classmethod
#     def mileage(cls, miles, gallons):
#         print(f'this car has an average mileage of {miles/gallons}')

# sofia = Car('subi', '2022', 'green')
#
# sofia.start()
# sofia.accelerate()
# sofia.current_speed()
# sofia.accelerate()
# sofia.current_speed()
# sofia.decelerate()
# sofia.decelerate()
# sofia.current_speed()
# sofia.turn_off()
# sofia.spray_paint('blue')
# Car.mileage(100,4)
class SignalsMixin:
    def signal_left(self):
        print('left')

    def signal_right(self):
        print('right')

    def signal_off(self):
        print('signal off')


class Vehicle:

    counter = 0

    def __init__(self):
        Vehicle.counter += 1

    @classmethod
    def vehicles(cls):
        return Vehicle.counter

class Car(SignalsMixin, Vehicle):
    def __init__(self):
        super().__init__()

class Truck(SignalsMixin, Vehicle):
    def __init__(self):
        super().__init__()

class Boat(Vehicle):
    def __init__(self):
        super().__init__()


# print(Car.vehicles())     # 0
car1 = Car()
# print(Car.vehicles())     # 1
car2 = Car()
car3 = Car()
car4 = Car()
# print(Car.vehicles())     # 4
truck1 = Truck()
truck2 = Truck()
# print(Truck.vehicles())   # 6
boat1 = Boat()
boat2 = Boat()
# print(Boat.vehicles())    # 8

# car1.signal_left()       # Signalling left
# truck1.signal_right()    # Signalling right
# car1.signal_off()        # Signal is now off
# truck1.signal_off()      # Signal is now off
# boat1.signal_left()
print(Car.mro())
print(Truck.mro())
# AttributeError: 'Boat' object has no attribute
# 'signal_left'





















