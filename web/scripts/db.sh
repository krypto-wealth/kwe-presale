# docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=db -p 5432:5432 postgres
# docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=db -p 5432:5432 postgres

docker run -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=db -p 3306:3306 -d mysql