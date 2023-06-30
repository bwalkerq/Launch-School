#example of mutating the caller
a = [1,2,3]
def mutate (array)
  array.pop
end
puts "Before mutate method: #{a}"
mutate(a)
puts "after mutate method: #{a}"

a = [1,2,3]
def no_mutate(array)
  array.last
end
p "Before no_mutate: #{a}"
no_mutate(a)
p "After no_mutate: #{a}"