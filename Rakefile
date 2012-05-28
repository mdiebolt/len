task :default => [:build]

task :build do
  `git pull origin gh-pages`
  `middleman build`

  `git commit -am 'building static assets'`
  `git push origin gh-pages`
end
