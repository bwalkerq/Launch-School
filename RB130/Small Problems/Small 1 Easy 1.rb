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

p "a".ord
p "A".ord
rot13("Nqn Ybirynpr")
rot13("Tenpr Ubccre")
rot13("Nqryr Tbyqfgvar")
rot13("Nyna Ghevat")
rot13("Puneyrf Onoontr")
rot13("Noqhyynu Zhunzznq ova Zhfn ny-Xujnevmzv")
rot13("Wbua Ngnanfbss")
rot13("Ybvf Unvog")
rot13("Pynhqr Funaaba")
rot13("Fgrir Wbof")
rot13("Ovyy Tngrf")
rot13("Gvz Orearef-Yrr")
rot13("Fgrir Jbmavnx")
rot13("Xbaenq Mhfr")
rot13("Fve Nagbal Ubner")
rot13("Zneiva Zvafxl")
rot13("Lhxvuveb Zngfhzbgb")
rot13("Unllvz Fybavzfxv")
rot13("Tregehqr Oynapu")












