Describing Classes, objects, methods (behaviors) and attributes (states):
From JD Fortune:
Classes define the attributes and behaviors; Objects encapsulate state. When you
instantiate an object from a class, you are creating that object from a
predefined mold (or blueprint), that defines how this object will behave and
what variables it has access to. Attribute signifiers is also a term I've heard
tossed around to describe the instance variable in a class, before they're given
values by instantiating an object.
The values that those instance variables reference make up the state of the
object. The instance methods make up the behaviors of that object. Also, I think
the phrase is objects track state. Meaning the instance variables reference the
state of the object and the object tracks the state of the instance variables.
Once an instance variable is initialized within an object, the variable is
tracked as part of the state of the object.
Where I'm not 100% sure is if private methods are considered a part of an
object's behavior or if behaviors are more referring to the public
interface/public methods that can be invoked directly on the instantiated
object. If you find an answer, I'd be curious. My thought is that only public
methods define the behavior, where private methods are more seen as helper
methods working in the background (even though they technically contribute to
the behavior)