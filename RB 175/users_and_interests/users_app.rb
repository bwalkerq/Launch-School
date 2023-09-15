# require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'
require 'yaml'

before do
  @users = YAML.load_file('public/users.yaml')
  @user_names = @users.keys
end

get '/' do
  redirect '/users'
end

get '/users' do
  erb :users
end

get '/:user_name' do
  # binding.pry
  @email = @users[params[:user_name].to_sym][:email]
  @interests = @users[params[:user_name].to_sym][:interests]

  erb :user
end