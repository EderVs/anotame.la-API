API = Aplication Programming Interface

REST = Representational State Transfer (of resources)
Hypermedia APIs

Resources
~ User
~ Company
~ Weather in DF next week

Entities // Un recurso en específico
~ Freedy Vega
~ Mejorando.la
~ {
	temperature: '20c'
}

Representation // Tipos de formatos para representar entidades
~ json
  {
  	name: 'freedy vega'
  	height: '180cm'
  }
~ xml
  <name>freedy vega</name>
  <height>180cm</height>
~ csv
  freedy vega, 180cm

~ text
  freedy vega
  180cm

VERBS (CRUD)
	POST Create
	GET Read
	PUT Update
	DELETE Delete

	POST /user
	GET /user/id
	PUT /user/id
	DELETE /user/id