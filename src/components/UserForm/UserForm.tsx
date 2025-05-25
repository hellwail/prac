import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {userSchema} from '../../schemas/userSchema';
import type {UserFormData} from '../../schemas/userSchema';
import {useUserStore} from '../../store/userStore';
// import {v4 as uuidv4} from 'uuid';

export const UserForm: React.FC = () => {
    const addUser = useUserStore((state)=> state.addUser);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = (data: UserFormData) => {
        const newUser = {
            id: Date.now(), // Генерируем уникальный числовой ID
            email: data.email,
            name: data.name,
            isActive: false,
            clickCount: 0
        };
        addUser(newUser);
        reset(); // Сброс формы после добавления пользователя
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Add User</button>
    </form>
    )

}