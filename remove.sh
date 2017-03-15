#!/bin/bash
find debs -type f -name ‘*.deb’ -delete
find projects -type f -name ‘.DS_Store’ -delete
rm -r Packages.bz2