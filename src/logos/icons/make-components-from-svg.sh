#!/bin/bash

{ type svgo && type svgr; } >/dev/null || { printf 'You must install svgo and svgr with npm' >&2; exit 1; }

svgo -p 2 --pretty -f .
sed -i 's/width="\([0-9]*\)" *height="\([0-9]*\)"/viewBox="0 0 \1 \2"/' *.svg
svgr -d . *.svg
