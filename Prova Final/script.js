$.getJSON("https://jsonplaceholder.typicode.com/posts", (response) => {     
            for (let noticia of response) {
                document.getElementById("noticias").innerHTML +=
                `
                <div class="col-12 col-sm-6 col-md-4 mb-4">
                    <div class="card h-100 shadow border-0">
                        <div class="card-body">
                            <h5 class="card-title">${noticia.title}</h5>
                            <p class="card-text">${noticia.body}</p>
                        </div>
                    </div>
                </div>`;
            }
            $('#total-noticias').text(response.length);
        });