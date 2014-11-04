#API REST de Anotame.la

Anotamela es una aplicación que me permite crear notas de código para mis clases.

##Métodos HTTP permitidos

//BLA BLA

##Códigos de respuesta

//BLA BLA


##Crear una nota nueva [POST]

	Solicitud [POST] /notas
	{
		nota:
		{
			"title": "Mejorando.la #node-pro",
			"description": "Introducción a clase",
			"type": "js",
			"body": "¡Mira mamá! ¡Ya sé JS!"
		}
	}

	Respuesta
	{
		nota:
		{
			"id", 123,
			"title": "Mejorando.la #node-pro",
			"descripction": "Introduccion a clase",
			"type": "js",
			"body": "¡Mira mamá! ¡Ya sé JS!"
		}	
	}

##Obtener una nota
	Solicitud GET /notas/123

	Respuesta
	{
		nota:
		{
			"id", 123,
			"title": "Mejorando.la #node-pro",
			"descripction": "Introduccion a clase",
			"type": "js",
			"body": "¡Mira mamá! ¡Ya sé JS!"
		}	
	}

##Actualizar una nota
	Solicitud Put /notas/123

	{
		nota:
		{
			"title": "Mejorando.la #node-pro",
			"descripction": "Introduccion a clase",
			"type": "ruby",
			"body": "¡Mira mamá! ¡Ya sé JS!"
		}	
	}

	Respuesta
	{
		nota:
		{
			"id": 123,
			"title": "Mejorando.la #node-pro",
			"descripction": "Introduccion a clase",
			"type": "ruby",
			"body": "¡Mira mamá! ¡Ya sé JS!"
		}
	}

## Eliminar una nota
	Solicitud DELETE /notas/123

##Obtener todas las notas
	Solicitud GET /notas/

	Respuesta
	[{
		Todas las notas
	}]