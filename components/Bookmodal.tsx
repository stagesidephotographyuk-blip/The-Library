
import { useState } from 'react'
import { X } from 'lucide-react'

type BookModalProps = {
  book?: Book
  onClose: () => void
  onSubmit: (book: Omit<Book, 'id' | 'color' | 'height' | 'thickness'>) => void
  categories: Category[]
}

export default function BookModal({ book, onClose, onSubmit, categories }: BookModalProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    year: book?.year || '',
    isbn: book?.isbn || '',
    purchased: book?.purchased || '',
    value: book?.value || '',
    category: book?.category || categories[0]?.name || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-library-wood border border-library-light/20 rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-library-light hover:text-library-accent"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-library-accent mb-6">
            {book ? 'Edit Book' : 'Catalog New Book'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-library-light mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-library-light mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-library-light mb-1">Year Published</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-library-light mb-1">ISBN</label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                  className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-library-light mb-1">Where Purchased</label>
                <input
                  type="text"
                  value={formData.purchased}
                  onChange={(e) => setFormData({...formData, purchased: e.target.value})}
                  className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-library-light mb-1">Cost / Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-library-light mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 bg-library-accent/10 hover:bg-library-accent/20 border border-library-accent/30 text-library-accent rounded font-medium"
              >
                {book ? 'Update Book' : 'Add to Library'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
  
