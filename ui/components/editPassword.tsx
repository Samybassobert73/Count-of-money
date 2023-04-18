import React, {useState, useEffect} from 'react';
import UserService from '../_services/user';
import { useSelector } from 'react-redux'
function EditPassword() {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [valid, setIsValid] = useState(true)
    const [message, setMessage] = useState('')
    const id = useSelector(state => state.user.id)
    
    let handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        const form = {
          password: password, 
        };
        if(password == repeatPassword){
          const userService = new UserService();
          userService.updateUser(id,form).then((res) => {
            console.log(res)
            setPassword('');
            setRepeatPassword(''); 
            setMessage('Votre profile à bien été modifié')  
          });
        }else{
          setIsValid(false);
          setMessage("Votre premier mot de passe n'est pas égale au deuxième mot de passe")  


        }
      } catch (err) {
        console.log(err);
        setIsValid(false);
        setMessage('error : ' + err)
      }
    };
  return (
    <div className='p-10 w-1/2'>
            <h1 className='text-headingTwo'>Edit Password</h1>
            <form className='flex flex-col gap-2'
                  onSubmit={handleSubmit}>
                <label className='text-label' htmlFor='ps'>Password</label>
                <input type='password'
                        className='p-2 rounded-xl border-2 border-gray'
                        name='password'
                        id='ps'
                        placeholder='*********'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                />
                <label className='text-label' htmlFor='ps'>Repeat password</label>
                <input type='password'
                        className='p-2 rounded-xl border-2 border-gray'
                        name='password'
                        id='ps'
                        placeholder='*********'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <p className={'text-' + (valid ? "green" : "red")+ '-500'} >{message}</p>
                <button className='my-2 bg-btn text-white py-2 rounded-xl '
                      type={'submit'}
                >Modifier 
                </button>
            </form>
        </div>
  )
}

export default EditPassword