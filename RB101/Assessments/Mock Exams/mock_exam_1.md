# each, select, map
#each is a method, called with a block, that iterates through a collection and passes the value of each element of
the collection as an argument to the block. The truthiness of the block is not considered. 
The method returns the original collection.

The #select method returns a new collection whose size is less than or equal to the length of the original collection.
#select is called with a block, iterates through a collection and passes the value of each element as an
argument to the block. If block returns a truthy value, that element is appended to the new collection. If the block
evaluates as falsy, the element is not appended to the new collection.

The #map method returns a new collection that is the same size as the original collection. It's called with a block,
and iterates through the collection passing the value of each element as an argument to the block. The truthiness of
the block is not considered. The return value of the block is appended to the new collection in place of it's 
corresponding element from the original collection.


# Templates
We’ve initialized the variable `var_name` and assigned to it the `Integer_String_etc_object_value`.

# Practice Exam

You will have 3 hours to complete the test. This test has 23 questions. That is slightly less than 8 mins per question.

Suggested response format (based on feedback from other students & Srdjan’s blog post):

- What does the code output? What are the return values?
- Answer the why behind the output/return:
    - Focus only on the lines of code that deliver the output and return values.
- Summarize what the problem demonstrates and why: i.e. "This problem demonstrates the concept of local variable scope/etc…"
    - This can be at the beginning or end of your answer - personal preference.

