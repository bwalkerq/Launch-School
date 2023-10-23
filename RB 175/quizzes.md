# L3 quiz
- Q3 Why was I able to create a brand new sinatra application without a .ru file 
(like config.ru)? This question seems to suggest that 
- 4 the second return value of the call method are the *response* headers, 
  not the request headers
- 7 route patterns do not include host names like "example.com"
- 10 remember the GD '=' when using <% %> in ERB
- 11 same as 10. wow.
- 14 one can access values of the params hash via `params[:example]` OR 
`params['example']` OR by using block parameters and accessing them via those.
I am unimpressed with this 'gotcha' question, seems like esoteric knowledge that 
doesn't actually serve a purpose in the development space, since it will be better
to always access params the same way for readability.
- 17 the error path is used for uncaught exceptions, and does not catch unfound
  path bad requests. Only not_found method catches those.

# L4 Quiz
- 1: 2/3 correct, overlooked that I could have entered the wrong URL path if I got
the "dunno this ditty" error message. (eye roll, but legit) 

- 8: the question about the erb display and redirects. At first glance I have 
no idea why I got this wrong. Oh. It's because all answer choices would have 
technically displayed the correct pages, some answers would have reset the params
hash thereby overlooking some data. The typical sinatra convention is to redirect
upon success, and display the current page on an error. **Note that reloading a
new page causes instance variables to be cleared (did I know that?)**

- 11: Here, I copied the code convention from the todo app, which was to put
`value="<%= params[:animal_weight] || @animal_weight %>" />` with the params bit
first, because in the todo app the params hash was empty in the analogous 
instance and so the order mattered. Here, the order doesn't matter because it
uses `@animal_weight` when displaying an unedited record, and 
`params[:animal_weight]` after an error. The way we set up our application, both
items will never have a value at the same time, so it doesn't matter which we 
try first. 

# L5 quiz - Todos app project
4: an AJAX question that I didn't put a lot of effort into figuring out; I
said that a status `200, "` would also communicate success with no body.
Looking now, I couldn't find anything on if a status code can have a `, ""`?

5: Unique identifiers SHOULD indeed be the same on front end and back end. They
don't need to be sequential.

# L8 Quiz - File-based CMS project
1 - gotcha question with the word 'plan.' Obviously, implementation occurs after
planning
4 - I knew that we write the http method in the route, errant check in that box,
because I thought they made a type when reviewing answers; i.e. I thought they
had made the mistake not me
8 - a bit of a gotcha; I chose the exact string that would be returned, but overlooked
the answer choice that was the more general answer "A HTML string." meh.
14 - Ok, so I should have known that 'ENV' was not answer answer since it asked
about methods. ENV returns the environment variables for my local system's shell
(terminal). Also, I overlooked 'env' is an alias for request.env. But really, all I did to
try to answer this question was search my files for each of these answer choices;
I don't think I fully understood that env or request.env will return the same hash
15 - question about content that we didn't or we barely learned, chose not to look up
#halt is a method, #stop isn't. 