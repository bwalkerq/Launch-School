require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

before do
  @contents = File.readlines "data/toc.txt"
end

get "/" do
  @title = "The Adventures of Sherlock Holmes"

  erb :home
end

get "/chapters/:number" do
  number = params[:number]
  chapter_name = @contents[number.to_i - 1]
  @title = "Chapter #{number}: #{chapter_name}"

  @chapter = File.read "data/chp#{number}.txt"

  erb :chapter
end
