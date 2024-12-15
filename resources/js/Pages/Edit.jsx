import { Head, useForm } from "@inertiajs/react";
import { route, useRoute } from "../../../vendor/tightenco/ziggy/src/js";

export default function Create({ post }) {
    const { data, setData, put, errors, processing } = useForm({
        title: post.title,
        author: post.author,
        body:  post.body,
    });

    function submit(e) {
        e.preventDefault();
        put(route("posts.update", post));
    }

    console.log(errors);

    return (
        <>
            <Head title="Create" />
            <h1 className="title">Update Post</h1>

            <div className="w-1/2 mx-auto">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className={errors.title && "!ring-red-500"}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            value={data.author}
                            onChange={(e) => setData("author", e.target.value)}
                            className={errors.author && "!ring-red-500"}
                        />
                        {errors.author && (
                            <p className="text-red-500">{errors.author}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body">Body</label>
                        <textarea
                            rows="10"
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className={errors.body && "!ring-red-500"}
                        ></textarea>
                        {errors.body && (
                            <p className="text-red-500">{errors.body}</p>
                        )}
                    </div>
                    <button disabled={processing} className="primary-btn mt-5">
                        Update Post
                    </button>
                </form>
            </div>
        </>
    );
}