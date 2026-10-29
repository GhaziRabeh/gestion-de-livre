<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            'Victor Hugo' => [
                ['title' => 'Les Misérables', 'year' => 1862],
                ['title' => 'Notre-Dame de Paris', 'year' => 1831],
                ['title' => 'Les Contemplations', 'year' => 1856],
            ],
            'Albert Camus' => [
                ['title' => 'L\'Étranger', 'year' => 1942],
                ['title' => 'La Peste', 'year' => 1947],
                ['title' => 'La Chute', 'year' => 1956],
            ],
            'Antoine de Saint-Exupéry' => [
                ['title' => 'Le Petit Prince', 'year' => 1943],
                ['title' => 'Vol de nuit', 'year' => 1931],
            ],
            'Émile Zola' => [
                ['title' => 'Germinal', 'year' => 1885],
                ['title' => 'L\'Assommoir', 'year' => 1877],
                ['title' => 'Au Bonheur des Dames', 'year' => 1883],
            ],
            'Gustave Flaubert' => [
                ['title' => 'Madame Bovary', 'year' => 1857],
                ['title' => 'L\'Éducation sentimentale', 'year' => 1869],
            ],
            'Jules Verne' => [
                ['title' => 'Le Tour du monde en quatre-vingts jours', 'year' => 1872],
                ['title' => 'Vingt Mille Lieues sous les mers', 'year' => 1870],
                ['title' => 'Voyage au centre de la Terre', 'year' => 1864],
            ],
            'George Orwell' => [
                ['title' => '1984', 'year' => 1949],
                ['title' => 'La Ferme des animaux', 'year' => 1945],
            ],
            'Naguib Mahfouz' => [
                ['title' => 'Impasse des deux palais', 'year' => 1956],
                ['title' => 'Les Fils de la médina', 'year' => 1959],
            ],
        ];

        foreach ($books as $authorName => $authorBooks) {
            $author = Author::firstOrCreate(['name' => $authorName]);

            foreach ($authorBooks as $book) {
                $newBook = Book::firstOrCreate(
                    ['title' => $book['title'], 'author_id' => $author->id],
                    ['year' => $book['year']]
                );

                if (! $newBook->image) {
                    $newBook->image = $this->downloadCover($book['title']);
                    $newBook->save();
                }
            }
        }
    }

    private function downloadCover(string $title): ?string
    {
        $search = Http::timeout(30)->get('https://openlibrary.org/search.json', [
            'q' => $title,
            'limit' => 1,
            'fields' => 'cover_i',
        ]);

        $coverId = $search->json('docs.0.cover_i');

        if (! $coverId) {
            return null;
        }

        $image = Http::timeout(30)->get("https://covers.openlibrary.org/b/id/{$coverId}-L.jpg");

        if ($image->failed()) {
            return null;
        }

        $path = 'books/' . Str::slug($title) . '.jpg';

        Storage::disk('public')->put($path, $image->body());

        return $path;
    }
}
