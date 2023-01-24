import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch(); //스토어에서 컨테이너 컴포넌트를 가져옴
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form; // state 에 존재하는 form에 따른 username,password,passwordconfirm key-value를 객체비구조화로 나타냄.

    // 230124 siwon
    if (username === '') {
      window.alert('아이디를 입력하세요.');
      return;
    }

    // 230124 siwon
    if (password === '') {
      window.alert('패스워드를 입력하세요.');
      return;
    }

    if (password !== passwordConfirm) {
      // 230124 siwon
      console.log('오류 발생');
      window.alert('오류 발생');
      return;
    }
    dispatch(register({ username, password }));
  };

  //컴포넌트가 처음 렌더링될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      window.alert('회원가입 처리 도중 오류가 발생했습니다. 서버가 켜져있는지 확인해주세요.');
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      window.alert('환영합니다!');
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;