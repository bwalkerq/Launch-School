## L1 quiz
    Overall I would say these mistakes are adderall-adjustment-period mistakes, they
    are very unlike my normal way of taking tests 

    - I don't say this often, but, careless mistake to overlook the word block in
    "passing a block to a method" as an instance of a closure. Adderall readjustment 
    moment. 
    - Methods take a block by default in Ruby (which is what my other answer choice was;
    I knew that every method took a block) and yet I still also chose "a method def
    must use the 'yeild' keyword.
    - This is true misunderstanding; 
ARRAY = [1, 2, 3]

def abc
    a = 3
end

def xyz(collection)
    collection.map { |x| yield x }
end

xyz(ARRAY) do
    # block body
end

Which of the following names is part of the binding for the block body on line 12?

I chose all 5:
ARRAY
abc
collection
a 
xyz

    I figured that if the block bound to the method abc then it would also have access to
    the local varialbe a within that block. Similarly with the collection parameter in
    xyz. However, local varaibles that are initialized within method definitions of methods
    that *are* bound to a block are not bound the block; i.e. the methods are bound but not
    the contained local variables within those methods