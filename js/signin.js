// 초기 사용자 등록 및 관리자 조건부 등록
if (!localStorage.getItem("userList")) {
  const defaultUsers = [
    { uid: "admin", pwd: "1234", name: "관리자", isAdmin: true, uno: 1 },
    { uid: "user", pwd: "1234", name: "일반회원", isAdmin: false, uno: 2 }
  ];
  localStorage.setItem("userList", JSON.stringify(defaultUsers));
}


function userpage() {
  //1. 입력 마크업 객체 가져오기
  const uidInput = document.querySelector('#uidInput');
  const pwdInput = document.querySelector('#pwdInput');
  //const isAdminInput = document.querySelector('#isAdminInput');
  const isAdminInput = document.getElementById("isAdminInput");


  //2. 입력 마크업 객체내 입력값 가져오기
  const uid = uidInput.value;
  const pwd = pwdInput.value;
  const isAdmin = isAdminInput.checked;

  //3. 입력값이 비어있는지 확인.
  if (!uid || !pwd) {
    alert('회원가입 아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  //3. 객체화
  const obj = { uid, pwd, isAdmin };

  // 4. localStorage 에서 배열 가져오기.
  let userList = localStorage.getItem('userList');
  if (userList == null) { userList = [] }
  else { userList = JSON.parse(userList); } // 기존유저 목록 불러오기


  // 아이디 중복 검사와 관리자 권한으로 회원가입 또는 일반 사용자로 회원가입
  if (userList.find(user => user.uid === uid)) {
    alert('이미 존재하는 아이디입니다.');
    return;
  }



  // 현재 로그인한 사용자
  const currentUid = localStorage.getItem("uidId");
  const currentUser = userList.find(u => u.uid === currentUid);

  // 관리자 체크 시, 현재 로그인한 사용자가 관리자여야만 가능
 if (isAdmin && (!currentUser || !currentUser.isAdmin)) {
  alert("관리자 권한이 있는 사용자만 관리자 계정을 만들 수 있습니다.");
  return;
} else if (isAdmin) {
  alert(`${uid}님, 관리자 회원가입 성공!!`);
} else {
  alert("일반 사용자로 회원가입 성공!!");
}


  // 5. 객체를 배열에 저장
  obj.uno = userList.length == 0 ? 1 : userList[userList.length - 1].uno + 1; //자동번호
  userList.push(obj);

  // 6. localStorage 에 배열 저장하기. 기존 목록에 추가작업
  localStorage.setItem('userList', JSON.stringify(userList));

  // 7. 기타 등등 회원가입 완료 처리
  //console.log(userList);
  //alert('회원가입완료!!!');
  location.href = '/login.html' // 회원가입 성공시 목록(list) 페이지로 이동

}// func end 



