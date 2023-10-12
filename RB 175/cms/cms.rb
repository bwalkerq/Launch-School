require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'tilt/erubis'
require 'redcarpet'

root = File.expand_path('..', __FILE__)

configure do
  enable :sessions
  set :session_secret, SecureRandom.hex(32)
  set :erb, :escape_html => true
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
    render_markdown content
  end
end

get '/' do
  @files = Dir.glob(root + '/data/*').map do |path|
    File.basename(path)
  end
  erb :index
end

get "/:filename" do
  file_name = params[:filename]
  file_path = root + "/data/" + file_name

  if File.exist?(file_path)
    load_file_content file_path
  else
    session[:message] = "#{file_name} does not exist."
    redirect '/'
  end
end
