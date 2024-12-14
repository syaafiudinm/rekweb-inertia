<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

use function PHPSTORM_META\type;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $posts = Post::query()
        ->when($search, function ($query, $search) {
            return $query->where('author', 'like', "%$search%")
            ->orWhere('title', 'like', "%$search%")
            ->orWhere('body', 'like', "%$search%");
        })
        ->latest()
        ->paginate(10);

    // Kirim data ke frontend
        return inertia('Home', [
            'posts' => $posts,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }   

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        sleep(2);
        $fields = $request->validate([
            'title' => ['required'],
            'author' => ['required'],
            'body' => ['required']
        ]);

        Post::create($fields);

        return redirect('/')->with([
            'message' => 'Post created successfully',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Show',[
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia('Edit',[
            'post' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        sleep(2);
        $fields = $request->validate([
            'title' => ['required'],
            'author' => ['required'],
            'body' => ['required']
        ]);

        $post->update($fields);

        return redirect('/')->with([
            'message' => 'Post updated successfully',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        sleep(2);
        $post->delete();
        

        return redirect('/')->with([
            'message' => 'Post deleted successfully',
            'type' => 'success']);
    }
}
