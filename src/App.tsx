
import { useState, useEffect } from 'react'
import { BookOpenText, Plus, LibraryBig, ListFilter } from 'lucide-react'
import BookModal from './components/BookModal'
import AddCategoryModal from './components/AddCategoryModal'

type Book = {
  id: string
  title: string
  author: string
  year?: string
  isbn?: string
  purchased?: string
  value?: string
  category: string
  color: string
  height: number
  thickness: number
}

type Category = {
  id: string
  name: string
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'title' | 'author'>('title')
  const [showBookModal, setShowBookModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedBooks = localStorage.getItem('libraryBooks')
    const savedCategories = localStorage.getItem('libraryCategories')
    
    if (savedBooks) setBooks(JSON.parse(savedBooks))
    if (savedCategories) setCategories(JSON.parse(savedCategories))
    else setCategories([{ id: '1', name: 'Fiction' }, { id: '2', name: 'History' }, { id: '3', name: 'Sci-Fi' }])
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('libraryBooks', JSON.stringify(books))
  }, [books])

  useEffect(() => {
    localStorage.setItem('libraryCategories', JSON.stringify(categories))
  }, [categories])

  const addBook = (book: Omit<Book, 'id' | 'color' | 'height' | 'thickness'>) => {
    const colors = ['bg-red-900', 'bg-blue-900', 'bg-green-900', 'bg-amber-900', 'bg-purple-900']
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      color: colors[Math.floor(Math.random() * colors.length)],
      height: Math.floor(Math.random() * 40) + 60,
      thickness: Math.floor(Math.random() * 20) + 20
    }
    setBooks([...books, newBook])
    setShowBookModal(false)
  }

  const addCategory = (name: string) => {
    const newCategory = {
      id: Date.now().toString(),
      name
    }
    setCategories([...categories, newCategory])
    setShowCategoryModal(false)
  }

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory)

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return (a.author || '').localeCompare(b.author || '')
  })

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/5 bg-library-wood border-r border-library-light/10 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <LibraryBig className="text-library-accent" size={28} />
          <h1 className="text-2xl font-bold text-library-accent">The Library</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left p-2 mb-1 rounded ${selectedCategory === 'all' ? 'bg-library-light/10 text-library-accent' : 'hover:bg-library-light/5'}`}
          >
            All Books
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full text-left p-2 mb-1 rounded ${selectedCategory === category.name ? 'bg-library-light/10 text-library-accent' : 'hover:bg-library-light/5'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowCategoryModal(true)}
          className="mt-4 flex items-center gap-2 p-2 rounded hover:bg-library-light/5 text-library-accent"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Main Content */}
      <div className="w-4/5 flex flex-col">
        {/* Control Bar */}
        <div className="bg-library-wood/50 border-b border-library-light/10 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-library-accent">
            {selectedCategory === 'all' ? 'All Books' : selectedCategory}
            <span className="text-sm text-library-light/70 ml-2">({filteredBooks.length} books)</span>
          </h2>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setSortBy(sortBy === 'title' ? 'author' : 'title')}
              className="flex items-center gap-2 px-4 py-2 rounded bg-library-light/5 hover:bg-library-light/10 border border-library-light/10"
            >
              <ListFilter size={16} />
              Sort by {sortBy === 'title' ? 'Author' : 'Title'}
            </button>
            
            <button 
              onClick={() => setShowBookModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded bg-library-accent/10 hover:bg-library-accent/20 border border-library-accent/30 text-library-accent"
            >
              <Plus size={16} />
              Catalog New Book
            </button>
          </div>
        </div>

        {/* Bookshelf */}
        <div className="flex-1 p-6 overflow-y-auto bg-library-dark/50">
          {sortedBooks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-library-light/50">
              <BookOpenText size={48} className="mb-4" />
              <p className="text-xl">No books in this category</p>
              <button 
                onClick={() => setShowBookModal(true)}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded bg-library-accent/10 hover:bg-library-accent/20 border border-library-accent/30 text-library-accent"
              >
                <Plus size={16} />
                Add your first book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-6">
              {sortedBooks.map(book => (
                <div 
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={`${book.color} rounded cursor-pointer hover:brightness-110 transition-all relative group`}
                  style={{
                    height: `${book.height}px`,
                    width: `${book.thickness}px`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 p-2 rounded text-xs text-center">
                      <p className="font-bold">{book.title}</p>
                      {book.author && <p className="text-xs">{book.author}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showBookModal && (
        <BookModal 
          onClose={() => setShowBookModal(false)}
          onSubmit={addBook}
          categories={categories}
        />
      )}

      {showCategoryModal && (
        <AddCategoryModal 
          onClose={() => setShowCategoryModal(false)}
          onSubmit={addCategory}
        />
      )}

      {selectedBook && (
        <BookModal 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSubmit={(updatedBook) => {
            setBooks(books.map(b => b.id === selectedBook.id ? {...updatedBook, id: selectedBook.id, color: selectedBook.color, height: selectedBook.height, thickness: selectedBook.thickness} : b))
            setSelectedBook(null)
          }}
          categories={categories}
        />
      )}
    </div>
  )
}
  