The following questions are taken from the shared [RB109 Written Assessment: Practice Problems Google Doc](https://docs.google.com/document/d/16XteFXEm3lFbcavrXDZs45rNEc1iBxSYC8e4pLhT0Rw/edit#)

## 1

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

arr.select { |n| n.odd? }
```
We initialize the local variable `arr` and assign it the array  `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

We invoke the `select` method on `arr` and pass it a block as an argument, using `n` as a parameter. 
Each element of the `arr` is passed as an argument into the block, where the `odd?` method evaluates each element and returns 
`true` for the values that are odd, and returns `false` for the values that are not odd.

The `select` method returns a new array with the elements for which `true` was returned from the block, so the return value 
is the array `[1, 3, 5, 7, 9]`.

The code doesn't output anything.

This demonstrates the concept of passing a block to the `select` method, and it returning a subset of elements for which the block returns `true`.


## 2

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

new_array = arr.map do |n| 
  n > 1
end
p new_array
```
We’ve initialized the variable `arr` and assigned to it the array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`.

Then we’ve initialized the variable `new_array` and assigned to it the return value `arr.map` which will be an array.
`arr.map` is passed a block as an argument, using `n` as a parameter. Each element of the array is passed in as the argument
for `n` and evaluated against `n>1`, which returns a boolean. The first element is not greater than 1, so the block
returns `false`, which is the first element of `new_array`. All other elements are greater than 1, so the block 
returns `true`, and return of the method is the 10-element array `[false, true, ... , true]`, which is 
assigned to `new_array`.

then `p` operator outputs the array pointed to by `new_array`, and returns `nil`. 
This demonstrates passing a block to the #map method, which returns an array based on the return value of the block for each element; in this case all of the numbers except 1 are greater than 1, so the `n > 1` returns true for all but the first element.

## 3

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
{ a: "ant", b: "bear", c: "cat" }.all? do |key, value|
  value.length >= 3
end
```
We’ve invoked the `all?` method on the given hash, and passed a block as an argument with `key, value` as parameters.
The block invokes the `length` method on each value (all of which are strings), returning an `integer` that represents the length of the string.
Since the length of each string is greater than or equal to `3`, the block returns `true` for all three elements that are passed in as arguments, and since 
all of the elements return true, the `all?` method returns `true`, and has no output.

This demonstrates the concept of passing multiple parameters to a block, evaluating only one of the parameters, and invoking a method where the return value is dependant on all of the return values of the block.  

## 4

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
{ a: "ant", b: "bear", c: "cat" }.each_with_object({}) do |(key, value), hash|
  hash[value] = key
end
```
We’ve invoked the `each_with_object` method on the given hash, and passed an empty hash, `{}`, and a block as an argument with `(key, value)` as parameters and `hash` as the memo referencing the hash object.

With each key, value pair, the block essentially reverses the keys and values, assigning each value as a key whose value is the corresponding key and adds them to the new hash object.
The hash `{"ant" ==> :a, "bear" ==> :b, "cat" ==> :c` is returned, with no output. This demonstrates iterating over a collection with an object and a block, and returning the object.

## 5

What does the following code return? What does it output? Why? What concept does it demonstrate?

What are a, b, and c? What if the last line was `c = a.uniq!`?

```ruby
a = [1, 2, 3, 3]
b = a
c = a.uniq
```
We’ve initialized the variable `a` and assigned to it the array `[1, 2, 3, 3]`, which is also the return for that line. 
We’ve initialized the variable `b` and assigned to it the value of variable a, which is `[1, 2, 3, 3]`, which is also the return for that line.
We’ve initialized the variable `c` and assigned to it the value returned by invoking the `uniq` method on `a`, which returns the value of `a` after it removes duplicate values from `a`, so `[1, 2, 3]`, , which is also the return for that line.
There is no output. the values of the three variables are unchanged from their original assignation.

If the last line was `c = a.uniq!` the destructive `uniq!` method would mutate the array object that `a` points to, so then:
`a = [1, 2, 3]`
`b = [1, 2, 3]` since `b` points to the same object as `a`, and `a` was mutated
`c = [1, 2, 3]` (same)


## 6

What does the following code return? What does it output? Why? What concept does it demonstrate?

What values do `s` and `t` have? Why?

```ruby
def fix(value)
 value[1] = 'x'
 value 
end

s = 'abc'
t = fix(s)
```

## 7

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
def a_method(string)
  string << ' world'
end

a = 'hello'
a_method(a)

p a
```

## 8

What does the following code return? What does it output? Why? What concept does it demonstrate?

What values do `s` and `t` have? Why?

```ruby
def fix(value)
  value = value.upcase!
  value.concat('!')
end

s = 'hello'
t = fix(s)
```

## 9

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
a = “Hello”
b = a
a = “Goodbye”
puts a
puts b
```

## 10

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
a = "hello"

[1, 2, 3].map { |num| a }
```

## 11

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
[1, 2, 3].each do |num|
  puts num
end
```

## 12

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

incremented = arr.map do |n|
              n + 1
            end
p incremented
```

## 13

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
a = 4

loop do
  a = 5
  b = 3


  break
end

puts a
puts b
```

## 14

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
a = 'Bob'

5.times do |x|
  a = 'Bill'
end

p a
```

## 15

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
def increment(x)
  x << 'b'
end

y = 'a'
increment(y) 

puts y
```

## 16

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr1 = ["a", "b", "c"]
arr2 = arr1.dup
arr2.map! do |char|
  char.upcase
end

puts arr1 
puts arr2
```

## 17

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr = [1, 2, 3, 4]

counter = 0
sum = 0

loop do
  sum += arr[counter]
  counter += 1
  break if counter == arr.size
end 

puts "Your total is #{sum}"
```

## 18

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

new_array = arr.select do |n|
  n + 1
end
p new_array
```

## 19

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
[1, 2, 3].any? do |num|
  num > 2
end
```

## 20

What does the following code return? What does it output? Why? What concept does it demonstrate?

```ruby
def fix(value)
  value.upcase!
  value += '!'
  value
end

s = 'hello'
t = fix(s)
```

## 21

What does the following code return? What does it output? Why? What concept does it demonstrate?

What values do `s` and `t` have? Why?

```ruby
a = 4
b = 2

loop do
  c = 3
  a = c
  break
end

puts a
puts b
```

## 22

What does the following code return? What does it output? Why? What
concept does it demonstrate?

```ruby
a = %w(a b c)
a[1] = '-'
p a
```

## 23

What does the following code return? What does it output? Why? What
concept does it demonstrate?

```ruby
def add_name(arr, name)
  arr = arr + [name]
end

names = ['bob', 'kim']
add_name(names, 'jim')
puts names
```