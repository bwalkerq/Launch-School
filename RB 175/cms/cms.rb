require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'
require 'redcarpet'
require 'yaml'

configure do
  enable :sessions
  set :session_secret, SecureRandom.hex(32)
  set :erb, :escape_html => true
end

def data_path
  if ENV["RACK_ENV"] == "test"
    File.expand_path("../test/data", __FILE__)
  else
    File.expand_path("../data", __FILE__)
  end
end

def load_user_credentials
  credentials_path = if ENV["RACK_ENV"] == 'test'
                       File.expand_path('../test/users.yml', __FILE__ )
                     else
                       File.expand_path('../users.yml', __FILE__ )
                     end
  YAML.load_file(credentials_path)
end

def render_markdown(text)
  markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
  markdown.render(text)
end

def load_file_content(path)
  content = File.read path
  case File.extname path
  when '.txt'
    headers['Content-Type'] = 'text/plain'
    content
  when '.md'
    erb render_markdown content
  end
end

def user_signed_in?
  session.key?(:username)
end

# redirect to index if not admin
def require_admin
  unless session[:username] == 'admin'
    session[:message] = 'You have to be an admin to do that'
    redirect '/'
  end
end

# redirect to index page with error message if not signed in
def require_signed_in_user
  unless user_signed_in?
    session[:message] = 'You have to be signed in to do that'
    redirect '/'
  end
end

# view the index of files
get '/' do
  pattern = File.join(data_path, "*")
  @files = Dir.glob(pattern).map do |path|
    File.basename(path)
  end
  erb :index
end

# Go to the create new document page
get '/new' do
  require_signed_in_user
  erb :new
end

# view sign in page
get '/users/signin' do
  erb :signin
end

# submit sign in information
post '/users/signin' do
  credentials = load_user_credentials
  username = params[:username].to_s.downcase
  password = params[:password].to_s.downcase


  if credentials.key?(username) && credentials[username] == password
    session[:username] = username
    session[:message] = "Welcome #{username}!"
    redirect '/'
  else
    session[:message] = 'Invalid credentials'
    status 422 # Remember to write a status code for errors
    erb :signin
  end
end

post '/users/signout' do
  session.delete(:username)
  session[:message] = 'You have been signed out.'
  redirect '/'
end

# Create a new file, requires a name
post '/create' do
  require_signed_in_user
  filename = params[:filename].to_s # what object is this before #to_s, and what
  # is the easy way to check the answer to this question?

  if filename.size == 0
    session[:message] = 'A name is required'
    status 422
    erb :new
  else
    file_path = File.join(data_path, filename) # figured this out

    File.write(file_path, "") # learned that #write will create the file in
    # the folder specified in the path
    session[:message] = "#{params[:filename]} has been created."

    redirect '/'
  end
end

# edit the users who can sign in
get '/users' do

end

post '/:filename/destroy' do
  require_signed_in_user
  file_path = File.join(data_path, params[:filename])

  File.delete(file_path)

  session[:message] = "#{params[:filename]} has been deleted."
  redirect '/'
end

# view a file
get "/:filename" do
  file_path = File.join(data_path, params[:filename])

  if File.exist?(file_path)
    load_file_content(file_path)
  else
    session[:message] = "#{params[:filename]} does not exist."
    redirect "/"
  end
end

# go to the edit page for a particular file
get "/:filename/edit" do
  require_signed_in_user
  file_path = File.join(data_path, params[:filename])

  @filename = params[:filename]
  @content = File.read(file_path)

  erb :edit
end

# update the contents of a file
post "/:filename" do
  require_signed_in_user
  file_path = File.join(data_path, params[:filename])

  File.write(file_path, params[:content])

  session[:message] = "#{params[:filename]} has been updated."
  redirect "/"
end
