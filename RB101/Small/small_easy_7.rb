def interleave(array_1, array_2)
  output_array = []
  array_1.each_with_index do |element, index|
    intermediate_array = []
    intermediate_array << element << array_2[index]
    output_array << intermediate_array
  end
  output_array
end

p interleave([1, 2, 3], %w[a b c d]) #== [1, 'a', 2, 'b', 3, 'c']

# 2
UPPERCASE_LETTERS = ('A'..'Z').to_a
LOWERCASE_LETTERS = ('a'..'z').to_a

def letter_case_count(string)
  result = {}
  result[:lowercase] = string.split('').count { |char| LOWERCASE_LETTERS.include?(char) }
  result[:uppercase] = string.split('').count { |char| UPPERCASE_LETTERS.include?(char) }
  result[:neither] = string.length - result[:uppercase] - result[:lowercase]
  result
end

p letter_case_count('abCdef 123') == { lowercase: 5, uppercase: 1, neither: 4 }
p letter_case_count('AbCd +Ef') == { lowercase: 3, uppercase: 3, neither: 2 }
p letter_case_count('123') == { lowercase: 0, uppercase: 0, neither: 3 }
p letter_case_count('') == { lowercase: 0, uppercase: 0, neither: 0 }

def word_cap(string)
  array = string.split.map do |word|
    word.capitalize
    # word.chars.delete("\"") if word.chars.include?("\"")
  end
  array.join(' ')
end
# Wow, I am super annoyed because I solved this 30 minutes ago, but I think my ruby version keeps the \" escaped quotes in there
# so their solution is identical to mine, but mine doesn't work for the last example
# FUCK what a waste of time

p word_cap('four score and seven') #== 'Four Score And Seven'
p word_cap('the javaScript language') #== 'The Javascript Language'
p word_cap('this is a "quoted" word') #== 'This Is A "quoted" Word'

def swapcase(string)
  new_string = string.chars.map do |character|
    if character =~ /\W/
      character
    elsif character == character.upcase
      character.downcase!
    elsif character == character.downcase
      character.upcase!
    else
      p "error"
    end
  end
  new_string.join()
end
p swapcase('CamelCase') == 'cAMELcASE'
p swapcase('Tonight on XYZ-TV') == 'tONIGHT ON xyz-tv'

def staggered_case(string)
  new_string = string.chars.each_with_index do |character, index|
    if character =~ /\W/
      character
    elsif index.even?
      character.upcase!
    elsif index.odd?
      character.downcase!
    else
      puts "error bro"
    end
  end
  new_string.join
end

p staggered_case('I Love Launch School!') == 'I LoVe lAuNcH ScHoOl!'
p staggered_case('ALL_CAPS') == 'AlL_CaPs'
p staggered_case('ignore 77 the 444 numbers') == 'IgNoRe 77 ThE 444 NuMbErS'

# You're awesome
# If I were to modify this so that the caller could request the first character to be down or up case, I would need to either
# 1. write an entire other if statement that does the reverse
# or 2. prepend a character and then remove that character after the if statement

def staggered_case(string)
  toggle_upcase = true
  new_string = string.chars.each do |character|
    if character =~ /[^a-zA-Z]/
      character
    elsif toggle_upcase
      character.upcase!
      toggle_upcase = false
    elsif !toggle_upcase
      character.downcase!
      toggle_upcase = true
    else
      puts "error, bro"
    end
  end
  new_string.join
end

p staggered_case('I Love Launch School!') == 'I lOvE lAuNcH sChOoL!'
p staggered_case('ALL CAPS') == 'AlL cApS'
p staggered_case('ignore 77 the 444 numbers') == 'IgNoRe 77 ThE 444 nUmBeRs'

def show_multiplicative_average(array)
  product = array.inject(:*).to_f
  average = product / array.length
  sprintf("%.3f", average)
end

p show_multiplicative_average([3, 5])                # => The result is 7.500
p show_multiplicative_average([6])                   # => The result is 6.000
p show_multiplicative_average([2, 5, 7, 11, 13, 17]) # => The result is 28361.667

def multiply_list(array1, array2)
  # new_array = []
  # array1.each_with_index do |num, index|
  #   new_array << num * array2[index]
  # end
  # new_array
  array1.zip(array2).map { |sub| sub.reduce(:*) }
end

p multiply_list([3, 5, 7], [9, 10, 11]) #== [27, 50, 77]

# damn I am blown away by chaining zip and map together; I understand now that I need #map in order to take each two-element sub
# array from the return value of #zip and compile them to a single element of the new array from #map. using #reduce/inject
# is very smooth in that case

def multiply_all_pairs(array1, array2)
  multiples = []
  array1.each do |num|
    array2.each do |num2|
      multiples << num * num2
    end
  end
  multiples.sort
end

p multiply_all_pairs([2, 4], [4, 3, 1, 2]) == [2, 4, 4, 6, 8, 8, 12, 16]

#You're awesome

def penultimate(string)
  string.split[-2]
end

p penultimate('last word') == 'last'
p penultimate('Launch School is great!') == 'is'

