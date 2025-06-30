
viewList();
function viewList() {
    const table_content = document.querySelector(".table_content");
    let html = '';

    for (let i=1; i<11; i++) {
        html += `<tr>
                    <td class="list_num">${i}</td>
                    <td class="list_title">제목 샘플</td>
                    <td class="list_movieTitle">영화 제목</td>
                    <td class="list_rating">★★★★★</td>
                    <td class="list_date">2025-06-30</td>
                </tr>`
    }

    table_content.innerHTML = html;

} // 게시글 목록 출력