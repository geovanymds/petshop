up:
	docker-compose up
stop:
	docker-compose stop
down:
	docker-compose down 
petshop:
	docker exec -it petshop /bin/sh
pg:
		docker exec -it petshop-db bash -c "psql -h 127.0.0.1 -U dev -d petshop -W"