https://devcenter.heroku.com/articles/git

# initialize git repo in main project directory
$ cd myapp
$ git init

$ git add .
$ git commit -m "my first commit"

# create heroku app
$ heroku create YourAppName

# add git remote
$ heroku git:remote -a YourAppName

# deploy heroku app
$ git push heroku main
