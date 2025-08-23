import unittest
from simple_linked_list import SimpleLinkedList, Element

class LinkedListTest(unittest.TestCase):

    # @unittest.skip
    def test_element_datum(self):
        element = Element(1)
        self.assertEqual(1, element.datum)

    # @unittest.skip
    def test_element_tail(self):
        element = Element(1)
        self.assertTrue(element.is_tail())

    # @unittest.skip
    def test_element_next_default(self):
        element = Element(1)
        self.assertIsNone(element.next)

    # @unittest.skip
    def test_element_next_initialization(self):
        element1 = Element(1)
        element2 = Element(2, element1)
        self.assertEqual(element1, element2.next)

    # @unittest.skip
    def test_empty_list_size(self):
        lst = SimpleLinkedList()
        self.assertEqual(0, lst.size)

    # @unittest.skip
    def test_empty_list_empty(self):
        lst = SimpleLinkedList()
        self.assertTrue(lst.is_empty())

    # @unittest.skip
    def test_pushing_element_on_list(self):
        lst = SimpleLinkedList()
        lst.push(1)
        self.assertEqual(1, lst.size)

    # @unittest.skip
    def test_empty_list_1_element(self):
        lst = SimpleLinkedList()
        lst.push(1)
        self.assertFalse(lst.is_empty())

    # @unittest.skip
    def test_peeking_at_list(self):
        lst = SimpleLinkedList()
        lst.push(1)
        self.assertEqual(1, lst.size)
        self.assertEqual(1, lst.peek())

    # @unittest.skip
    def test_peeking_at_empty_list(self):
        lst = SimpleLinkedList()
        self.assertIsNone(lst.peek())

    # @unittest.skip
    def test_access_head_element(self):
        lst = SimpleLinkedList()
        lst.push(1)
        self.assertIsInstance(lst.head, Element)
        self.assertEqual(1, lst.head.datum)
        self.assertTrue(lst.head.is_tail())

    # @unittest.skip
    def test_items_are_stacked(self):
        lst = SimpleLinkedList()
        lst.push(1)
        lst.push(2)
        self.assertEqual(2, lst.size)
        self.assertEqual(2, lst.head.datum)
        self.assertEqual(1, lst.head.next.datum)

    # @unittest.skip
    def test_push_10_items(self):
        lst = SimpleLinkedList()
        for datum in range(1, 11):
            lst.push(datum)
        self.assertEqual(10, lst.size)
        self.assertEqual(10, lst.peek())

    # @unittest.skip
    def test_pop_1_item(self):
        lst = SimpleLinkedList()
        lst.push(1)
        self.assertEqual(1, lst.pop())
        self.assertEqual(0, lst.size)

    # @unittest.skip
    def test_popping_frenzy(self):
        lst = SimpleLinkedList()
        for datum in range(1, 11):
            lst.push(datum)
        for _ in range(6):
            lst.pop()
        self.assertEqual(4, lst.size)
        self.assertEqual(4, lst.peek())

    # @unittest.skip
    def test_from_a_empty_list(self):
        lst = SimpleLinkedList.from_list([])
        self.assertEqual(0, lst.size)
        self.assertIsNone(lst.peek())

    # @unittest.skip
    def test_from_a_nil(self):
        lst = SimpleLinkedList.from_list(None)
        self.assertEqual(0, lst.size)
        self.assertIsNone(lst.peek())

    # @unittest.skip
    def test_from_a_2_element_list(self):
        lst = SimpleLinkedList.from_list([1, 2])
        self.assertEqual(2, lst.size)
        self.assertEqual(1, lst.peek())
        self.assertEqual(2, lst.head.next.datum)

    # @unittest.skip
    def test_from_a_10_items(self):
        lst = SimpleLinkedList.from_list(list(range(1, 11)))
        self.assertEqual(10, lst.size)
        self.assertEqual(1, lst.peek())
        self.assertEqual(10, lst.head.next.next.next.next.next.next.next.next.next.datum)

    # @unittest.skip
    def test_to_a_empty_list(self):
        lst = SimpleLinkedList()
        self.assertEqual([], lst.to_list())

    # @unittest.skip
    def test_to_a_of_1_element_list(self):
        lst = SimpleLinkedList.from_list([1])
        self.assertEqual([1], lst.to_list())
        self.assertEqual(1, lst.size)
        self.assertEqual(1, lst.peek())

    # @unittest.skip
    def test_to_a_of_2_element_list(self):
        lst = SimpleLinkedList.from_list([1, 2])
        self.assertEqual([1, 2], lst.to_list())
        self.assertEqual(2, lst.size)
        self.assertEqual(1, lst.head.datum)
        self.assertEqual(2, lst.head.next.datum)

    # @unittest.skip
    def test_reverse_2_element_list(self):
        lst = SimpleLinkedList.from_list([1, 2])
        lst_r = lst.reverse()
        self.assertEqual(2, lst_r.peek())
        self.assertEqual(1, lst_r.head.next.datum)
        self.assertTrue(lst_r.head.next.is_tail())

    # @unittest.skip
    def test_reverse_10_element_list(self):
        data = list(range(1, 11))
        lst = SimpleLinkedList.from_list(data)
        self.assertEqual(data[::-1], lst.reverse().to_list())

    # @unittest.skip
    def test_roundtrip_10_element_list(self):
        data = list(range(1, 11))
        self.assertEqual(data, SimpleLinkedList.from_list(data).to_list())

if __name__ == '__main__':
    unittest.main()