require 'sinatra'
require 'sinatra/reloader' #if development?
require 'sinatra/content_for'
require 'tilt/erubis'
# require 'pry'

configure do
  enable :sessions
  set :session_secret, SecureRandom.hex(32)
  set :erb, :escape_html => true
end

# methods that are meant to be accessible in the views as well as this file
helpers do
  def list_complete?(list)
    todos_count_remaining(list) == 0 && todos_count(list) > 0
  end

  def list_class(list)
    "complete" if list_complete?(list)
  end

  def todos_count_remaining(list)
    list[:todos].count {|todo| todo[:completed] == false}
  end

  def todos_count(list)
    list[:todos].size
  end

  def sort_lists(lists, &block)
    complete_lists, incomplete_lists = lists.partition { |list|
      list_complete?(list)}

    incomplete_lists.each{ |list| yield list, lists.index(list)}
    complete_lists.each{ |list| yield list, lists.index(list)}
  end

  def sort_todos(todos, &block)
    complete_todos, incomplete_todos = todos.partition { |todo| todo[:completed] }

    incomplete_todos.each(&block)
    complete_todos.each(&block)
  end

  def next_todo_id(todos)
    max = todos.map { |todo| todo[:id] }.max || 0
    max + 1
  end
end

before do
  session[:lists] ||= []
end

HOME = "/lists"

get "/" do
  redirect HOME
end

# View list of the lists
get "/lists" do
  @lists = session[:lists]
  erb :lists, layout: :layout
end

# Render the new list form
get "/lists/new" do
  erb :new_list, layout: :layout
end

# Return an error mesage if the name is invalid. Return nil if name is valid
def error_for_list_name(name)
  if !(1..100).cover? name.size
    'The list name must be between 1 and 100 characters.'
  elsif session[:lists].any? { |list| list[:name] == name }
    'The list name must be unique.'
  end
end

# Create a new list
post '/lists' do
  list_name = params[:list_name].strip

  error = error_for_list_name(list_name)
  if error
    session[:error] = error
    erb :new_list, layout: :layout
  else
    session[:lists] << { name: list_name, todos: [] }
    session[:success] = 'The list has been created.'
    redirect '/lists'
  end
end

def load_list(index)
  list = session[:lists][index] if index && session[:lists][index]
  return list if list
  
  session[:error] = "The specified list was not found"
  redirect '/lists'
end

# View a single todo list
get '/lists/:id' do
  @list_id = params[:id].to_i
  @list = load_list(@list_id)

  erb :list, layout: :layout
end

# Edit an existing todo list
get '/list/:id/edit' do
  @list_id = params[:id].to_i
  @list = load_list(@list_id)
  erb :edit_list, layout: :layout
end

#Update an existing todo list
post '/lists/:id' do
  list_name = params[:list_name].strip
  @list_id = params[:id].to_i
  @list = load_list(@list_id)

  error = error_for_list_name(list_name)
  if error
    session[:error] = error
    erb :edit_list, layout: :layout
  else
    @list[:name] = list_name
    session[:success] = 'The list has been updated.'
    redirect "/lists/#{id}"
  end
end

#delete a todo list
post '/lists/:id/destroy' do
  @list_id = params[:id].to_i 
  session[:lists].delete_at(@list_id)
  if env["HTTP_X_REQUESTED_WITH"] = "XMLHttpRequest"
    "/lists"
  else
    session[:success] = 'the list was deleted.'
    redirect '/lists'
  end
end

def error_for_todo(name)
  unless (1..100).cover? name.size
    'The todo item name must be between 1 and 100 characters.'
  end
end

# add a new todo to a list
post '/lists/:list_id/todos' do
  @list_id = params[:list_id].to_i
  @list = load_list(@list_id)
  text = params[:todo].strip

  error = error_for_todo(text)
  if error
    session[:error] = error
    erb :list, layout: :layout
  else

    id = next_todo_id(@list[:todos])
    @list[:todos] << { id: id, name: params[:todo], completed: false }
    session[:success] = 'The todo item has been added.'
    redirect "/lists/#{@list_id}"
  end
end

# Delete a todo from a list
post "/lists/:list_id/todos/:id/destroy" do
  @list_id = params[:list_id].to_i
  @list = load_list(@list_id)

  todo_id = params[:id].to_i
  @list[:todos].reject! { |todo| todo[:id] == todo_id }

  if env["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest"
    status 204
  else
    session[:success] = "The todo has been deleted."
    redirect "/lists/#{@list_id}"
  end
end

# Update the status of a todo
post "/lists/:list_id/todos/:id" do
  @list_id = params[:list_id].to_i
  @list = load_list(@list_id)

  todo_id = params[:id].to_i
  is_completed = params[:completed] == "true"
  todo = @list[:todos].find { |todo| todo[:id] == todo_id }
  todo[:completed] = is_completed

  session[:success] = 'the todo has been updated.'
  redirect "/lists/#{@list_id}"
end

# Mark all todos as complete for a list
post "/lists/:id/complete_all" do
  @list_id = params[:id].to_i
  @list = load_list(@list_id)

  @list[:todos].each do |item|
    item[:completed] = true
  end

  session[:success] = 'All todos marked complete.'
  redirect "/lists/#{@list_id}"
end





