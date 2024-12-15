import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

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
        <form onSubmit={handleSubmit} className="mt-24 flex flex-col gap-5 mx-64 bg-slate-100 p-8 rounded-lg">
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && <div>{errors.password}</div>}
            </div>
            <button type="submit" className="primary-btn">Login</button>
        </form>
    );
};

export default Login;
