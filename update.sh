#!/bin/bash

# Fail fast
set -e

# Clone or update discourse against current master
echo "Updating discourse..."
if [ -d "discourse" ]; then
  cd discourse
  git fetch --depth 1
  git reset --hard origin/master
  git clean -dfx
  cd ..
else
  git clone --depth 1 https://github.com/discourse/discourse
fi

# Build new file with all outlets
echo "Building new outlets file..."
echo -n "" > common/head_tag.html
grep -r plugin-outlet discourse|grep name|grep -o -e 'name=".*'|awk -F\" '{print $2}'|sort|uniq | while read p ; do
 echo "<script type=\"text/x-handlebars\" data-template-name=\"/connectors/$p/plugin-outlet-component\">" >> common/head_tag.html
 echo "<div class=\"outlet\">$p</div>" >> common/head_tag.html
 echo "</script>" >> common/head_tag.html
done

# We are done
echo "Done"