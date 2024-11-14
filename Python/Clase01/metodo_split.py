
# help(str.split)

cursos = 'Java JavaScript Node Python Diseño'
listas_cursos = cursos.split()
print(f'Lista de cursos: {listas_cursos}')
print(type(listas_cursos))

cursos_separados_coma = 'Java,Python,Node,JavaScript,Spring'
listas_cursos = cursos_separados_coma.split(',', 2)
print(f'Lista de cursos: {listas_cursos}')
print(len(listas_cursos))
