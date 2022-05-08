FROM python:3.10-bullseye

RUN apt-get update && \
	apt-get install -y \
	openssh-client \
	ca-certificates \
	git \
	gnupg \
	&& rm -rf /var/lib/apt/lists/*

RUN update-ca-certificates

RUN mkdir -p ~/.ssh && chmod 700 ~/.ssh
RUN ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN git clone --depth 1 https://github.com/dsaul/SharedShoppingList.git -b master /source

WORKDIR /source/api
#RUN pip3 install Cmake
RUN pip3 install -r requirements.txt
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
