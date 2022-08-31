async function loadArticles() {
    let page = new URLSearchParams(window.location.search).get('page') || 1
    let response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`)
    let dataChain = await response.json();

    let totalPages = dataChain.meta.pagination.pages;

    function pagination() {
        let firstPage = document.createElement('a');
        firstPage.innerHTML = '««';
        firstPage.href = 'index.html';
        document.body.append(firstPage);
        for (let i = 1; i < 10; i++) {

            let pagination = document.createElement('a');

            if (page < 6) pagination.innerHTML = i;
            else if (totalPages - page > 2) pagination.innerHTML = page - 5 + i;
            else pagination.innerHTML = totalPages - (9 - i);

            pagination.style.color = parseInt(pagination.innerHTML) == page ? 'black' : 'gray';

            pagination.href = parseInt(pagination.innerHTML) == 1 ? 'index.html' : `index.html?page=${pagination.innerHTML}`;

            document.body.appendChild(pagination)
        }
        let lastPage = document.createElement('a')
        lastPage.innerHTML = '»»'
        lastPage.href = `index.html?page=${totalPages}`
        document.body.append(lastPage)
    }


    pagination()

    for (let i = 0; i < dataChain.data.length; i++) {
        let div = document.createElement('div')
        let title = document.createElement('h3')
        let a = document.createElement('a')
        a.href = `post.html?id=${dataChain.data[i].id}`;
        a.innerHTML = dataChain.data[i].title
        a.style.color = 'white'
        title.appendChild(a)
        div.appendChild(title)
        let article = document.createElement('h5')
        article.innerHTML = dataChain.data[i].body
        div.appendChild(article)
        document.body.append(div)

    }

    pagination()

}
loadArticles()