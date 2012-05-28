task :default => [:build]

task :build do
  `middleman build`

  `git commit -am 'building static assets'`
  `git push origin gh-pages`
end
