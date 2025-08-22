import unittest
from datetime import date
from meetups import Meetup

class MeetupTest(unittest.TestCase):

    @unittest.skip
    def test_second_tuesday_of_december_2013(self):
        meetup = Meetup(2013, 12)
        self.assertEqual(date(2013, 12, 10), meetup.day('Tuesday', 'second'))

    @unittest.skip
    def test_second_wednesday_of_january_2014(self):
        meetup = Meetup(2014, 1)
        self.assertEqual(date(2014, 1, 8), meetup.day('Wednesday', 'second'))

    @unittest.skip
    def test_second_thursday_of_february_2014(self):
        meetup = Meetup(2014, 2)
        self.assertEqual(date(2014, 2, 13), meetup.day('Thursday', 'second'))

    @unittest.skip
    def test_second_friday_of_march_2014(self):
        meetup = Meetup(2014, 3)
        self.assertEqual(date(2014, 3, 14), meetup.day('Friday', 'second'))

    @unittest.skip
    def test_second_saturday_of_april_2014(self):
        meetup = Meetup(2014, 4)
        self.assertEqual(date(2014, 4, 12), meetup.day('Saturday', 'second'))

    @unittest.skip
    def test_second_sunday_of_may_2014(self):
        meetup = Meetup(2014, 5)
        self.assertEqual(date(2014, 5, 11), meetup.day('Sunday', 'second'))

    @unittest.skip
    def test_third_monday_of_june_2014(self):
        meetup = Meetup(2014, 6)
        self.assertEqual(date(2014, 6, 16), meetup.day('Monday', 'third'))

    @unittest.skip
    def test_third_tuesday_of_july_2014(self):
        meetup = Meetup(2014, 7)
        self.assertEqual(date(2014, 7, 15), meetup.day('Tuesday', 'third'))

    @unittest.skip
    def test_third_wednesday_of_august_2014(self):
        meetup = Meetup(2014, 8)
        self.assertEqual(date(2014, 8, 20), meetup.day('Wednesday', 'third'))

    @unittest.skip
    def test_third_thursday_of_september_2014(self):
        meetup = Meetup(2014, 9)
        self.assertEqual(date(2014, 9, 18), meetup.day('Thursday', 'third'))

    @unittest.skip
    def test_third_friday_of_october_2014(self):
        meetup = Meetup(2014, 10)
        self.assertEqual(date(2014, 10, 17), meetup.day('Friday', 'third'))

    @unittest.skip
    def test_third_saturday_of_november_2014(self):
        meetup = Meetup(2014, 11)
        self.assertEqual(date(2014, 11, 15), meetup.day('Saturday', 'third'))

    @unittest.skip
    def test_third_sunday_of_december_2014(self):
        meetup = Meetup(2014, 12)
        self.assertEqual(date(2014, 12, 21), meetup.day('Sunday', 'third'))

    @unittest.skip
    def test_fourth_monday_of_january_2015(self):
        meetup = Meetup(2015, 1)
        self.assertEqual(date(2015, 1, 26), meetup.day('Monday', 'fourth'))

    @unittest.skip
    def test_fourth_tuesday_of_february_2015(self):
        meetup = Meetup(2015, 2)
        self.assertEqual(date(2015, 2, 24), meetup.day('Tuesday', 'fourth'))

    @unittest.skip
    def test_fourth_wednesday_of_march_2015(self):
        meetup = Meetup(2015, 3)
        self.assertEqual(date(2015, 3, 25), meetup.day('Wednesday', 'fourth'))

    @unittest.skip
    def test_fourth_thursday_of_april_2015(self):
        meetup = Meetup(2015, 4)
        self.assertEqual(date(2015, 4, 23), meetup.day('Thursday', 'fourth'))

    @unittest.skip
    def test_fourth_friday_of_may_2015(self):
        meetup = Meetup(2015, 5)
        self.assertEqual(date(2015, 5, 22), meetup.day('Friday', 'fourth'))

    @unittest.skip
    def test_fourth_saturday_of_june_2015(self):
        meetup = Meetup(2015, 6)
        self.assertEqual(date(2015, 6, 27), meetup.day('Saturday', 'fourth'))

    @unittest.skip
    def test_fourth_sunday_of_july_2015(self):
        meetup = Meetup(2015, 7)
        self.assertEqual(date(2015, 7, 26), meetup.day('Sunday', 'fourth'))

    @unittest.skip
    def test_fifth_monday_of_august_2015(self):
        meetup = Meetup(2015, 8)
        self.assertEqual(date(2015, 8, 31), meetup.day('Monday', 'fifth'))

    @unittest.skip
    def test_fifth_tuesday_of_september_2015(self):
        meetup = Meetup(2015, 9)
        self.assertEqual(date(2015, 9, 29), meetup.day('Tuesday', 'fifth'))

    @unittest.skip
    def test_fifth_wednesday_of_october_2015(self):
        meetup = Meetup(2015, 10)
        self.assertIsNone(meetup.day('Wednesday', 'fifth'))

    @unittest.skip
    def test_fifth_thursday_of_november_2015(self):
        meetup = Meetup(2015, 11)
        self.assertIsNone(meetup.day('Thursday', 'fifth'))

    @unittest.skip
    def test_fifth_friday_of_december_2015(self):
        meetup = Meetup(2015, 12)
        self.assertIsNone(meetup.day('Friday', 'fifth'))

    @unittest.skip
    def test_fifth_saturday_of_january_2016(self):
        meetup = Meetup(2016, 1)
        self.assertEqual(date(2016, 1, 30), meetup.day('Saturday', 'fifth'))

    @unittest.skip
    def test_fifth_sunday_of_february_2016(self):
        meetup = Meetup(2016, 2)
        self.assertIsNone(meetup.day('Sunday', 'fifth'))

    @unittest.skip
    def test_fifth_monday_of_february_2016(self):
        meetup = Meetup(2016, 2)
        self.assertEqual(date(2016, 2, 29), meetup.day('Monday', 'fifth'))

    @unittest.skip
    def test_last_monday_of_march_2016(self):
        meetup = Meetup(2016, 3)
        self.assertEqual(date(2016, 3, 28), meetup.day('Monday', 'last'))

    @unittest.skip
    def test_last_tuesday_of_april_2016(self):
        meetup = Meetup(2016, 4)
        self.assertEqual(date(2016, 4, 26), meetup.day('Tuesday', 'last'))

    @unittest.skip
    def test_last_wednesday_of_may_2016(self):
        meetup = Meetup(2016, 5)
        self.assertEqual(date(2016, 5, 25), meetup.day('Wednesday', 'last'))

    @unittest.skip
    def test_last_thursday_of_june_2016(self):
        meetup = Meetup(2016, 6)
        self.assertEqual(date(2016, 6, 30), meetup.day('Thursday', 'last'))

    @unittest.skip
    def test_last_friday_of_july_2016(self):
        meetup = Meetup(2016, 7)
        self.assertEqual(date(2016, 7, 29), meetup.day('Friday', 'last'))

    @unittest.skip
    def test_last_saturday_of_august_2016(self):
        meetup = Meetup(2016, 8)
        self.assertEqual(date(2016, 8, 27), meetup.day('Saturday', 'last'))

    @unittest.skip
    def test_last_sunday_of_september_2016(self):
        meetup = Meetup(2016, 9)
        self.assertEqual(date(2016, 9, 25), meetup.day('Sunday', 'last'))

    @unittest.skip
    def test_last_sunday_of_february_2015(self):
        meetup = Meetup(2015, 2)
        self.assertEqual(date(2015, 2, 22), meetup.day('Sunday', 'last'))

    @unittest.skip
    def test_teenth_monday_of_october_2016(self):
        meetup = Meetup(2016, 10)
        self.assertEqual(date(2016, 10, 17), meetup.day('Monday', 'teenth'))

    @unittest.skip
    def test_teenth_tuesday_of_november_2016(self):
        meetup = Meetup(2016, 11)
        self.assertEqual(date(2016, 11, 15), meetup.day('Tuesday', 'teenth'))

    @unittest.skip
    def test_teenth_wednesday_of_december_2016(self):
        meetup = Meetup(2016, 12)
        self.assertEqual(date(2016, 12, 14), meetup.day('Wednesday', 'teenth'))

    @unittest.skip
    def test_teenth_thursday_of_january_2017(self):
        meetup = Meetup(2017, 1)
        self.assertEqual(date(2017, 1, 19), meetup.day('Thursday', 'teenth'))

    @unittest.skip
    def test_teenth_friday_of_february_2017(self):
        meetup = Meetup(2017, 2)
        self.assertEqual(date(2017, 2, 17), meetup.day('Friday', 'teenth'))

    @unittest.skip
    def test_teenth_saturday_of_march_2017(self):
        meetup = Meetup(2017, 3)
        self.assertEqual(date(2017, 3, 18), meetup.day('Saturday', 'teenth'))

    @unittest.skip
    def test_teenth_sunday_of_april_2017(self):
        meetup = Meetup(2017, 4)
        self.assertEqual(date(2017, 4, 16), meetup.day('Sunday', 'teenth'))

if __name__ == '__main__':
    unittest.main()