import requests

def get_razas():
    r = requests.get('https://dog.ceo/api/breeds/list')
    print(r.status_code)
    # print(r.text)
    print(type(r.text)) # Vemos de que tipo se trata
    # En este caso es un String por el text
    # Encontramos un diccionario con listas
    razas = r.json()
    for raza in razas.values(): # Utilizamos la funcipon 
        print(f"Raza de los perritos: {raza[5]}")