message = "The Flintstones Rock!"
10.times do
  puts message
  message.insert(0,' ')
end

# 2 
#puts "the value of 40 + 2 is " + (40 + 2)
# error because this requires interpolation between string and integers
puts "the value of 40 + 2 is #{(40 + 2)}."
puts "the value of 40 + 2 is " + (40 + 2).to_s + "."

# 3
def factors(number)
  divisor = number
  factors = []
  return "This method works for only positive integers." if number <= 0
  while divisor > 0 # whoops, was supposed to replace the begin/end with while
    factors << number / divisor if number % divisor == 0 # the purpose of this
    # is to make sure that the factor divides the number with no remainder
    # (which is the definition of a factor)
    divisor -= 1
  end 
  factors # this serves as the return, since the last line evaluated is the 
  # auto return
end

p factors(300)

# 4
def rolling_buffer1(buffer, max_buffer_size, new_element)
  buffer << new_element # this mutates the caller
  buffer.shift if buffer.size > max_buffer_size
  buffer
end

def rolling_buffer2(input_array, max_buffer_size, new_element)
  buffer = input_array + [new_element] # This will not mutate the caller
  buffer.shift if buffer.size > max_buffer_size
  buffer
end
# so I guess I'd prefer the 1st since it will mutate the buffer (I don't really
# know what a buffer's function is; I assume you want the changes to stick)

# 5
limit = 15

def fib(first_num, second_num, limit) # add a limit parameter, otherwise the
    # method doesn't know what to refer to
  while first_num + second_num < limit
    sum = first_num + second_num
    first_num = second_num
    second_num = sum
  end
  sum
end

result = fib(0, 1, 100)
puts "result is #{result}"

# 6
answer = 42

def mess_with_it(some_number)
  some_number += 8
end

new_answer = mess_with_it(answer)

p answer - 8
# the output is 42 - 8 = 34
# the value post-method is stored in a different variable
# because += is reassignment and not mutating, the answer variable is unchanged
# the last line is 42 - 8

# 7
munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}

def mess_with_demographics(demo_hash)
  demo_hash.values.each do |family_member|
    family_member["age"] += 42
    family_member["gender"] = "other"
  end
end
# [I got this wrong at first] This isn't reassignment, but rather, 
# **indexed assignment**
# which is indeed mutating. dang, they got me.
# so yeah, their family hash is jacked up now.
# I think that my explanation is better, although the solution answer is more 
# granular; a new hash is not created for this method, the actual hash object is
# being messed with inside of the method
p mess_with_demographics(munsters)
p munsters

# 8
# paper, I did it in my mind; this would have been good in my class last year

# 9 "no"
# same as # 8