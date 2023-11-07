from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/buscar")
def buscar():
    return render_template('buscar.html')

@app.route("/prueba", methods=["GET", "POST"])
def prueba():
    """Pagina para probar DOM"""
    return render_template('prueba.html')

#if __name__ == '__name__':
#    app.run()