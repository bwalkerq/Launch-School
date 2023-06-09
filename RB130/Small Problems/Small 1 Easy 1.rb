class Tree
  include Enumerable

  def each

  end
end

def compute(arg = nil)
  block_given? ? yield(arg) : 'Does not compute.'
end

# p compute { 5 + 3 } == 8
# p compute { 'a' + 'b' } == 'ab'
# p compute == 'Does not compute.'
#
# p compute (14) { |num| num - 10 }
# p compute ('deez') { |word| word + 'nutz'}

def missing(arr)
  (arr.first..arr.last).to_a.reject { |n| arr.include?(n) }
end
# p missing([-3, -2, 1, 5]) == [-1, 0, 2, 3, 4]
# p missing([1, 2, 3, 4]) == []
# p missing([1, 5]) == [2, 3, 4]
# p missing([6]) == []

def divisors (int)
  results = []
  1.upto(Integer::sqrt(int)) do |n|
    if int % n == 0
      results << n
      results << int / n
    end
  end
  results.uniq.sort
end
# p divisors(1) == [1]
# p divisors(7) == [1, 7]
# p divisors(12) == [1, 2, 3, 4, 6, 12]
# p divisors(98) == [1, 2, 7, 14, 49, 98]
# p divisors(99400891) == [1, 9967, 9973, 99400891] # may take a minute
# p divisors(999962000357)

ALPHA = ("a".."z").to_a + ('A'..'Z').to_a

def rot13(string)
  arr = string.chars.map do |c|
    idx = ALPHA.index(c)
    if idx.nil?
      c
    elsif idx < 13
      ALPHA[idx + 13]
    elsif idx < 26
      ALPHA[idx - 13]
    elsif idx < 39
      ALPHA[idx + 13]
    else
      ALPHA[idx - 13]
    end
  end
  puts arr.join
end

# p "a".ord
# p "A".ord
# p "A".ord.chr
# rot13("Nqn Ybirynpr")
# rot13("Tenpr Ubccre")
# rot13("Nqryr Tbyqfgvar")
# rot13("Nyna Ghevat")
# rot13("Puneyrf Onoontr")
# rot13("Noqhyynu Zhunzznq ova Zhfn ny-Xujnevmzv")
# rot13("Wbua Ngnanfbss")
# rot13("Ybvf Unvog")
# rot13("Pynhqr Funaaba")
# rot13("Fgrir Wbof")
# rot13("Ovyy Tngrf")
# rot13("Gvz Orearef-Yrr")
# rot13("Fgrir Jbmavnx")
# rot13("Xbaenq Mhfr")
# rot13("Fve Nagbal Ubner")
# rot13("Zneiva Zvafxl")
# rot13("Lhxvuveb Zngfhzbgb")
# rot13("Unllvz Fybavzfxv")
# rot13("Tregehqr Oynapu")

def any? (arr)
  arr.each do |element|
    return true if yield(element)
  end
  false
end

# p any?([1, 3, 5, 6]) { |value| value.even? } == true
# p any?([1, 3, 5, 7]) { |value| value.even? } == false
# p any?([2, 4, 6, 8]) { |value| value.odd? } == false
# p any?([1, 3, 5, 7]) { |value| value % 5 == 0 } == true
# p any?([1, 3, 5, 7]) { |value| true } == true
# p any?([1, 3, 5, 7]) { |value| false } == false
# p any?([]) { |value| true } == false

def all? (arr)
  arr.each { |element| return false unless yield(element) }
  true
end

# p all?([1, 3, 5, 6]) { |value| value.odd? } == false
# p all?([1, 3, 5, 7]) { |value| value.odd? } == true
# p all?([2, 4, 6, 8]) { |value| value.even? } == true
# p all?([1, 3, 5, 7]) { |value| value % 5 == 0 } == false
# p all?([1, 3, 5, 7]) { |value| true } == true
# p all?([1, 3, 5, 7]) { |value| false } == false
# p all?([]) { |value| false } == true

def none?(arr)
  arr.each { |element| return false if yield(element) }
  true
end

# p none?([1, 3, 5, 6]) { |value| value.even? } == false
# p none?([1, 3, 5, 7]) { |value| value.even? } == true
# p none?([2, 4, 6, 8]) { |value| value.odd? } == true
# p none?([1, 3, 5, 7]) { |value| true } == false
# p none?([1, 3, 5, 7]) { |value| value % 5 == 0 } == false
# p none?([1, 3, 5, 7]) { |value| false } == true
# p none?([]) { |value| true } == true

def one?(arr)
  seen_one = false
  arr.each do |element|
    if yield element
      return false if seen_one
      seen_one = true
    end
  end
  seen_one
end

# p one?([1, 3, 5, 6]) { |value| value.even? }    # -> true
# p one?([1, 3, 5, 7]) { |value| value.odd? }     # -> false
# p one?([2, 4, 6, 8]) { |value| value.even? }    # -> false
# p one?([1, 3, 5, 7]) { |value| value % 5 == 0 } # -> true
# p one?([1, 3, 5, 7]) { |value| true }           # -> false
# p one?([1, 3, 5, 7]) { |value| false }          # -> false
# p one?([]) { |value| true }                     # -> false

def count (arr)
  arr.select { |n| yield n }.size
end

p count([1,2,3,4,5]) { |value| value.odd? } == 3
p count([1,2,3,4,5]) { |value| value % 3 == 1 } == 2
p count([1,2,3,4,5]) { |value| true } == 5
p count([1,2,3,4,5]) { |value| false } == 0
p count([]) { |value| value.even? } == 0
p count(%w(Four score and seven)) { |value| value.size == 5 } == 2


























