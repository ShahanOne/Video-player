import { useState } from 'react';

function Register(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleUserNameChange(e) {
    const { value } = e.target;

    setUserName(value);
  }
  function handlePasswordChange(e) {
    const { value } = e.target;

    setPassword(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onRegister();
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            username: userName,
            password: password,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
    setUserName('');
    setPassword('');
    props.onGoToLogin();
  };

  return (
    <div className="font-fredoka bg-gradient-to-r from-red-500 to-orange-400 pb-8 md:p-[3%] fixed w-full h-screen">
      <p className="text-end text-[2rem] px-4">
        <b
          className="hover:cursor-default text-[#e5e0f1] hover:text-white"
          onClick={props.onCut}
        >
          x
        </b>
      </p>
      <div className="bg-[#2C3333] text-orange-500 mx-8 md:mx-72 rounded-xl">
        <div className="registerDiv px-8">
          <p className="authenticateText text-xl md:text-3xl my-4 py-4">
            Register and start your selling journey!{' '}
          </p>

          <form onSubmit={handleSubmit}>
            <label className="text-lg my-4" htmlFor="userName">
              Username <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              className="block bg-gray-500 text-slate-100  border-none rounded w-[100%] md:w-[90%] h-8 my-4 md:my-6 focus:outline-none"
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              id="userName"
            />
            <label className=" text-lg my-4" htmlFor="password">
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              className="block bg-gray-500 text-slate-100  border-none rounded w-[100%] md:w-[90%] h-8 my-4 md:my-6 focus:outline-none"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
            />

            <button
              className="bg-gradient-to-r from-red-500 to-orange-400 shadow-xl hover:from-red-400 hover:to-orange-600 active:translate-y-0.5 text-white text-2xl my-4 md:my-6 p-[1%]  rounded-lg w-[100%] hover:cursor-pointer"
              type={userName && password ? 'submit' : 'button'}
            >
              Register
            </button>
          </form>

          <p className="authenticateText text-xl mt-4 md:mt-12 py-2">
            {' '}
            Already have an account? Login!
          </p>
          <button
            type="button"
            className="bg-gradient-to-r from-red-500 to-orange-400 shadow-xl hover:from-red-600 hover:to-orange-700 active:translate-y-0.5 text-white text-2xl my-6 p-[1%]  rounded-lg w-[100%] hover:cursor-pointer"
            onClick={props.onGoToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
