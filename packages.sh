#!/bin/bash
dpkg-deb -bZgzip projects/aroma debs
dpkg-deb -bZgzip projects/aromatwo debs
dpkg-deb -bZgzip projects/lgpack debs
dpkg-deb -bZgzip projects/yalu debs
dpkg-deb -bZgzip projects/noduck debs