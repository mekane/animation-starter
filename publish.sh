#! /usr/bin/bash

dir='build';
file='index.html';

# copy html to build
echo "cp spaceGame/$file $dir/.";
cp "spaceGame/$file" "$dir/.";

#delete </html>
sed -i '$d' "$dir/$file"
#delete </body>
sed -i '$d' "$dir/$file"
#delete <script> tag
sed -i '$d' "$dir/$file"

echo "<script>" >> "$dir/$file";
cat "$dir/spacegame.bundle.js" >> "$dir/$file";
echo $'\n</script></body></html>' >> "$dir/$file";

# scp to /var/www/martykane.org/tommy/spacegame 
scp build/index.html marty@martykane.org:/var/www/martykane.org/tommy/spacegame

