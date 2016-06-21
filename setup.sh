#!/bin/sh
sudo yum install epel-release
sudo yum --enablerepo epel-testing install tesseract.x86_64 tesseract-langpack-eng.noarch
sudo yum --enablerepo epel-testing install tesseract-langpack-deu.noarch
sudo yum --enablerepo epel-testing install tesseract-osd
