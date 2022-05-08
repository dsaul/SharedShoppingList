# STAGE 1
FROM nginx:latest AS build

#RUN apt-get remove -y cmdtest
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


FROM nginx:latest

# Remove the default html.
WORKDIR /usr/share/nginx/html
RUN rm -rf * 
COPY --from=build /source/webapp/build /usr/share/nginx/html/

# Install our own config file.
WORKDIR /etc/nginx/conf.d/
COPY default.conf.template /default.conf.template

CMD ["/bin/sh" , "-c" , "envsubst '$API_ROOT' < /default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]