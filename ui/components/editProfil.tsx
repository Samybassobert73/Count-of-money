import React, {useState, useEffect} from 'react';
import UserService from '../_services/user';
import {useSelector} from 'react-redux'

function EditProfil() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  const [valid, setIsValid] = useState(true)
  const id = useSelector((state: any) => state.user.id)


  useEffect(() => {
    const userService = new UserService();
    userService.getUserById(id).then((res) => {
      setName(res.data.name);
      setLastname(res.data.lastname);
      setUsername(res.data.username);
      setEmail(res.data.email);
    })
  }, [id])

  let handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const form = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
      };
      const userService = new UserService();
      userService.updateUser(id, form).then((res) => {
        console.log(res)
        setName(res.data.name);
        setLastname(res.data.lastname);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setMessage('Votre profile à bien été modifié')

      });

    } catch (err) {
      console.log(err);
      setIsValid(false);
      setMessage('error : ' + err)
    }
  };

  return (
    <div className='p-10 w-1/2'>
      <h1 className='text-headingTwo font-semiBold font-raleway'>Edit Profil</h1>
      <form className='flex flex-col gap-2'
            onSubmit={handleSubmit}>
        <label className='text-label' htmlFor='us'>Name</label>
        <input type='text'
               className='p-2 rounded-xl border-2 border-gray'
               name='name'
               id='us'
               placeholder='username'
               value={name}
               onChange={(e) => setName(e.target.value)}
        />
        <label className='text-label' htmlFor='us'>Lastname</label>
        <input type='text'
               className='p-2 rounded-xl border-2 border-gray'
               name='lastname'
               id='us'
               placeholder='username'
               value={lastname}
               onChange={(e) => setLastname(e.target.value)}
        />
        <label className='text-label' htmlFor='us'>Username</label>
        <input type='text'
               className='p-2 rounded-xl border-2 border-gray'
               name='username'
               id='us'
               placeholder='username'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
        />
        <label className='text-label' htmlFor='em'>Email address</label>
        <input type='email'
               className='p-2 rounded-xl border-2 border-gray'
               name='email'
               id='em'
               placeholder='name@company.com'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />
        <p className={'text-' + (valid ? 'green' : 'red') + '-500'}>{message}</p>
        <button className='my-2 bg-btn text-white py-2 rounded-xl '
                type={'submit'}
        >Modifier
        </button>
      </form>
    </div>
  )
}

export default EditProfil
