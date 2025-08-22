import unittest
import re
import random
from robot_name import Robot

class RobotTest(unittest.TestCase):
    DIFFERENT_ROBOT_NAME_SEED = 1234
    SAME_INITIAL_ROBOT_NAME_SEED = 1000

    NAME_REGEXP = re.compile(r"^[A-Z]{2}\d{3}$")

    # @unittest.skip
    def test_has_name(self):
        self.assertTrue(self.NAME_REGEXP.match(Robot().name))

    # @unittest.skip
    def test_name_sticks(self):
        robot = Robot()
        self.assertEqual(robot.name, robot.name)

    # @unittest.skip
    def test_different_robots_have_different_names(self):
        random.seed(RobotTest.DIFFERENT_ROBOT_NAME_SEED)
        self.assertNotEqual(Robot().name, Robot().name)

    # @unittest.skip
    def test_reset_name(self):
        random.seed(RobotTest.DIFFERENT_ROBOT_NAME_SEED)
        robot = Robot()
        name1 = robot.name
        robot.reset()
        name2 = robot.name
        self.assertNotEqual(name1, name2)
        self.assertTrue(self.NAME_REGEXP.match(name2))

    # @unittest.skip
    def test_different_name_when_chosen_name_is_taken(self):
        random.seed(RobotTest.SAME_INITIAL_ROBOT_NAME_SEED)
        name1 = Robot().name
        random.seed(RobotTest.SAME_INITIAL_ROBOT_NAME_SEED)
        name2 = Robot().name
        self.assertNotEqual(name1, name2)

if __name__ == "__main__":
    unittest.main()