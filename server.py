import uvicorn
from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse


app = FastAPI()
app.mount("/css", StaticFiles(directory="./css"), name="css")
app.mount("/js", StaticFiles(directory="./js"), name="js")
templates = Jinja2Templates(directory="html")


data = {
    "Иван": {
        "Индекс хирша": 0.45,
        "Статей за год": 0.33,
        "Кол-во соавторов": 0.56,
        "Кол-во аффликаций": 0.54,
        "Кол-во ключевых слов": 0.34,
        "SNA": 0.96
    },
    "Сергей": {
        "Индекс хирша": 0.57,
        "Статей за год": 0.76,
        "Кол-во соавторов": 0.55,
        "Кол-во аффликаций": 0.25,
        "Кол-во ключевых слов": 0.57,
        "SNA": 0.55
    },
    "Степан": {
        "Индекс хирша": 0.80,
        "Статей за год": 0.65,
        "Кол-во соавторов": 0.75,
        "Кол-во аффликаций": 0.09,
        "Кол-во ключевых слов": 0.45,
        "SNA": 0.75
    }
}


@app.get("/", response_class=HTMLResponse)
def homepage(request: Request):
    return templates.TemplateResponse("sliders.html", {"request": request})


@app.get("/get_data")
def get():
    return data


@app.post("/save_sum")
def save(data: str = Form(...)):
    print(data)
    return data


if __name__ == "__main__":
    uvicorn.run(app)
