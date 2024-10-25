import math
from decimal import Decimal

# NaN (Not a Number)
a = float('NaN') # Es case insensitive ('NaN','nan) NaN es un tipo Not a Number
print(f'a: {a}')

# Módulo math
a = float('NaN') # No es solo una cadena, sino un tipo numérico
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(a)}')

# Módulo decimal
a = Decimal('NaN') # No es solo una cadena, sino un tipo numérico
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(a)}')