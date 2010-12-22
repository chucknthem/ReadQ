#!/bin/sh
working_dir=`pwd`
cd ..

version=`grep 'version' $working_dir/manifest.json | tr '"' '\n' |grep '[0-9]'`

zip -r $working_dir/readQ-$version.zip $working_dir -x \*docs\* -x \*examples* -x \*build.sh -x \*.git\*  -x *.zip\* -x \*Makefile\* 
