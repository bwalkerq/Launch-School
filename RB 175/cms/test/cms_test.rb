ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'rack/test'
require 'fileutils'

require_relative '../cms'

class CmsTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def setup
    FileUtils.mkdir_p(data_path)
  end

  def teardown
    FileUtils.rm_rf(data_path)
  end

  def create_document(name, content = "")
    File.open(File.join(data_path, name), "w") do |file|
      file.write(content)
    end
  end

  def admin_session
    { "rack.session" => { username: "admin" } }
  end

  def session
    last_request.env["rack.session"]
  end

  def test_index
    create_document 'about.md'
    create_document 'changes.txt'

    get '/'

    assert_equal 200, last_response.status
    assert_equal 'text/html;charset=utf-8', last_response['Content-Type']
    assert_includes last_response.body, 'about.md'
    assert_includes last_response.body, 'changes.txt'
    assert_includes last_response.body, 'New Document'
  end

  def test_viewing_text_document
    create_document 'history.txt', 'Ruby 0.95 released.'

    get '/history.txt'

    assert_equal 200, last_response.status
    assert_equal 'text/plain', last_response['Content-Type']
    assert_includes last_response.body, 'Ruby 0.95 released'
  end

  def test_viewing_markdown_document
    create_document 'about.md', "# Ruby is..."

    get '/about.md'

    assert_equal 200, last_response.status
    assert_equal 'text/html;charset=utf-8', last_response['Content-Type']
    assert_includes last_response.body, '<h1>Ruby is...</h1>'
  end

  def test_nonexistant_document
    get '/nofile.ext'
    assert_equal 302, last_response.status
    assert_equal 'nofile.ext does not exist.', session[:message]
  end

  def test_editing_document
    create_document 'changes.txt'

    get '/changes.txt/edit', {}, admin_session
    assert_equal 200, last_response.status
    assert_includes last_response.body, '<textarea'
    assert_includes last_response.body, %q(<button type="submit")
  end

  def test_updating_document
    post '/changes.txt', { content: "new content" }, admin_session
    # this is dope that you can just include info for the params hash in the post call
    assert_equal 302, last_response.status
    assert_equal "changes.txt has been updated.", session[:message]

    get '/changes.txt'
    assert_equal 200, last_response.status
    assert_includes last_response.body, 'new content'
  end

  def test_view_new_document_form
    get '/new', {}, admin_session

    assert_equal 200, last_response.status
    assert_includes last_response.body, "<input"
    assert_includes last_response.body, %q(<button type="submit")
  end

  def test_create_new_file
    post '/create', { filename: 'test.txt' }, admin_session
    assert_equal 302, last_response.status
    assert_equal 'test.txt has been created.', session[:message]

    get '/' # Remember to include the refresh-page behavior (message goes away
    # and the new file is listed in the index. I got all the others!)
    assert_includes last_response.body, "test.txt"
  end

  def test_create_new_file_without_filename
    post '/create', { filename: '' }, admin_session
    assert_equal 422, last_response.status
    assert_includes last_response.body, "A name is required"
  end

  def test_delete_a_file
    create_document 'test.txt'

    post '/test.txt/destroy', {}, admin_session
    assert_equal 302, last_response.status
    assert_equal 'test.txt has been deleted.', session[:message]

    get '/'
    refute_includes last_response.body, %q(href="/test.txt")
  end

  def test_signin_form
    get '/users/signin'
    assert_equal 200, last_response.status
    assert_includes last_response.body, "<input"
    # note that it tested to make sure the innermost element showed up
    assert_includes last_response.body, %q(<button type="submit")
    # and that the button showed up
  end

  def test_signin
    post '/users/signin', username: 'admin', password: 'secret'
    assert_equal 302, last_response.status
    assert_equal "Welcome #{session[:username]}!", session[:message]
    assert_equal 'admin', session[:username]

    get last_response['Location']
    assert_includes last_response.body, 'Signed in as admin'
  end

  def test_invalid_sign_in_credentials
    post '/users/signin', username: 'nope'
    assert_equal 422, last_response.status
    assert_nil session[:username]
    assert_includes last_response.body, "Invalid credentials"
    assert_includes last_response.body, %q(<input id="username" name="username" value="nope")
    #I note this last test is not included in the solution to check that the
    # previous username is populated in the input box
  end

  def test_signout
    get '/', {}, {'rack.session' => {username: 'admin'} }
    assert_includes last_response.body, "Signed in as admin"

    post "/users/signout"
    assert_equal "You have been signed out.", session[:message]

    get last_response["Location"]
    assert_nil session[:username]
    assert_includes last_response.body, "Sign In"
    # I notice that the solution (here or elsewhere) never tests that the
    # signout button appears
  end
end
