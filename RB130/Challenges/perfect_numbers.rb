class PerfectNumber
  def self.classify(number)
    raise StandardError if number < 1

    divisors = []
    1.upto(number - 1) do |integer|
      divisors << integer if (number % integer).zero?
    end
    aliqot_sum = divisors.sum
    if aliqot_sum < number
      "deficient"
    elsif aliqot_sum > number
      "abundant"
    else
      "perfect"
    end
  end
end
