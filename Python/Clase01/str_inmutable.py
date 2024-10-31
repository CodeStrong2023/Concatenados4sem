'''
Las cadenas en el tipo String son inmutables, cada vez que modificamos una cadena
en realidad se está generando un nuevo objeto
'''


# help(str.capitalize)
mensaje1 = 'hola mundo'
mensaje2 = mensaje1.capitalize()
print(f'Mensaje1: {mensaje1}, id: {id(mensaje1)}')
print(f'Mensaje2: {mensaje2}, id: {id(mensaje2)}')

mensaje1 += ' Adios'
print(f'Mensaje1: {mensaje1}, id: {id(mensaje1)}')