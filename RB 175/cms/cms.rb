require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'tilt/erubis'

root = File.expand_path('..', __FILE__)

configure do
  enable :sessions
  set :session_secret, SecureRandom.hex(32)
  set :erb, :escape_html => true
end

get '/' do
  @files = Dir.glob(root + '/data/*').map do |path|
    File.basename(path)
  end

  erb :index
end

# add behavior to handle a bad request; if the file doesn't exist
# redirect to home and flash message
# the error message is stored in params hash I think
# the flash message part deletes the error message so on refresh the flash disappears

get "/:filename" do
  file_name = params[:filename]
  file_path = root + "/data/" + file_name

  if File.file?(file_path)
    headers["Content-Type"] = "text/plain"
    File.read(file_path)
  else
    session[:message] = "#{file_name} does not exist."
    redirect '/'
  end
end
