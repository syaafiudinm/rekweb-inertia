import { Head, Link, usePage, router } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState, useEffect } from "react";

export default function Home({ posts, filters }) {
    const route = useRoute();
    const { component } = usePage();
    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    const [flashType, setFlashType] = useState(flash.type);
    const [search, setSearch] = useState(filters.search);

    useEffect(() => {
        setFlashMsg(flash.message);
        setFlashType(flash.type);
        if (flash.message) {
            const timeout = setTimeout(() => {
                setFlashMsg(null);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash.message, flash.type]);

    const flashStyles = {
        info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mb-5",
        success:
            "bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-5",
        warning:
            "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-5",
        danger: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-5",
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Redirect dengan query search
        router.get(
            route("Home"),
            { search },
            {
                preserveState: true, // Mempertahankan state pagination
                preserveScroll: true, // Mempertahankan posisi scroll
            }
        );
    };

    return (
        <>
            <Head title={component} />
            <h1 className="title">Home</h1>

            <form onSubmit={handleSearch} className="flex mb-3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="border border-slate-300 rounded-l-lg px-4 py-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                >
                    Search
                </button>
            </form>
            <button
                type="button" // Pastikan type 'button' untuk reset
                onClick={() => {
                    setSearch(""); // Reset search input
                    router.get(
                        route("Home"),
                        {},
                        {
                            preserveState: true,
                            preserveScroll: true,
                        }
                    );
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded mb-5"
            >
                Reset
            </button>

            {flashMsg && (
                <div className={`${flashStyles[flashType]}`} role="alert">
                    <p class="font-bold">{flashType}</p>
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

            <div className="py-5">
                {posts.links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.url || "#"}
                        className={`px-2 py-1 mx-1 ${
                            link.active
                                ? "font-bold text-blue-500"
                                : "text-gray-500"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </>
    );
}
