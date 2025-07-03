// localStorage 배열 가져오는 함수 삭제 함수 , localStorage 배열 저장하는 함수
// 수정 시 기존 데이터 불러오는 함수 , 수정 함수

// localStorage 배열 가져오는 함수
function getPosts() {
    let postList = localStorage.getItem('postList')
    if (postList == null) {
        postList = []
    } else {
        postList = JSON.parse(postList)
    } return postList;
}

// localStorage 배열 저장하는 함수
function setPosts(postList) {
    localStorage.setItem('postList', JSON.stringify(postList))
}


// (1) 수정시 기존 데이터 불러오는 함수
getpost();
function getpost() {
    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')                            // 선택한 pid 가져오기

    let postList = getPosts();

    for (let i = 0; i < postList.length; i++) {
        const obj = postList[i];
        if (obj.pid == selectPid) {
            document.querySelector('#titleInput').value = obj.title
            document.querySelector('#movieTitleInput').value = obj.movieTitle
            document.querySelector('#descInput').value = obj.desc
            document.querySelector('#inSpoilerInput').value = obj.isSpoiler
            document.querySelector('#fileInput').value = obj.file
            document.querySelector('input[name = "rating"]:checked').value = obj.rating

        } // if end
    } // for end
} // func end

// (2) 수정 함수
function detailUpdate() {

    const url = new URLSearchParams(location.search);     // url 경로 가져오기
    const selectPid = url.get('pid')
    let postList = getPosts();
    

    for (let i = 0; i < postList.length; i++) {
        const obj = postList[i];
        if (obj.pid == selectPid) {
            obj.title = document.querySelector('#titleInput').value;
            obj.movieTitle = document.querySelector('#movieTitleInput').value;
            obj.desc = document.querySelector('#descInput').value;
            obj.isSpoiler = document.querySelector('#isSpoilerInput').value;
            // obj.file = document.querySelector('#fileInput').value; 
            document.querySelectorAll('input[name="rating"]').forEach(radio => {
                if (radio.value == obj.rating) {
                    radio.checked = true;
                }
            }); // :checked 는 선택된 항목을 가져오는 것이라 값을 설정하는 용도로는 사용 불가능
                // 값을 반영할 때는 document.querySelectorAll로 모든 input을 순회하며 checked 속성 지정:
            setPosts(postList);
            alert('수정완료');
            location.href = `content.html?no=${selectPid}`
        }
    }
}

function back() {
    if (!confirm("뒤로 가겠습니까?")) {
    } else {
        location.href = `content.html?no=${selectPid}`
    }
}
// // 공통 JS (헤더 로그인 구현)
// isLogin();
// function isLogin() {
//     const header_content = document.querySelector("#header_content");
//     let userList = getuserList();
//     let currentUser = new URLSearchParams(location.search).get('uno');
//     let html = '';

//     if (currentUser != null) {
//         for (let i=0; i<userList[i].length; i++) {
//             if (userList[i].uno == currentUser) {
//                 html += `<ul id="header_top">
//                             <li><a href="list.html?pages=1">로그아웃</a></li>
//                         </ul>
//                         <ul id="header_bottom">
//                             <li>${userList[i].uid}님, 환영합니다</li>
//                         </ul>`;
//             }
//         }
//     } else return;

//     header_content.innerHTML = html;
// } // 로그인 여부 확인, 로그인 시 html 변경 (로그아웃, uid 포함으로)

// function getUserList() {
//     let userList = localStorage.getItem('userList');
//     if (userList == null) {
//         userList = [];
//     } else {
//         userList = JSON.parse(userList);
//     }
//     return userList;
// } // userList getter
