import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

export default function Show({ post }) {
    const { delete: destroy } = useForm();
    const route = useRoute();

    function submit(e) {
        e.preventDefault();
        destroy(route("posts.destroy", post));
    }

    return (
        <>
            <h1 className="title mt-32">{post.title}</h1>
            <div className="text-lg text-slate-600">
                <p>{post.body}</p>
                <p className="text-sm mt-5">Author: {post.author}</p>
            </div>
            <div className="mt-5">
                <form onSubmit={submit}>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg text-white"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </>
    );
}
