"""
p: create a simple linked list data structure
each element can contain a number 1-10
the list must have methods to reverse the linked list (instance)
convert a list to linked list (class method)
convert a linked list to a list (instance method?)

e:

after successful solution:
the from_list class method below was good for me to write; it was the first time that
I was using a lamba function, which so far is similar to a JS => function.
it also was my first time using enumerate to pickup the index along with an element--although
I later refactored it out.


    @classmethod
    def from_list(cls, lst):
        `creates an instance of the class from a list of values`
        if not lst:
            return cls(None)
        # maps the values to elements
        elements = list(map(lambda datum: Element(datum), lst))
        # links the elements in linked list format
        for index in range(0, len(elements) - 1):
            elements[index].next = elements[index + 1]
        # returns a new class instance with the first element as the head
        return cls(elements[0] if elements else None)


"""
class SimpleLinkedList:
    def __init__(self, head=None):
        self._head = head

    @property
    def size(self):
        return self.find_size()

    def find_size(self):
        if self.is_empty():
            return 0

        counter = 0
        current = self._head
        while current is not None:
            counter += 1
            current = current.next

        return counter

    def is_empty(self):
        """returns True if the list has no elements"""
        return self._head is None

    def push(self, datum):
        """Adds a new element with the given datum to the head of the list."""
        new_element = Element(datum, self._head)
        self._head = new_element

    def peek(self):
        """returns the head without popping it"""
        return None if self.is_empty() else self._head.datum

    def pop(self):
        if self.is_empty():
            return None
        popped = self._head
        self._head = self._head.next
        return popped.datum

    @classmethod
    def from_list(cls, lst):
        """creates an instance of the class from a list of values"""
        if not lst:
            return cls(None)
        result = cls(None)
        for datum in lst[::-1]:
            result.push(datum)
        return result

    def to_list(self):
        result_list = []
        if not self._head:
            return result_list

        current = self._head
        while current is not None:
            result_list.append(current.datum)
            current = current.next

        return result_list

    def reverse(self):
        """reverses a list but with a larger than necessary time and space complexity"""
        return SimpleLinkedList.from_list(
            self.to_list()[::-1]
        )



class Element:
    def __init__(self, datum: int, nxt=None):
        if not 1 <= datum <= 10:
            raise ValueError("Value must be between 1 and 10")
        self.datum = datum
        self.next = nxt

    def is_tail(self):
        return self.next is None
