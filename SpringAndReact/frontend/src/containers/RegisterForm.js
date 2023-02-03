import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';

const RegisterForm = ({history}) => {
  const navigate= useNavigate();
  const dispatch = useDispatch(); //스토어에서 컨테이너 컴포넌트를 가져옴

  const { form, auth, authError} = useSelector(({ auth}) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    // user: user.user
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
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
    if (password !== passwordConfirm) {
      //오류처리 해야함
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
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth){
      window.alert('회원가입 성공!');
      console.log('회원가입 성공');
      console.log(auth);
      navigate('/login');
      // dispatch(check());
    }
  }, [auth, authError,dispatch]);

  //user잘 설정됨?
  // useEffect(()=>{
  //   if (user){
  //     console.log('check API 성공');
  //     console.log(user);
  //   }
  // },[user]);
  
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