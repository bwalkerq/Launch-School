import unittest
from custom_set import CustomSet

class CustomSetTest(unittest.TestCase):

    # @unittest.skip
    def test_empty(self):
        self.assertTrue(CustomSet().is_empty())

    # @unittest.skip
    def test_not_empty(self):
        set = CustomSet([1])
        self.assertFalse(set.is_empty())

    # @unittest.skip
    def test_empty_does_not_contain(self):
        set = CustomSet()
        self.assertFalse(set.contains(1))

    # @unittest.skip
    def test_does_contain(self):
        set = CustomSet([1, 2, 3])
        self.assertTrue(set.contains(1))

    # @unittest.skip
    def test_set_does_not_contain(self):
        set = CustomSet([1, 2, 3])
        self.assertFalse(set.contains(4))

    # @unittest.skip
    def test_subset_empty(self):
        empty_set = CustomSet()
        self.assertTrue(empty_set.is_subset(CustomSet()))

    # @unittest.skip
    def test_empty_is_subset_of_non_empty(self):
        empty_set = CustomSet()
        self.assertTrue(empty_set.is_subset(CustomSet([1])))

    # @unittest.skip
    def test_non_empty_not_subset_of_empty(self):
        set = CustomSet([1])
        self.assertFalse(set.is_subset(CustomSet()))

    # @unittest.skip
    def test_set_is_subset_of_same_set_of_elements(self):
        set = CustomSet([1, 2, 3])
        self.assertTrue(set.is_subset(CustomSet([1, 2, 3])))

    # @unittest.skip
    def test_set_is_subset_of_larger_set(self):
        set = CustomSet([1, 2, 3])
        self.assertTrue(set.is_subset(CustomSet([4, 1, 2, 3])))
    # @unittest.skip
    def test_not_subset_when_different_elements(self):
        set = CustomSet([1, 2, 3])
        self.assertFalse(set.is_subset(CustomSet([4, 1, 3])))

    # @unittest.skip
    def test_disjoint_empty_set(self):
        empty_set = CustomSet()
        self.assertTrue(empty_set.is_disjoint(CustomSet()))
    # @unittest.skip
    def test_disjoint_empty_and_non_empty(self):
        empty_set = CustomSet()
        self.assertTrue(empty_set.is_disjoint(CustomSet([1])))

    # @unittest.skip
    def test_disjoint_non_empty_and_empty(self):
        set = CustomSet([1])
        self.assertTrue(set.is_disjoint(CustomSet()))

    # @unittest.skip
    def test_disjoint_shared_element(self):
        set = CustomSet([1, 2])
        self.assertFalse(set.is_disjoint(CustomSet([2, 3])))

    # @unittest.skip
    def test_disjoint_no_shared_elements(self):
        set = CustomSet([1, 2])
        self.assertTrue(set.is_disjoint(CustomSet([3, 4])))

    # @unittest.skip
    def test_equal_empty(self):
        empty_set = CustomSet()
        self.assertTrue(empty_set.is_same(CustomSet()))

    # @unittest.skip
    def test_equal_empty_and_non_empty(self):
        empty_set = CustomSet()
        self.assertFalse(empty_set.is_same(CustomSet([1, 2, 3])))

#     @unittest.skip
    def test_equal_non_empty_and_empty(self):
        set = CustomSet([1, 2, 3])
        self.assertFalse(set.is_same(CustomSet()))

#     @unittest.skip
    def test_equal_same_elements(self):
        set = CustomSet([1, 2])
        self.assertTrue(set.is_same(CustomSet([2, 1])))

#     @unittest.skip
    def test_equal_different_elements(self):
        set = CustomSet([1, 2, 3])
        self.assertFalse(set.is_same(CustomSet([1, 2, 4])))

    # @unittest.skip
    def test_equal_duplicate_elements_do_not_matter(self):
        set = CustomSet([1, 2, 2, 1])
        self.assertTrue(set.is_same(CustomSet([2, 1])))

    # @unittest.skip
    def test_add_to_empty(self):
        set = CustomSet()
        set.add(3)
        self.assertEqual(set, CustomSet([3]))

    # @unittest.skip
    def test_add_to_non_empty(self):
        set = CustomSet([1, 2, 4])
        set.add(3)
        self.assertEqual(set, CustomSet([1, 2, 4, 3]))

    # @unittest.skip
    def test_add_existing_element(self):
        set = CustomSet([1, 2, 3])
        set.add(3)
        self.assertEqual(set, CustomSet([1, 2, 3]))

    # @unittest.skip
    def test_intersection_empty(self):
        set = CustomSet().intersection(CustomSet())
        self.assertEqual(set, CustomSet())

    # @unittest.skip
    def test_intersection_empty_and_non_empty(self):
        set = CustomSet().intersection(CustomSet([3, 2, 5]))
        self.assertEqual(set, CustomSet())

#     @unittest.skip
    def test_intersection_non_empty_and_empty(self):
        set = CustomSet([3, 2, 5]).intersection(CustomSet())
        self.assertEqual(set, CustomSet())

#     @unittest.skip
    def test_intersection_no_shared_elements(self):
        first_set = CustomSet([1, 2, 3])
        second_set = CustomSet([4, 5, 6])
        actual = first_set.intersection(second_set)
        self.assertEqual(actual, CustomSet())

    # @unittest.skip
    def test_intersection_shared_elements(self):
        first_set = CustomSet([1, 2, 3, 4])
        second_set = CustomSet([3, 2, 5])
        actual = first_set.intersection(second_set)
        self.assertEqual(actual, CustomSet([2, 3]))

    # @unittest.skip
    def test_difference_empty(self):
        actual = CustomSet().difference(CustomSet())
        self.assertEqual(actual, CustomSet())

    # @unittest.skip
    def test_difference_empty_and_non_empty(self):
        actual = CustomSet().difference(CustomSet([3, 2, 5]))
        self.assertEqual(actual, CustomSet())

#     @unittest.skip
    def test_difference_non_empty_and_empty(self):
        actual = CustomSet([1, 2, 3, 4]).difference(CustomSet())
        self.assertEqual(actual, CustomSet([1, 2, 3, 4]))
    # @unittest.skip
    def test_difference_non_empty_sets(self):
        actual = CustomSet([3, 2, 1]).difference(CustomSet([2, 4]))
        self.assertEqual(actual, CustomSet([3, 1]))

    # @unittest.skip
    def test_union_empty(self):
        actual = CustomSet().union(CustomSet())
        self.assertEqual(actual, CustomSet())

#     @unittest.skip
    def test_union_empty_and_non_empty(self):
        actual = CustomSet().union(CustomSet([2]))
        self.assertEqual(actual, CustomSet([2]))

#     @unittest.skip
    def test_union_non_empty_and_empty(self):
        actual = CustomSet([1, 3]).union(CustomSet())
        self.assertEqual(actual, CustomSet([1, 3]))

#     @unittest.skip
    def test_union_non_empty_sets(self):
        actual = CustomSet([1, 3]).union(CustomSet([2, 3]))
        self.assertEqual(actual, CustomSet([1, 2, 3]))

if __name__ == '__main__':
    unittest.main()