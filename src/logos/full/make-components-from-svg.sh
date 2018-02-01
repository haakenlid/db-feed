#!/bin/bash

svgo -p 2 --pretty -f .
sed -i 's/width="\([0-9.]*\)" *height="\([0-9.]*\)"/viewBox="0 0 \1 \2"/' *.svg
svgr -d . *.svg
