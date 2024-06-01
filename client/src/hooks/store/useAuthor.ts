import { create } from 'zustand'
import { AuthorDocument } from '../../types/document'
type AuthorStore = {
  records: AuthorDocument[]
  setRecords: (records: AuthorDocument[]) => void
  addRecords: (records: AuthorDocument[]) => void
  updateRecords: (records: AuthorDocument[]) => void
  deleteRecords: (ids: string[]) => void
}

const useAuthor = create<AuthorStore>((set) => ({
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
          const updatedRecord = records.find((rec) => rec._id === r._id)
          return {
            ...r,
            ...updatedRecord,
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
export default useAuthor
