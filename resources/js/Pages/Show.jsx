import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";
import Swal from "sweetalert2";

export default function Show({ post }) {
    const { delete: destroy } = useForm();
    const route = useRoute();

    function showAlert() {
        Swal.fire({
            title: "Are you sure want to delete it?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("posts.destroy", post)); // Assuming this is a method you use to delete the post
                Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                ).then(() => {
                    window.location.href = "/";
                });
            }
        });
    }
    function submit(e) {
        e.preventDefault();
        showAlert();
    }

    return (
        <>
            <h1 className="title mt-32">{post.title}</h1>
            <div className="text-lg text-slate-600">
                <p>{post.body}</p>
                <p className="text-sm mt-5">Author: {post.author}</p>
            </div>
            <div className="mt-5 flex gap-3">
                <form onSubmit={submit}>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg text-white"
                    >
                        Delete
                    </button>
                </form>
                <Link
                    className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg text-white"
                    href="/posts/edit"
                >
                    Edit
                </Link>
            </div>
        </>
    );
}
