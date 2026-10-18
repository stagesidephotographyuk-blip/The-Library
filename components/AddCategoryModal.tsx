
import { useState } from 'react'
import { X } from 'lucide-react'

type AddCategoryModalProps = {
  onClose: () => void
  onSubmit: (name: string) => void
}

export default function AddCategoryModal({ onClose, onSubmit }: AddCategoryModalProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name)
      setName('')
    }
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
          <h2 className="text-2xl font-bold text-library-accent mb-6">Add New Category</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-library-light mb-1">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-library-dark/50 border border-library-light/20 rounded px-3 py-2 text-library-light focus:outline-none focus:ring-1 focus:ring-library-accent"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 bg-library-accent/10 hover:bg-library-accent/20 border border-library-accent/30 text-library-accent rounded font-medium"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
  
