#Download base image ubuntu 20.04
FROM ubuntu:20.04

# Disable Prompt During Packages Installation
ARG DEBIAN_FRONTEND=noninteractive

# Install.
RUN \
  apt-get -y update && \
  apt-get -y upgrade && \
  apt-get -y install ruby-full build-essential zlib1g-dev

RUN \
  echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc && \
  echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc && \
  echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc

RUN \
  gem install jekyll bundler

RUN \
  gem install jekyll-gist jekyll-sitemap jekyll-seo-tag

# Add files.
# ADD root/.bashrc /root/.bashrc
# ADD root/.gitconfig /root/.gitconfig
# ADD root/.scripts /root/.scripts

# Set environment variables.
ENV HOME /root

# Define working directory.
WORKDIR /root

# Define default command.
CMD ["bash"]