import unittest
from clock import Clock

class ClockTest(unittest.TestCase):
    # @unittest.skip
    def test_on_the_hour(self):
        self.assertEqual('08:00', str(Clock.at(8)))
        self.assertEqual('09:00', str(Clock.at(9)))
    # @unittest.skip
    def test_past_the_hour(self):
        self.assertEqual('11:09', str(Clock.at(11, 9)))
    # @unittest.skip
    def test_add_a_few_minutes(self):
        clock = Clock.at(10) + 3
        self.assertEqual('10:03', str(clock))
    # @unittest.skip
    def test_adding_does_not_mutate(self):
        old_clock = Clock.at(10)
        new_clock = old_clock + 3
        self.assertIsNot(new_clock, old_clock)
    # @unittest.skip
    def test_subtract_fifty_minutes(self):
        clock = Clock.at(0) - 50
        self.assertEqual('23:10', str(clock))
    # @unittest.skip
    def test_subtracting_does_not_mutate(self):
        old_clock = Clock.at(10)
        new_clock = old_clock - 50
        self.assertIsNot(new_clock, old_clock)
    # @unittest.skip
    def test_add_over_an_hour(self):
        clock = Clock.at(10) + 61
        self.assertEqual('11:01', str(clock))
    # @unittest.skip
    def test_wrap_around_at_midnight(self):
        clock = Clock.at(23, 30) + 60
        self.assertEqual('00:30', str(clock))
    # @unittest.skip
    def test_add_more_than_a_day(self):
        clock = Clock.at(10) + 3061
        self.assertEqual('13:01', str(clock))
    # @unittest.skip
    def test_subtract_a_few_minutes(self):
        clock = Clock.at(10, 30) - 5
        self.assertEqual('10:25', str(clock))
    # @unittest.skip
    def test_subtract_minutes(self):
        clock = Clock.at(10) - 90
        self.assertEqual('08:30', str(clock))
    # @unittest.skip
    def test_wrap_around_at_negative_midnight(self):
        clock = Clock.at(0, 30) - 60
        self.assertEqual('23:30', str(clock))
    # @unittest.skip
    def test_subtract_more_than_a_day(self):
        clock = Clock.at(10) - 3061
        self.assertEqual('06:59', str(clock))
    # @unittest.skip
    def test_equivalent_clocks(self):
        clock1 = Clock.at(15, 37)
        clock2 = Clock.at(15, 37)
        self.assertEqual(clock1, clock2)
    # @unittest.skip
    def test_non_equivalent_clocks(self):
        clock1 = Clock.at(15, 37)
        clock2 = Clock.at(15, 36)
        clock3 = Clock.at(14, 37)
        self.assertNotEqual(clock1, clock2)
        self.assertNotEqual(clock1, clock3)
    # @unittest.skip
    def test_wrap_around_backwards(self):
        clock1 = Clock.at(0, 30) - 60
        clock2 = Clock.at(23, 30)
        self.assertEqual(clock1, clock2)

if __name__ == '__main__':
    unittest.main()