#!/bin/bash
sudo find projects -name ".DS_Store" -depth -exec rm {} \;
rm -r Packages.bz2