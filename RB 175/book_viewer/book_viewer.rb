require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"

before do
  @contents = File.readlines "data/toc.txt"
end

helpers do
  def in_paragraphs(string)
    string.split("\n\n").map{ |paragraph| "<p>#{paragraph}</p>"}.join
  end
end

not_found do
  redirect "/"
end

get "/" do
  @title = "The Adventures of Sherlock Holmes"

  erb :home
end

get "/chapters/:number" do
  number = params[:number]
  chapter_name = @contents[number.to_i - 1]

  redirect "/" unless (1..(@contents.size)).cover? number

  @title = "Chapter #{number}: #{chapter_name}"
  @chapter = File.read "data/chp#{number}.txt"

  erb :chapter
end

not_found do
  redirect "/"
end
