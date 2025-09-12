from datetime import date, timedelta


class Meetup:
    def __init__(self, year: int, month: int):
        self.year = year
        self.month = month
        self.last_day = self.make_last_day(year, month).day

    @staticmethod
    def make_last_day(year, month):
        if month == 12:
            return date(year + 1, 1, 1) - timedelta(days=1)
        else:
            return date(year,month + 1,1) - timedelta(days=1)

    def day(self, day_string, descriptor_string):
        day_string = day_string.lower()
        descriptor_string = descriptor_string.lower()

        start_days = {
            'first': 1,
            'second': 8,
            'third': 15,
            'fourth':22,
            'fifth':29,
            'last':22,
            'teenth':13
        }
        weekdays = {'monday':0, 'tuesday':1, 'wednesday':2, 'thursday':3, 'friday':4, 'saturday':5, 'sunday':6}
        first_possible = start_days[descriptor_string]
        last_possible = first_possible + 7 if first_possible + 7 <= self.last_day else self.last_day

        for num in range(first_possible, last_possible + 1):
            if weekdays[day_string] == date(self.year, self.month, num).weekday():
                return date(self.year, self.month, num)
        return None

"""
p:
given an meetup object with a month and year
and a weekday and descriptor for the .day method
return a date object that represents
    the descriptor and weekday as a date object
    
e:
if the first day of a month is a monday, and the descriptor is second tuesday
then .day would return a date object with the month and year, and then the day would be 9, 
since the first tuesday would be 2, and the second 7 after, so 2+7 =9

d: date module

a: I looked at the hints, and the thing that i definitely wouldn't have come up with right off the
bat is finding the last day of the month. I guess that allows for finding those edge case errors
right away.

their algo:
Convert the weekday and schedule descriptor to lowercase.
Calculate the first possible day of the month for the meetup.
Calculate the last possible day of the month for the meetup.
Search the range of possible days for the date that occurs on the desired day of the week
Return a date object for the first matching day or a value that indicates that a meetup date couldn't be found.



    
"""