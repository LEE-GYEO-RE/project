viewList();
function viewList() {
    console.log('viewList start');
    const table_content = document.querySelector(".table_content");
    const main_pages = document.querySelector('#main_pages');
    let currentPage = new URLSearchParams(location.search).get('pages');
    let postList = getPostList();
    let html = '';
    let pages = `<span id="list_page><a href='#'>< </a>`;

    if (postList != null) {
        for (let i=0; i<postList.length; i++) {
        html += `<tr>
                    <td class="list_num">${postList[i].pid}</td>
                    <td class="list_title"><a href="writedetail.html?pid=${postList[i].pid}">${postList[i].title}</a></td>
                    <td class="list_movieTitle">${postList[i].movieTitle}</td>
                    <td class="list_rating">${makeRating(postList[i].rating)}</td>
                    <td class="list_date">${postList[i].date}</td>
                </tr>`
        }
    }

    for (let i=1; i<=(postList.length/10); i++) {
        pages += `<a class="page_numbers" href='list.html?pages=${i}'>${i}</a>`;
    }
    pages += `</span>`;
    
    table_content.innerHTML = html;
    main_pages.innerHTML = pages;
    console.log('viewList end');
} // 게시글 목록 출력

function makeRating(rating) {
    let html = '';
    for (let i=1; i<6; i++) {
        if (i<=rating) {
            html += '★';
        } else {
            html += '☆';
        }
    }

    return html;
} // 별점에 별 그리기

function viewPages(create) {
    const main_pages = document.querySelector('#main_pages');
    let pages = `<span id="list_page><a href='#'>< </a>`;

    for (let i=1; i<=(create/10); i++) {
        pages += `<a href='#'>${i}</a>`;
    }

    pages += `</span>`;
    main_pages.innerHTML = pages;
} // 페이지 갯수에 따라 페이지 번호 만들기 TODO

function deleteList() {
    const table_content = document.querySelector('.table_content');
    let postList = getPostList();
    let pid = prompt("삭제할 게시물의 번호를 입력해주세요: ");

    for (let i=0; i<postList.length; i++) {
        if (postList[i].pid == pid) {
            postList.splice(i, 1);
            alert('삭제 완료');
            localStorage.setItem('postList', JSON.stringify(postList));
            viewList();
            return;
        }
    }

    alert('존재하지 않는 페이지 번호입니다.');
    return;
} // 페이지 번호를 입력받아 삭제 (관리자 전용)

function getPostList() {
    let postList = localStorage.getItem('postList');
    if (postList == null) {
        postList = [];
    } else {
        postList = JSON.parse(postList);
    }
    return postList;
} // postList getter