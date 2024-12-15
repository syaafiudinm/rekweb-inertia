import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-20 mx-64 flex flex-col gap-5 bg-slate-100 p-6 rounded-lg">
            <h1 className="text-2xl text-center">Register</h1>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={errors.name && "!ring-red-500"}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={errors.email && "!ring-red-500"}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className={errors.password && "!ring-red-500"}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    className={
                        errors.password_confirmation && "!ring-red-500"
                    }
                />
                {errors.password_confirmation && (
                    <p className="text-red-500">
                        {errors.password_confirmation}
                    </p>
                )}
            </div>
            <button type="submit" className="primary-btn">Register</button>
            <p className='text-center text-sm'>Already have an account? <Link href="/login" className='text-link'>Login</Link></p>
        </form>
    );
};

export default Register;
