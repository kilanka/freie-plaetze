import requests
from pathlib import Path
import shutil

dest = Path("images")
dest.mkdir(exist_ok=True)

for i in range(20):
    with (dest / f"{i}.jpg").open("wb") as f:
        shutil.copyfileobj(
            requests.get("https://picsum.photos/300/200", stream=True).raw, f
        )
