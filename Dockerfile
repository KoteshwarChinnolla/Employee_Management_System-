# Use OpenResty base image with LuaRocks included
FROM openresty/openresty:jammy

# Install dependencies for native Lua modules
RUN -$ sudo apt install build-essential libreadline-dev unzip

# Use the bundled LuaRocks to install lua-resty-jwt
RUN luarocks install lua-resty-jwt

# Copy your Nginx config
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

# Expose the port
EXPOSE 80

# Start Nginx (OpenResty)
CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]
