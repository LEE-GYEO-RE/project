// 초기 사용자 등록 및 관리자 조건부 등록
if (!localStorage.getItem("loginList")) {
  const defaultUsers = [
    { uid: "admin", pwd: "1234", name: "관리자", isAdmin: true, uno: 1 },
    { uid: "user", pwd: "1234", name: "일반회원", isAdmin: false, uno: 2 }
  ];
  localStorage.setItem("loginList", JSON.stringify(defaultUsers));
}


function logins() {
  //1. 입력 마크업 객체 가져오기
  const uidInput = document.querySelector('#uidInput'); // 아이디 입력 요소 선택
  const pwdInput = document.querySelector('#pwdInput'); // 비밀번호 입력 요소 선택
  //const isAdminInput = document.querySelector('#isAdminInput');
  const isAdminInput = document.getElementById("isAdminInput"); // 관리자 권한 체크박스 선택


  //2. 입력 마크업 객체내 입력값 가져오기
  const uid = uidInput.value; // 아이디 값
  const pwd = pwdInput.value; // 비밀번호 값
  const isAdmin = isAdminInput.checked; // 체크박스 체크 여부 (true/false)
  //isAdminInput.checked는 체크박스가 체크되었는지 여부를 true 또는 false로 반환합니다.
  //체크되어 있으면 관리자용 처리를 하고, 아니면 일반 사용자로 처리합니다. 

  //3. 입력값이 비어있는지 확인.
  if (!uid || !pwd) {
    alert('로그인 아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  // 4. localStorage 에서 배열 가져오기.
  let loginList = localStorage.getItem('loginList');
  if (loginList == null) { loginList = [] }
  else { loginList = JSON.parse(loginList); } // 기존유저 목록 불러오기

  //5.관리자 권한으로 로그인 또는 일반 사용자로 로그인
  //로그인할 사용자 찾기
  const Master = loginList.find(u => u.uid == uid && u.pwd == pwd);
  if (!Master) {
    alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    return;
  }
  // 관리자 체크박스가 체크되어 있는데, 해당 유저가 관리자가 아닌 경우
  if (isAdmin && !Master.isAdmin) {
    alert('해당 계정은 관리자 권한이 없습니다.');
    return;
  }

  //6.
  const role = Master.isAdmin ? "관리자" : "일반 사용자"; //변수에 삼항연산자 넣기 참, 거짓
  alert((Master.name || Master.uid) + "님, " + role + "로 로그인 성공!");

  // 8. 페이지 이동
  location.href = '/list.html';

}// func end 



