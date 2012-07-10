require "rubygems"
require "bundler"

Bundler.require

get "/" do
  erb "index.html".to_sym
end