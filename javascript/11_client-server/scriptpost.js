async function loadPost() {
    let post = new URLSearchParams(window.location.search).get('id');
    let article = await fetch(`https://gorest.co.in/public-api/posts/?id=${post}`);
    let dataChain = await article.json();
    let comments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${post}`);
    let commentsData = await comments.json();

    let title = document.createElement('h1');
    title.innerHTML = dataChain.data[0].title;

    document.body.append(title);

    let bodyComment = document.createElement('p');
    bodyComment.innerHTML = dataChain.data[0].body;
    document.body.append(bodyComment);

    for (let i = 0; i < commentsData.meta.pagination.total; i++) {
        let comment = document.createElement('h4');
        comment.innerHTML = `${commentsData.data[i].name}:  ${commentsData.data[i].body}`;
        document.body.append(comment);
    }
}
loadPost()