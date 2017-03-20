#!/bin/bash
dpkg-deb -bZgzip projects/com.amrielsimone.aroma debs
dpkg-deb -bZgzip projects/com.amrielsimone.aromatwo debs
dpkg-deb -bZgzip projects/com.amrielsimone.lgpack debs
dpkg-deb -bZgzip projects/com.amrielsimone.yalu debs