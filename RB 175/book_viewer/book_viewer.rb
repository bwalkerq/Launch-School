require "sinatra"
require "sinatra/reloader" if development?
require "tilt/erubis"

before do
  @contents = File.readlines "data/toc.txt"
end

helpers do
  # adds an index to the paragraph html element id
  def in_paragraphs(string)
    string.split("\n\n").map.with_index do |line, index|
      "<p id='paragraph#{index}'>#{line}</p>" # Here I learned that id="something" is
    # how to reference particular parts of a page.
    # The id embedded in the <p> tag is used by the URL to scroll to that part
    # of the page. So the URL http://localhost:4567/chapters/1#paragraph235
    # has an anchor (the part of the URL that starts with '#') and the page
    # contains any html element with that id, the page will scroll there.
    #
    # I'm pretty annoyed (with myself?) because I think this is the type of problem
    # that there's no way I could have solved on my own, having not done the HTML
    # course. I was hoping to keep up with Phillip, but I don't think I'll be able to.
    # If I have to keep looking at the solutions that depend on greater HTML knowledge than
    # I have, it's going to take too long.
    end.join
  end

  # iterate through the text and wrap in strong
  # if the query is multiple words, need to do something other than split on space
  # each consecutive
  # sub
  # gsub
  # replace
  def bold_query_text(text, query)
    text.gsub(query, "<strong>#{query}</strong>")
  end
  #take the f***ing win

  # Calls the block for each chapter, passing that chapter's number, name, and
  # contents.
  def each_chapter
    @contents.each_with_index do |name, index|
      number = index + 1
      contents = File.read("data/chp#{number}.txt")
      yield number, name, contents
    end
  end

  # This method returns an Array of Hashes representing chapters that match the
  # specified query. Each Hash contain values for its :name and :number keys.
  def chapters_matching(query)
    results = []

    return results if !query || query.empty?
    each_chapter do |number, name, contents|
      matches = {}
      contents.split("\n\n").each_with_index do |paragraph, index|
        matches[index] = paragraph if paragraph.include?(query)
      end
      results << {number: number, name: name, paragraphs: matches} if matches.any?
    end

    results
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
  number = params[:number].to_i
  chapter_name = @contents[number - 1]

  redirect "/" unless (1..(@contents.size)).cover? number

  @title = "Chapter #{number}: #{chapter_name}"
  @chapter = File.read "data/chp#{number}.txt"

  erb :chapter
end


get "/search" do
  @results = chapters_matching(params[:query])
  erb :search
end











