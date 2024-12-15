import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-24 flex flex-col gap-5 mx-64 bg-slate-100 p-8 rounded-lg"
        >
            <h1 className="text-2xl text-center">Login Here!</h1>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className={errors.email && "!ring-red-500"}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className={errors.password && "!ring-red-500"}
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <button type="submit" className="primary-btn">
                Login
            </button>
            <p className="text-sm text-center">Don't have an account? <Link href="/register" className="text-link">Register</Link></p>
        </form>
    );
};

export default Login;
