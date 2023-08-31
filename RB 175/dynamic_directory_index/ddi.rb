require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'

get '/' do
  @file_names = Dir.glob('public/*')
  @file_names.map! do |string|
    string.split('/').last
  end.sort!
  @file_names.reverse! if (params[:sort] == 'descending')

  erb :home
end


