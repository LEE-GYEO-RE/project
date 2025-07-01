
viewList();
function viewList() {
    const table_content = document.querySelector(".table_content");
    let postList = getPostList();
    let html = '';

    for (let i=1; i<postList.length; i++) {
        html += `<tr>
                    <td class="list_num">${postList[i].pid}</td>
                    <td class="list_title">${postList[i].title}</td>
                    <td class="list_movieTitle">${postList[i].movieTitle}</td>
                    <td class="list_rating">${postList[i].rating /* TODO */}</td>
                    <td class="list_date">${postList[i].date}</td>
                </tr>`
    }

    table_content.innerHTML = html;

} // 게시글 목록 출력

function viewPages(create) {
    const main_pages = document.querySelector('#main_pages');
    let pages = `<span id="list_page><a href='#'>< </a>`;

    for (let i=1; i<=(create/10); i++) {
        pages += `<a href='#'>${i}</a>`;
    }

    pages += `</span>`;
    main_pages.innerHTML = pages;
} // TODO

function createList() {
    const table_content = document.querySelector('.table_content');
    let postList = getPostList();
    let create = prompt("게시글을 몇 개 생성하시겠습니까?");

    let pid = postList[postList.length-1].pid-1;
    const obj = {
        pid: pid,
        uid: 'testuser',
        title: '제목 샘플',
        movieTitle: '영화 제목',
        desc: '',
        image: '',
        rating: 5,
        isSpoiler: false,
        date: '2000-01-01'
    }

    for (let i=1; i<=create; i++) {
        postList.push(obj);
    }
    localStorage.setItem('postList', JSON.stringify(postList));

    console.log(`생성 완료 (create: ${create})`);
    viewList();
} // 게시글 생성 (디버그 용도로 사용할 것)

function deleteList() {
    const table_content = document.querySelector('.table_content');
    let drop = prompt("삭제할 게시물의 번호를 입력해주세요: ");

}

function getPostList() {
    let postList = localStorage.getItem('postList');
    if (postList = null) {
        postList = [];
    } else {
        postList = JSON.parse(postList);
    }

    return postList;
} // postList getter