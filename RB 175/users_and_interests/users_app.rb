require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'
require 'yaml'

get '/' do
  redirect '/users'
end

get '/users' do
  @user_hash = YAML.load_file('public/users.yaml')
  @user_names = @user_hash.keys

  erb :users
end