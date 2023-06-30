class PerfectNumber
  def self.classify(number)
    raise StandardError if number < 1

    divisors = []
    1.upto(number - 1) do |integer|
      divisors << integer if (number % integer).zero?
    end
    aliqot_sum = divisors.sum
    if aliqot_sum < number
      "deficient, #{divisors}"
    elsif aliqot_sum > number
      "abundant, #{divisors}"
    else
      "perfect, #{divisors}"
    end
  end
end
