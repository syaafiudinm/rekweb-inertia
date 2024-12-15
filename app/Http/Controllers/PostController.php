<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $search = $request->input('search');
    
        // Cache key unik untuk setiap pencarian
        $cacheKey = 'posts_search_' . ($search ?: 'all') . '_page_' . ($request->input('page', 1));
    
        // Gunakan caching untuk query
        $posts = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($search) {
            return Post::query()
                ->when($search, function ($query, $search) {
                    return $query->where('author', 'like', "%$search%")
                        ->orWhere('title', 'like', "%$search%")
                        ->orWhere('body', 'like', "%$search%");
                })
                ->latest()
                ->paginate(10);
        });
    
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

        Cache::forget('posts_search_all_page_1');

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

        Cache::forget('posts_search_all_page_1');

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

        Cache::forget('posts_search_all_page_1');
        
        return redirect('/')->with([
            'message' => 'Post deleted successfully',
            'type' => 'success']);
    }
}
