"""
p: implement a custom set
the values in the set must be numbers

if a duplicate number is added, the set doesn't add it
there must be other characteristics?
instantiated from a list of elements
    an empty list

is_empty()
    True if no elements
is_subset()
    True if all the elements in the calling instance are included in the argument set




"""
from wsgiref.util import request_uri


class CustomSet:
    def __init__(self, lst=None):
        self.elements = self.make_set(lst)

    @staticmethod
    def make_set(lst):
        if lst is None:
            return []
        result = []
        for el in lst:
            if el not in result:
                result.append(el)
        return result

    def is_empty(self):
        return self.elements == []

    def contains(self, el):
        return el in self.elements

    def is_subset(self, other):
        for el in self.elements:
            if el not in other.elements:
                return False
        return True

    def is_disjoint(self, other):
        for el in self.elements:
            if el in other.elements:
                return False
        return True

    def is_same(self,other):
        return all(el in other.elements for el in self.elements) and all(el in self.elements for el in other.elements)

    def __eq__(self, other):
        return self.is_same(other)

    def add(self, el):
        if el not in self.elements:
            self.elements.append(el)

    def intersection(self,other):
        result = []
        for el in self.elements:
            if el in other.elements:
                result.append(el)
        return CustomSet(result)

    def difference(self, other):
        result = []
        for el in self.elements:
            if el not in other.elements:
                result.append(el)
        return CustomSet(result)

    def union(self, other):
        return CustomSet(self.elements + other.elements)