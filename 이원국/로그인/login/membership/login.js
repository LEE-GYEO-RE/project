function login() {
  const uid = document.getElementById('uid').value;
  const pwd = document.getElementById('pwd').value;

  // 입력값과 일치하는 사용자 찾기
  const foundUser = users.find(user => user.id === inputId && user.pw === inputPw);

  if (foundUser) {
    alert(`로그인 성공! 아이디: ${foundUser.id}`);
    // 로그인 정보 저장 (예: sessionStorage 또는 localStorage)
    sessionStorage.setItem('loginUser', foundUser.id);

    // 목록 페이지로 이동
  } else {
    alert('아이디 또는 비밀번호가 틀렸습니다.');
  }
}