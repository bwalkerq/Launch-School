def greeting(name, options={})
  if options.empty?
    puts "wassup, my name is #{name}"
  else
    puts "Yo, they call me #{name} and I'm #{options[:age]} years old. 
    I hail from #{options[:city]}."
  end
end

greeting("Meggie")
greeting("Meggie", age: 32, city: "Waspland")