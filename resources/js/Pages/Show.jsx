export default function Show({ post }) {
    return (
        <>
            <h1 className="title mt-32">{post.title}</h1>
            <div className="text-lg text-slate-600">
                <p>{post.body}</p>
                <p className="text-sm mt-5">Author: {post.author}</p>
            </div>
        </>
    );
}
