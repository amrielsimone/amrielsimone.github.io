#!/bin/bash
sudo find projects -name ".DS_Store" -depth -exec rm {} \;
find debs -type f -name ‘*.deb’ -delete
rm -r Packages.bz2