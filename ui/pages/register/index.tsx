import Image from 'next/image';
import loginimg from '../../assets/img/login_register.png';
import React, {useState} from 'react';
import Head from 'next/head';
import AuthService from '../../_services/auth';
import HeaderHome from '../../components/Home/headerHome';
import Link from 'next/link';

export default Index;

function Index() {
  const authService = new AuthService();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const user = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      };

      authService.register(user).then(() => {
        setName('');
        setLastname('');
        setUsername('');
        setEmail('');
        setPassword('');
        setRepeatPassword('')
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HeaderHome/>
      <section className='p-20'>
        <Head>
          <title>Register</title>
          <meta name='description' content='Register Page'/>
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        {/*Index container*/}
        <div className='grid gap-20 grid-cols-2 items-center'>
          {/* image */}
          <div className='animated'>
            <Image src={loginimg} alt=''/>
          </div>
          {/* register form */}
          <div className='register'>
            <h2 className='font-raleway font-bold text-headingOne text-center'>Welcome 👋</h2>
            <p className='font-raleway font-medium text-subTitle text-center mb-10 text-gray-placeholder'>
              Please enter your contact details to register.
            </p>

            <form className='flex flex-col gap-2'
                  onSubmit={handleSubmit}
            >
              <label htmlFor='us'>Name</label>
              <input type='text'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='name'
                     id='us'
                     placeholder='username'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor='us'>Lastname</label>
              <input type='text'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='lastname'
                     id='us'
                     placeholder='username'
                     value={lastname}
                     onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor='us'>Username</label>
              <input type='text'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='username'
                     id='us'
                     placeholder='username'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='em'>Email address</label>
              <input type='email'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='email'
                     id='em'
                     placeholder='name@company.com'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='ps'>Password</label>
              <input type='password'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='password'
                     id='ps'
                     placeholder='*********'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='ps'>Repeat password</label>
              <input type='password'
                     className='p-2 rounded-xl border-2 border-gray'
                     name='password'
                     id='ps'
                     placeholder='*********'
                     value={repeatPassword}
                     onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <button className='my-2 bg-btn text-white py-2 rounded-xl border'
                      type={'submit'}
              >Register
              </button>
              <button className='gap-2 py-2 bg-white border w-full rounded-xl flex justify-center'>
                <svg
                  className='mr-3'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 48 48'
                  width='25px'
                >
                  <path
                    fill='#FFC107'
                    d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                  />
                  <path
                    fill='#FF3D00'
                    d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                  />
                  <path
                    fill='#4CAF50'
                    d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                  />
                  <path
                    fill='#1976D2'
                    d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                  />
                </svg>
                Log in with Google
              </button>
              <div className='flex justify-center'>
                <label className='g-1'> You have an account ? </label>
                <label>
                  <Link className='ml-1 font-bold' href={'/login'}>
                    Sign in here
                  </Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
