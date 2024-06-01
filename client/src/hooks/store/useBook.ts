import { create } from 'zustand'
import { BookDocument } from '../../types/document'
type BookStore = {
  records: BookDocument[]
  setRecords: (records: BookDocument[]) => void
  addRecords: (records: BookDocument[]) => void
  updateRecords: (records: BookDocument[]) => void
  deleteRecords: (ids: string[]) => void
}

const useBook = create<BookStore>((set) => ({
  records: [],
  setRecords: (records) => set({ records: records }),
  addRecords: (records) => {
    set((state) => ({ records: [...records, ...state.records] }))
  },
  updateRecords: (records) => {
    const ids = records.map((r) => r._id).filter((id) => id)
    set((state) => ({
      records: state.records.map((r) => {
        if (ids.includes(r._id)) {
          const exsitRecord = records.find((rec) => rec._id === r._id)
          return {
            ...r,
            ...exsitRecord,
          }
        }
        return r
      }),
    }))
  },
  deleteRecords: (ids) =>
    set((state) => ({
      records: state.records.filter((r) => !ids.includes(r._id)),
    })),
}))

export default useBook
