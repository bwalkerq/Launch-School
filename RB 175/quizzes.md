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