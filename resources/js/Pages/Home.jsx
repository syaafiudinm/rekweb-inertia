import { Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";

export default function Home({ posts }) {
    const route = useRoute();

    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 3000);

    return (
        <>
            <h1 className="title">Home</h1>

            {flashMsg && (
                <div
                    className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-lg mb-5"
                    role="alert"
                >
                    <p class="font-bold">Alert</p>
                    <p>{flashMsg}</p>
                </div>
            )}
            <div>
                {posts.data.map((post) => (
                    <div
                        key={post.id}
                        className="p-5 border-b border-slate-300"
                    >
                        <div className="text-sm text-slate-600">
                            <span>Posted on : </span>
                            <span>
                                {new Date(post.created_at).toLocaleTimeString()}
                            </span>
                        </div>
                        <p className="font-medium mb-3">{post.body}</p>
                        <Link
                            href={route("posts.show", post)}
                            className="text-link"
                        >
                            Read More . . .
                        </Link>
                    </div>
                ))}
            </div>

            <div className="py-12 px-4">
                {posts.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`p-1 mx-1 ${
                                link.active ? "text-blue-500 font-bold" : ""
                            }`}
                        />
                    ) : (
                        <span
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="p-1 mx-1 text-slate-300"
                        ></span>
                    )
                )}
            </div>
        </>
    );
}
