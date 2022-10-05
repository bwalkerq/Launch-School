##1
def putme(string)
  p string if /lab/.match(string)
end
putme("laboratory")
putme("experiment")
putme("Pans Labyrinth")
putme("elaborate")
putme("polar bear")

##2
def execute(&block)
  block
end
execute { puts "hello from inside the execute method"}
# This is a very trivial example, so it's confusing
# actually, I was wrong and missed the point: the .call method never activated inside
# the definition, so nothing is printed. The method returns a Proc object, which I had no idea

##3
# exception handling helps prevent code from grinding to a halt when it encounters an 
# exception or error. Use begin, rescue, end blocks for exception handling.

##4
def execute(&block)
  block.call
end
execute { puts "hello from inside the execute method"}

##5
# this code is missing the & which converts the block to an argument; the error tells us
# that there's no argument passed because it only recognizes a block as an argument.