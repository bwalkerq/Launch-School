car = {type: 'sedan', color: 'blue', mileage:80_000}

#2
car[:year] = 2003
p car

#3
car.delete(:mileage)
p car

#4
puts car[:color]

#5
numbers = {
  high:   100,
  medium: 50,
  low:    10
}
numbers.each {|x,y| puts "A #{x} number is #{y}."}

#6
half_numbers = numbers.map {|x,y| y/2 }
p half_numbers
# very strange to me that this returns an array and not a hash
# but actually, I was even more skeptical that the keys would transfer over to 
# the new hash implicitly, so I guess it makes sense that enumerable#map returns
# an array
# also, I guess I gather from this solution's explanation that methods used
# on hashes are called enumerables? [update: this is incorrect]
# I don't understand the difference between enumerables and whatever 
# hash#select is, in the next exercise

#7 and #8
low_numbers = numbers.select! {|x,y| y < 25}
# Hash#select returns a hash, not an array
p low_numbers
p numbers

#9 nested hash
autos = {car: {type: 'sedan', color: 'blue', year: 2003}, 
        truck: {type: 'pickup', color: 'red', year: 1998}}
p autos

#10
car = [
  [:type, 'sedan'],
  [:color, 'blue'],
  [:year, 2003]
]