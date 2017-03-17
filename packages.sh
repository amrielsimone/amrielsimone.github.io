#!/bin/bash
dpkg-deb -bZgzip projects/yalu debs
dpkg-deb -bZgzip projects/aroma debs
dpkg-deb -bZgzip projects/aroma2 debs