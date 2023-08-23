require 'socket'

def parse_request(request_line)
  arr = request_line.split
  http_method = arr.first
  middle = arr[1].split('?')
  path = middle.first
  params = middle.last.split('&')
                 .map{|string|string.split('=')}.to_h
  [http_method, path, params]
end

server = TCPServer.new('localhost', 3003)
loop do
  client = server.accept

  request_line = client.gets
  next if !request_line || request_line =~ /favicon/

  puts request_line

  http_method, path, params = parse_request(request_line)


  client.puts "HTTP/1.1 200 OK\r\n\r\n"
  client.puts rand(1..6)

  client.close
end
