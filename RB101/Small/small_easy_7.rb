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
    if character == character.upcase
      character.downcase!
    elsif character == character.downcase
      character.upcase!
    else
      character
    end
  end
  new_string.join(' ')
end
p swapcase('CamelCase') #== 'cAMELcASE'
p swapcase('Tonight on XYZ-TV') #== 'tONIGHT ON xyz-tv'