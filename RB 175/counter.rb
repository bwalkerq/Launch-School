require 'socket'

def parse_request(request_line)
  arr = request_line.split
  http_method = arr.first

  if request_line.match(/\?/)
    middle = arr[1].split('?')
    path = middle.first
    params = middle.last.split('&')
                   .map { |string| string.split('=') }.to_h
  else
    path = arr[1]
    params = {}
  end

  [http_method, path, params]
end

# p parse_request("GET /?number=3 200 OK")
# p parse_request("GET / 200 OK")

server = TCPServer.new('localhost', 3003)
loop do
  client = server.accept

  request_line = client.gets
  next if !request_line || request_line =~ /favicon/

  puts request_line

  http_method, path, params = parse_request(request_line)

  client.puts 'HTTP/1.1 200 OK'
  client.puts 'Content-Type: text/html'
  client.puts
  client.puts '<html>'
  client.puts '<body>'
  client.puts '<pre>'
  client.puts http_method
  client.puts path
  client.puts params
  client.puts '</pre>'

  client.puts '<h1>Counter</h1>'

  number = params["number"].to_i
  client.puts "<p>The current number is #{number}.</p>"

  client.puts "<a href='?number=#{number + 1}'>Add one</a>"
  client.puts "<a href='?number=#{number - 1}'>Subtract one</a>"
  client.puts '</body>'
  client.puts '</html>'
  client.close
end
