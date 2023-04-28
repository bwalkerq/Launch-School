Lesson 1 quiz
- Only classes inherit from classes; objects do not inherit from their class,
  they are a template of their class.
- objects can not be instantiated from a module
- Modules share behaviors (methods), not attributes
- "include" is used for mix ins, not for inheritance
- I chose "Class inheritance lets us subclass from more than one class." 
  because String inherits from, for example, Object and Kernel and Basic 
  Object, but the important word here, I think, is "subclass"; this means 
  that a class can only be a direct subclass of exactly one superclass. The 
  chain of inheritance doesn't mean that the class is subclassing from 
  multiple classes.
- It's easy to overlook a attr_writer for attr_accessor; I did this in a 
  question. Maybe say it aloud to avoid mix-up.

Lesson 2 quiz - missed three partial questions
- in order to instantiate an object with a particular state (multiple instance 
  variables), each instance variable must be included in the initialize function
- I overlooked that having an att_reader and att_writer for two instance 
  variables is the same as having the accessor for both [kinda silly question].
- I remember questions like these in the notes with the card game; I 
  overlooked that when, for example, two of three subclasses share a common 
  behavior, a module is required since the the third subclass doesn't 
  inherit that behavior. I.e. if not *all* subclasses share a behavior, the 
  behavior must be mixed in rather than inherited.

Lesson 3 quiz - 100%
- however, I had to run a lot of the code in the last question, because I 
  didn't understand `::` when accessing values from constants across 
  inherited classes. Having re-read the section on inheritance and variable 
  scope, I realize now that my missing piece was `lexical scope`; my 
  definition of this is "look around where you are (in the calling class) 
  first, then search up the chain". The issues with the last problem had to 
  do with a super class method calling on a constant that was initialized in 
  a sub-class, so we had to add some `self.class::` before the constant in 
  order to point to where to search lexically for the constant. Tight.
