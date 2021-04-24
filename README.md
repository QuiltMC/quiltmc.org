# Quiltmc Project Website.

Website for the Quiltmc Project.

## Building

This is a static site built with Jekyll and webpack. First install `bundler`
and `yarn` and then follow the steps below.

1. Install dependencies by running `bundle install` and `yarn`.
2. Build JavaScript bundle with `yarn run webpack`.
3. Build the site with `bundle exec jekyll build`.


## Contributing

To make changes to the site, you will do the same basic thing as above, but
with some slight changes to make development easier. You still only need
`bundler` and `yarn`.

1. Install dependencies by running `bundle install` and `yarn`.
2. Start webpack in "watch" mode with `yarn run webpack --watch`. This will
   rebuild the JavaScript automatically when changes are made. If you aren't
   editing the JavaScript, you can omit `--watch` and just run webpack as
   normal.
3. Start Jekyll with `bundle exec jekyll serve -l`. This will automatically
   rebuild the site and make your browser reload the page any time you make
   changes.
4. See the website and your changes at `localhost:4000`.

